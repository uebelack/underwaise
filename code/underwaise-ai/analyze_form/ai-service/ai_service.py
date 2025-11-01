from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
import json

load_dotenv()

from llm import get_gpt_mini_llm


class Joke(BaseModel):
    joke: str


app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/joke")
def get_joke() -> Joke:
    """
    Get a joke from the LLM.
    """
    joke = get_gpt_mini_llm().invoke(
        "Tell me a joke, just return the joke, no other text"
    )
    return Joke(joke=joke.content)


# ------------ NEW: Underwriting MVP endpoint ------------

class UnderwriteRequest(BaseModel):
    text: str = Field(..., description="Freitext zu Hobbys, Aktivitäten, Verhalten, ...")


class ActivityRisk(BaseModel):
    name: str
    severity: str  # e.g. "low", "medium", "high", "critical"
    confidence: float  # 0..1 confidence that the activity is present


class UnderwriteResponse(BaseModel):
    original_text: str
    activities: List[str]
    activity_risks: List[ActivityRisk]
    risk_score: float  # 0..1 overall risk metric
    vector: List[float]  # fixed-length numeric vector (embedding-like), 8 floats 0..1
    common_extreme_sports: List[str]
    raw_llm_output: Optional[Dict[str, Any]] = None  # optional: parsed raw JSON from LLM for debugging


@app.post("/underwrite", response_model=UnderwriteResponse)
def underwrite(req: UnderwriteRequest):
    """
    MVP: Nimm Freitext (Hobbys / Freizeit), lass das LLM strukturierte Parameter extrahieren
    und einen kleinen 8-dim Risiko-Vektor erzeugen. LLM wird gebeten, *nur* JSON zurückzugeben.
    """

    # Prompt (auf Deutsch, damit dein Team deutsche Texte schreiben kann)
    prompt = f"""
Du bist ein Underwriting-Assistant. Gegeben ist ein Freitext zur Person (Hobbys, Freizeit, Aktivitäten).
Antworte **nur** mit gültigem JSON (keine erläuternden Sätze). Das JSON-Objekt muss genau diese Felder enthalten:

- original_text: der unveränderte Input-String.
- activities: Liste von kurzen Activity-Namen (z.B. "Klettern", "Tauchen", "Joggen").
- activity_risks: Liste von Objekten mit {{ "name": <activity>, "severity": <"low"|"medium"|"high"|"critical">, "confidence": <float 0..1> }}.
- risk_score: eine Zahl zwischen 0.0 und 1.0, die das Gesamt-Risiko darstellt (0 = sehr gering, 1 = extrem hoch).
- vector: eine Liste mit genau 8 Fließkommazahlen zwischen 0.0 und 1.0 (dies ist ein kompakter Risiko-Vektor).
- common_extreme_sports: Liste der gängigsten Extremsportarten/Risiken, die im Text relevant sein könnten (z.B. ["Wingsuit","Tauchen","Klettern", ...]).

Führe diese Regeln strikt aus:
1. JSON muss gültig parsebar sein.
2. Floats müssen Punkt als Dezimaltrennzeichen verwenden (z.B. 0.75).
3. vector muss genau 8 Elemente enthalten.
4. Verwende für severity nur: "low", "medium", "high", "critical".

Input-text (du sollst diesen 1:1 in original_text zurückgeben):
\"\"\"{req.text}\"\"\"
    """

    llm = get_gpt_mini_llm()
    try:
        llm_response = llm.invoke(prompt)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"LLM invocation failed: {e}")

    raw = llm_response.content.strip()

    # Versuche JSON zu parsen — LLM soll ja reines JSON liefern
    try:
        parsed = json.loads(raw)
    except json.JSONDecodeError:
        # Fallback: falls LLM etwas zusätzliches ausgibt, versuche, das JSON-Objekt im Text zu finden
        # sehr einfacher heuristischer Versuch: von first '{' bis last '}'.
        try:
            start = raw.index("{")
            end = raw.rindex("}") + 1
            candidate = raw[start:end]
            parsed = json.loads(candidate)
        except Exception:
            # endgültiges Fallback: gebe ein aussagekräftiges Fehler-HTTP-Objekt zurück
            raise HTTPException(
                status_code=502,
                detail="LLM returned unparseable JSON. Raw output: " + raw[:1000]
            )

    # Validierungs- und Normalisierungschecks (grundlegend)
    # Sicherstellen, dass required fields exist and types are sane; sonst Fehler
    try:
        original_text = parsed.get("original_text", req.text)
        activities = parsed.get("activities", [])
        activity_risks = parsed.get("activity_risks", [])
        risk_score = float(parsed.get("risk_score", 0.0))
        vector = parsed.get("vector", [])
        common_extreme_sports = parsed.get("common_extreme_sports", [])
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Invalid JSON structure from LLM: {e}")

    # Minimalvalidierung: vector length and numeric ranges
    if not isinstance(vector, list) or len(vector) != 8:
        raise HTTPException(status_code=502, detail=f"LLM must return 'vector' of length 8, got: {vector}")
    try:
        vector = [float(v) for v in vector]
    except Exception:
        raise HTTPException(status_code=502, detail="Vector elements must be floats")

    # Clip values to 0..1 defensively
    vector = [max(0.0, min(1.0, v)) for v in vector]
    risk_score = max(0.0, min(1.0, float(risk_score)))

    # Normalize / ensure activity_risks structure
    normalized_activity_risks = []
    for ar in activity_risks:
        # try best-effort mapping
        name = ar.get("name") if isinstance(ar, dict) else str(ar)
        severity = ar.get("severity", "low") if isinstance(ar, dict) else "low"
        confidence = float(ar.get("confidence", 0.0)) if isinstance(ar, dict) else 0.0
        if severity not in ("low", "medium", "high", "critical"):
            severity = "low"
        confidence = max(0.0, min(1.0, confidence))
        normalized_activity_risks.append({
            "name": name,
            "severity": severity,
            "confidence": confidence
        })

    # Hey :) xD
    # Build response model
    response = UnderwriteResponse(
        original_text=original_text,
        activities=activities,
        activity_risks=[ActivityRisk(**ar) for ar in normalized_activity_risks],
        risk_score=risk_score,
        vector=vector,
        common_extreme_sports=common_extreme_sports,
        raw_llm_output=parsed  # optional/debug
    )
    return response