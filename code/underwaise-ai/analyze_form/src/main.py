from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List
import json

from llm import get_gpt_mini_llm


class Joke(BaseModel):
    joke: str


app = FastAPI()

# Add CORS middleware to allow requests from other devices
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for local network testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World", "status": "API is running"}


@app.get("/joke")
def get_joke() -> Joke:
    """
    Get a joke from the LLM.
    """
    joke = get_gpt_mini_llm().invoke(
        "Tell me a joke, just return the joke, no other text"
    )
    return Joke(joke=joke.content)


# ------------ SIMPLIFIED: Underwriting MVP endpoint ------------

class UnderwriteRequest(BaseModel):
    text: str = Field(..., description="Freitext zu Hobbys, Aktivitäten, Verhalten, ...")


class DetectedActivity(BaseModel):
    name: str
    frequency: str  # "rarely", "occasionally", "regularly", "frequently"


class RiskVector(BaseModel):
    """
    Fixed 6-dimension risk vector matching underwriting schema (all values 0-10):
    - physiological_risk: Physical health conditions and organ function (0-10 scale)
    - psychological_risk: Mental health, stress, psychological conditions (0-10 scale)
    - medication_risk: Medication use and substance dependency (0-10 scale)
    - fitness_risk: Physical fitness risk - LOWER is better (0-10 scale: 0=very fit, 10=sedentary/unfit)
    - bmi_risk: Body mass index related risks (0-10 scale)
    - activity_risk: Risk from sports, hobbies, and leisure activities (0-10 scale)
    """
    physiological_risk: float  # 0-10
    psychological_risk: float  # 0-10
    medication_risk: float  # 0-10
    fitness_risk: float  # 0-10 (0=sehr fit, 10=sedentär)
    bmi_risk: float  # 0-10
    activity_risk: float  # 0-10


class UnderwriteResponse(BaseModel):
    total_risk_score: float  # Overall risk: 0.0 (low) to 1.0 (high)
    activities: List[DetectedActivity]
    risk_vector: RiskVector
    explanation: str  # Why these risk scores were chosen


