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
    Fixed 5-dimension risk vector (all values 0.0 to 1.0):
    - mortality_risk: Risk of death from activities
    - disability_risk: Risk of permanent disability
    - illness_risk: Risk of chronic illness or health issues
    - accident_risk: Risk of accidents/injuries
    - lifestyle_risk: General lifestyle health risks (sedentary, stress, etc.)
    """
    mortality_risk: float
    disability_risk: float
    illness_risk: float
    accident_risk: float
    lifestyle_risk: float


class UnderwriteResponse(BaseModel):
    total_risk_score: float  # Overall risk: 0.0 (low) to 1.0 (high)
    activities: List[DetectedActivity]
    risk_vector: RiskVector


@app.post("/get_risk_from_hobbies", response_model=UnderwriteResponse)
def get_risk_from_hobbies(req: UnderwriteRequest):
    """
    Simplified underwriting: Extract activities and calculate a fixed 5-dimension risk vector.
    """

    prompt = f"""
Du bist ein Underwriting-Assistant. Analysiere den folgenden Text und antworte NUR mit gültigem JSON.

Erforderliches JSON-Format:
{{
  "total_risk_score": <float 0.0-1.0>,
  "activities": [
    {{"name": "<activity>", "frequency": "<rarely|occasionally|regularly|frequently>"}}
  ],
  "risk_vector": {{
    "mortality_risk": <float 0.0-1.0>,
    "disability_risk": <float 0.0-1.0>,
    "illness_risk": <float 0.0-1.0>,
    "accident_risk": <float 0.0-1.0>,
    "lifestyle_risk": <float 0.0-1.0>
  }}
}}

Regeln:
- total_risk_score: Gesamtrisiko (0.0 = sehr niedrig, 1.0 = extrem hoch)
- activities: Erkannte Aktivitäten mit Häufigkeit
- risk_vector: 5 fixe Dimensionen für verschiedene Risikoarten
- Nur gültiges JSON ohne zusätzlichen Text
- Dezimaltrenner ist Punkt (.)

Text:
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
            mortality_risk=max(0.0, min(1.0, float(rv["mortality_risk"]))),
            disability_risk=max(0.0, min(1.0, float(rv["disability_risk"]))),
            illness_risk=max(0.0, min(1.0, float(rv["illness_risk"]))),
            accident_risk=max(0.0, min(1.0, float(rv["accident_risk"]))),
            lifestyle_risk=max(0.0, min(1.0, float(rv["lifestyle_risk"])))
        )
        
        return UnderwriteResponse(
            total_risk_score=total_risk,
            activities=activities,
            risk_vector=risk_vector
        )
        
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Failed to process LLM response: {str(e)}")