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
    - fitness_risk: Physical fitness and activity level (0-10 scale, inverted: 10=very fit, 0=sedentary)
    - bmi_risk: Body mass index related risks (0-10 scale)
    - activity_risk: Risk from sports, hobbies, and leisure activities (0-10 scale)
    """
    physiological_risk: float  # 0-10
    psychological_risk: float  # 0-10
    medication_risk: float  # 0-10
    fitness_risk: float  # 0-10 (higher = fitter)
    bmi_risk: float  # 0-10
    activity_risk: float  # 0-10


class UnderwriteResponse(BaseModel):
    total_risk_score: float  # Overall risk: 0.0 (low) to 1.0 (high)
    activities: List[DetectedActivity]
    risk_vector: RiskVector


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
- Extremsport → Unfallrisiko, aber auch psychologisches Risiko (Adrenalinsucht)
- Sedentärer Lebensstil (Gaming, Netflix) → niedriges Fitness-Level, BMI-Risiko, physiologische Risiken
- Hochstress-Hobbies (Börsenhandel, Wettbewerbe) → psychologisches Risiko
- Kampfsport regelmäßig → höheres Unfallrisiko, aber besseres Fitness-Level
- Vegane/spezielle Ernährung erwähnt → könnte auf Gesundheitsbewusstsein hinweisen (positiv)

**Beispiel-Analysen:**
1. "Ich gehe gerne feiern, Techno-Partys am Wochenende" 
   → activity_risk: 3-4, medication_risk: 6-7 (Partykultur), psychological_risk: 4-5

2. "Wingsuit-Fliegen ist meine Leidenschaft, mache es monatlich"
   → activity_risk: 10, physiological_risk: 8, psychological_risk: 7

3. "Entspanne mit Netflix, Pizza, am Wochenende nichts Besonderes"
   → fitness_risk: 2-3 (schlecht), bmi_risk: 6-7, activity_risk: 1

4. "Marathonläufer, trainiere 5x/Woche, gesunde Ernährung"
   → fitness_risk: 9-10 (sehr gut!), physiological_risk: 2-3, bmi_risk: 2

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
  }}
}}

**Skalen-Bedeutung:**
- physiological_risk: 0=kerngesund, 10=schwere Organprobleme zu erwarten
- psychological_risk: 0=mental stabil, 10=hohes psychisches Risiko
- medication_risk: 0=kein Substanzkonsum, 10=hohe Abhängigkeitsgefahr
- fitness_risk: 0=komplett inaktiv, 10=Hochleistungssportler (ACHTUNG: höher ist besser!)
- bmi_risk: 0=optimales Gewicht, 10=starkes Über-/Untergewicht
- activity_risk: 0=sichere Aktivitäten, 10=lebensgefährliche Extremsportarten
- total_risk_score: Gewichteter Durchschnitt für Versicherungsentscheidung (0.0-1.0)

**Regeln:**
- Berücksichtige Häufigkeit: "selten Fallschirmspringen" ≠ "wöchentlich Fallschirmspringen"
- Erkenne Lifestyle-Muster und Zusammenhänge
- Sei präzise bei der Risikobewertung
- Nur gültiges JSON ohne Erklärungen
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
            risk_vector=risk_vector
        )
        
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Failed to process LLM response: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    # Expose to local network: accessible via your IP 192.168.22.72
    uvicorn.run(app, host="0.0.0.0", port=8000)