@app.post("/get_risk_from_hobbies", response_model=UnderwriteResponse)
def get_risk_from_hobbies(req: UnderwriteRequest):
    """
    Simplified underwriting: Extract activities and calculate a fixed 6-dimension risk vector.
    """

    prompt = f"""
Du bist ein erfahrener Underwriting-Assistant für Lebens- und Berufsunfähigkeitsversicherungen. Analysiere den Text und denke ganzheitlich über Risiken nach.

**WICHTIG: Erkenne indirekte Risikofaktoren!**
Beispiele:
- Viele Partys/Clubbing → erhöhtes Medikamentenrisiko (Alkohol, Drogen bei Techno/Raves)
- Extremsport → Unfallrisiko (activity_risk), aber KEINE automatische psychische Störung
- Sedentärer Lebensstil (Gaming, Netflix) → hohes Fitness-Risiko, BMI-Risiko, physiologische Risiken
- Hochstress-Hobbies (Börsenhandel, Wettbewerbe) → psychologisches Risiko
- Kampfsport regelmäßig → höheres Unfallrisiko, aber GUTES Fitness-Level (niedriges fitness_risk)
- Vegane/spezielle Ernährung erwähnt → könnte auf Gesundheitsbewusstsein hinweisen (positiv)

**Beispiel-Analysen (korrigiert):**
1. "Ich gehe gerne feiern, Techno-Partys am Wochenende" 
   → activity_risk: 2, medication_risk: 6-7 (Alkohol/Partykultur), fitness_risk: 4-5, psychological_risk: 3
   Erklärung: Partys erhöhen Substanzkonsum-Risiko, aber keine schwere Sportgefahr

2. "Wingsuit-Fliegen ist meine Leidenschaft, mache es monatlich"
   → activity_risk: 10 (extrem gefährlich!), fitness_risk: 1-2 (sehr fit für Extremsport), physiological_risk: 3, psychological_risk: 2
   Erklärung: Wingsuit ist lebensgefährlich, aber Person ist körperlich fit und mental stabil genug dafür

3. "Entspanne mit Netflix, Pizza, am Wochenende nichts Besonderes"
   → fitness_risk: 8-9 (sehr inaktiv!), bmi_risk: 6-7, physiological_risk: 5, activity_risk: 0
   Erklärung: Sedentärer Lebensstil = hohes Fitness-Risiko und BMI-Probleme zu erwarten

4. "Marathonläufer, trainiere 5x/Woche, gesunde Ernährung"
   → fitness_risk: 0-1 (exzellent!), physiological_risk: 1-2, bmi_risk: 1, activity_risk: 2, psychological_risk: 1
   Erklärung: Sehr aktiv und gesund, niedriges Gesamt-Risiko

**Antworte NUR mit gültigem JSON:**

{{
  "total_risk_score": <float 0.0-1.0>,
  "activities": [
    {{"name": "<activity>", "frequency": "<rarely|occasionally|regularly|frequently>"}}
  ],
  "risk_vector": {{
    "physiological_risk": <float 0-10>,
    "psychological_risk": <float 0-10>,
    "medication_risk": <float 0-10>,
    "fitness_risk": <float 0-10>,
    "bmi_risk": <float 0-10>,
    "activity_risk": <float 0-10>
  }},
  "explanation": "<Kurze Begründung der Risikobewertung in 1-2 Sätzen>"
}}

**Skalen-Bedeutung (WICHTIG!):**
- physiological_risk: 0=kerngesund, 10=schwere Organprobleme zu erwarten
- psychological_risk: 0=mental stabil, 10=psychische Erkrankungen wahrscheinlich (NUR bei echten Anzeichen!)
- medication_risk: 0=kein Substanzkonsum, 10=hohe Abhängigkeitsgefahr
- fitness_risk: 0=sehr fit/aktiv, 10=komplett inaktiv/sedentär (NIEDRIGER IST BESSER!)
- bmi_risk: 0=optimales Gewicht zu erwarten, 10=starkes Über-/Untergewicht zu erwarten
- activity_risk: 0=sichere Aktivitäten, 10=lebensgefährliche Extremsportarten
- total_risk_score: Gewichteter Durchschnitt für Versicherungsentscheidung (0.0-1.0)

**Wichtige Regeln:**
- psychological_risk NUR erhöhen bei echten Anzeichen (Stress, Burnout, Depression erwähnt)
- Extremsportler sind oft FIT → fitness_risk NIEDRIG, nicht hoch!
- Berücksichtige Häufigkeit: "selten Fallschirmspringen" ≠ "wöchentlich Fallschirmspringen"
- Erkenne Lifestyle-Muster und Zusammenhänge
- Sei präzise und fair bei der Risikobewertung
- Nur gültiges JSON ohne zusätzliche Erklärungen außerhalb des JSONs
- Dezimaltrenner ist Punkt (.)

**Zu analysierender Text:**
\"\"\"{req.text}\"\"\"
"""

    llm = get_gpt_mini_llm()
    
    try:
        llm_response = llm.invoke(prompt)
        raw = llm_response.content.strip()
        
        # Extract JSON if LLM added extra text
        if not raw.startswith("{"):
            start = raw.index("{")
            end = raw.rindex("}") + 1
            raw = raw[start:end]
        
        parsed = json.loads(raw)
        
        # Validate and clip values
        total_risk = max(0.0, min(1.0, float(parsed["total_risk_score"])))
        explanation = parsed.get("explanation", "No explanation provided")
        
        activities = [
            DetectedActivity(
                name=a["name"],
                frequency=a["frequency"] if a["frequency"] in ["rarely", "occasionally", "regularly", "frequently"] else "occasionally"
            )
            for a in parsed["activities"]
        ]
        
        rv = parsed["risk_vector"]
        risk_vector = RiskVector(
            physiological_risk=max(0.0, min(10.0, float(rv["physiological_risk"]))),
            psychological_risk=max(0.0, min(10.0, float(rv["psychological_risk"]))),
            medication_risk=max(0.0, min(10.0, float(rv["medication_risk"]))),
            fitness_risk=max(0.0, min(10.0, float(rv["fitness_risk"]))),
            bmi_risk=max(0.0, min(10.0, float(rv["bmi_risk"]))),
            activity_risk=max(0.0, min(10.0, float(rv["activity_risk"])))
        )
        
        return UnderwriteResponse(
            total_risk_score=total_risk,
            activities=activities,
            risk_vector=risk_vector,
            explanation=explanation
        )
        
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Failed to process LLM response: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    print("\n" + "="*60)
    print("Starting Underwriting AI Service")
    print("Access: http://192.168.22.72:8000")
    print("Docs: http://192.168.22.72:8000/docs")
    print("="*60 + "\n")
    
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")