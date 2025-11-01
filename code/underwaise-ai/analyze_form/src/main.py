from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import json
import os
from langchain_openai import AzureChatOpenAI

API_VERSION = "2025-04-01-preview"


def get_gpt_mini_llm():
    return AzureChatOpenAI(
        openai_api_version=API_VERSION,
        model="gpt-mini",
        azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
        api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    )


app = FastAPI()

# Add CORS middleware to allow requests from other devices
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------ Hobbies Risk Assessment ------------

class UnderwriteRequest(BaseModel):
    text: str = Field(..., description="Freitext zu Hobbys, Aktivitäten, Verhalten")


class UnderwriteResponse(BaseModel):
    risk_score: float  # 0.0 (low) to 10.0 (high)
    explanation: str


@app.post("/get_risk_from_hobbies", response_model=UnderwriteResponse)
def get_risk_from_hobbies(req: UnderwriteRequest):
    """Assess risk from hobbies/activities with a single score."""

    prompt = f"""
Du bist ein Underwriting-Assistant. Analysiere die Hobbys/Aktivitäten und gib EINEN Risikowert zurück.

**Beispiele:**
1. "Wingsuit-Fliegen monatlich" → risk_score: 9.5 (extrem gefährlich, hohes Todesrisiko)
2. "Netflix und Pizza am Wochenende" → risk_score: 5.0 (sedentär, mittleres Gesundheitsrisiko)
3. "Marathonläufer, 5x/Woche Training" → risk_score: 1.5 (sehr gesund, niedriges Risiko)
4. "Gelegentlich Wandern" → risk_score: 1.0 (gesund und sicher)

**Antworte NUR mit gültigem JSON:**

{{
  "risk_score": <float 0.0-10.0>,
  "explanation": "<Kurze Begründung warum dieser Wert gewählt wurde, 1-2 Sätze>"
}}

**Skala:**
- 0.0-2.0: Sehr niedriges Risiko (gesunde, sichere Aktivitäten)
- 2.1-4.0: Niedriges Risiko (normale Aktivitäten)
- 4.1-6.0: Mittleres Risiko (sedentärer Lebensstil oder moderate Risiken)
- 6.1-8.0: Hohes Risiko (gefährliche Sportarten, ungesunder Lebensstil)
- 8.1-10.0: Sehr hohes Risiko (Extremsport, lebensgefährliche Aktivitäten)

**Regeln:**
- Berücksichtige Häufigkeit: "selten" vs "regelmäßig"
- Nur gültiges JSON, Dezimaltrenner ist Punkt (.)
- Erklärung soll konkret auf den Text eingehen

**Text:**
\"\"\"{req.text}\"\"\"
"""

    return _assess_risk(prompt)


# ------------ Health Questions Risk Assessment ------------

class TreatmentLine(BaseModel):
    period: str
    reason: str
    therapist_name: Optional[str] = None
    therapist_address: Optional[str] = None
    treatment_completed: Optional[bool] = None


class HealthQuestionRequest(BaseModel):
    treatments: List[str] = Field(..., description="List of treatment entries, one per line")


class TreatmentRiskScore(BaseModel):
    line_number: int
    treatment_text: str
    risk_score: float  # 0.0 to 10.0
    explanation: str


class HealthQuestionResponse(BaseModel):
    overall_risk_score: float  # 0.0 to 10.0
    treatment_scores: List[TreatmentRiskScore]
    summary: str


# Reusable function to assess risk
def _assess_risk(prompt: str) -> UnderwriteResponse:
    """Reusable function to get risk assessment from LLM."""
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
        
        risk_score = max(0.0, min(10.0, float(parsed["risk_score"])))
        explanation = parsed.get("explanation", "No explanation provided")
        
        return UnderwriteResponse(
            risk_score=risk_score,
            explanation=explanation
        )
        
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Failed to process LLM response: {str(e)}")


# Reusable function for health question assessment
def _assess_health_treatments(treatments: List[str], question_context: str) -> HealthQuestionResponse:
    """Reusable function to assess multiple treatment lines."""
    
    prompt = f"""
Du bist ein Underwriting-Assistant für Kranken- und Berufsunfähigkeitsversicherungen.

**Kontext:** {question_context}

**Aufgabe:** Bewerte jede Behandlung einzeln mit einem Risiko-Score von 0.0 bis 10.0.

**Behandlungen:**
{chr(10).join(f"{i+1}. {t}" for i, t in enumerate(treatments))}

**Antworte NUR mit gültigem JSON:**

{{
  "overall_risk_score": <float 0.0-10.0>,
  "treatment_scores": [
    {{
      "line_number": 1,
      "treatment_text": "<Originaltext>",
      "risk_score": <float 0.0-10.0>,
      "explanation": "<Begründung für diesen Score>"
    }},
    ...
  ],
  "summary": "<Gesamteinschätzung aller Behandlungen zusammen>"
}}

**Risiko-Skala:**
- 0.0-2.0: Sehr niedriges Risiko (abgeschlossene Routinebehandlungen, normale Erkältungen)
- 2.1-4.0: Niedriges Risiko (kleinere Beschwerden, vollständig ausgeheilt)
- 4.1-6.0: Mittleres Risiko (chronische aber gut behandelbare Erkrankungen)
- 6.1-8.0: Hohes Risiko (schwere Erkrankungen, laufende Behandlungen)
- 8.1-10.0: Sehr hohes Risiko (lebensbedrohliche Erkrankungen, Berufsunfähigkeit)

**Bewertungskriterien:**
- Schweregrad der Erkrankung
- Ist die Behandlung abgeschlossen oder laufend?
- Dauer der Behandlung
- Art der Therapie (ambulant vs. stationär)
- Prognose und Heilungschancen

**Regeln:**
- Nur gültiges JSON
- Dezimaltrenner ist Punkt (.)
- Jede Behandlung einzeln bewerten
- Overall_risk_score ist der Durchschnitt oder höchster Wert wenn eine Behandlung sehr kritisch ist
"""

    llm = get_gpt_mini_llm()
    
    try:
        llm_response = llm.invoke(prompt)
        raw = llm_response.content.strip()
        
        if not raw.startswith("{"):
            start = raw.index("{")
            end = raw.rindex("}") + 1
            raw = raw[start:end]
        
        parsed = json.loads(raw)
        
        overall_risk = max(0.0, min(10.0, float(parsed["overall_risk_score"])))
        summary = parsed.get("summary", "No summary provided")
        
        treatment_scores = []
        for ts in parsed["treatment_scores"]:
            treatment_scores.append(TreatmentRiskScore(
                line_number=int(ts["line_number"]),
                treatment_text=ts["treatment_text"],
                risk_score=max(0.0, min(10.0, float(ts["risk_score"]))),
                explanation=ts["explanation"]
            ))
        
        return HealthQuestionResponse(
            overall_risk_score=overall_risk,
            treatment_scores=treatment_scores,
            summary=summary
        )
        
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Failed to process LLM response: {str(e)}")


@app.post("/assess_physical_health", response_model=HealthQuestionResponse)
def assess_physical_health(req: HealthQuestionRequest):
    """
    Endpoint 1: Physical health complaints, illnesses, accidents in past 5 years
    
    Question: Have you had any health complaints, illnesses, consequences of accidents, 
    or congenital conditions in the past five years for which you sought treatment?
    
    Expected format per line: Period, Reason, Name and address of therapist, Treatment completed?
    """
    
    context = """
Frage: Hatten Sie in den letzten fünf Jahren gesundheitliche Beschwerden, Krankheiten, 
Unfallfolgen oder angeborene Leiden, wegen derer Sie in ärztlicher Behandlung waren?

Bewerte jede Behandlung basierend auf:
- Art der Erkrankung/Beschwerde
- Zeitraum (kürzlich vs. vor Jahren)
- Ob die Behandlung abgeschlossen ist
- Schweregrad der Erkrankung
"""
    
    return _assess_health_treatments(req.treatments, context)


@app.post("/assess_mental_health", response_model=HealthQuestionResponse)
def assess_mental_health(req: HealthQuestionRequest):
    """
    Endpoint 2: Psychiatric, psychological, or psychotherapeutic treatment
    
    Question: Have you ever been advised or treated by a psychiatrist, psychologist, 
    or psychotherapist?
    
    Expected format per line: Period, Reason, Name and address of therapist, Treatment completed?
    """
    
    context = """
Frage: Waren Sie jemals in psychiatrischer, psychologischer oder psychotherapeutischer 
Beratung oder Behandlung?

WICHTIG: Psychische Erkrankungen haben oft ein HÖHERES Risiko für Berufsunfähigkeit!

Bewerte jede Behandlung basierend auf:
- Art der psychischen Erkrankung (Depression, Burnout, Angststörung, etc.)
- Schweregrad (leicht vs. schwer)
- Zeitraum und Dauer
- Ob die Behandlung abgeschlossen ist
- Rezidivrisiko (Rückfallgefahr)
- Auswirkungen auf Arbeitsfähigkeit
"""
    
    return _assess_health_treatments(req.treatments, context)


@app.post("/assess_medication", response_model=HealthQuestionResponse)
def assess_medication(req: HealthQuestionRequest):
    """
    Endpoint 3: Regular medication use in past 5 years
    
    Question: Have you taken or do you take medication regularly in the past five years 
    (excluding contraception)?
    
    Expected format per line: Period, Reason, Name of medication, Dosis, Treatment completed?
    """
    
    context = """
Frage: Haben Sie in den letzten fünf Jahren regelmäßig Medikamente eingenommen 
(außer Verhütungsmittel)?

Bewerte jede Medikation basierend auf:
- Art des Medikaments (z.B. Blutdrucksenker, Antidepressiva, Schmerzmittel)
- Grund für die Medikation (zugrunde liegende Erkrankung)
- Dauer der Einnahme (kurz vs. dauerhaft)
- Dosierung
- Ob die Medikation noch läuft oder abgeschlossen ist
- Schweregrad der zugrunde liegenden Erkrankung
"""
    
    return _assess_health_treatments(req.treatments, context)


@app.post("/assess_work_disability", response_model=HealthQuestionResponse)
def assess_work_disability(req: HealthQuestionRequest):
    """
    Endpoint 4: Work disability or inability to work in past 5 years
    
    Question: Is your ability to work or earn currently restricted, or have you been 
    fully or partially unable to work for more than four consecutive weeks in the past 
    five years due to health reasons?
    
    Expected format per line: Period, Reason, Treatment completed?
    """
    
    context = """
Frage: Ist Ihre Arbeits- oder Erwerbsfähigkeit derzeit eingeschränkt oder waren Sie in den 
letzten fünf Jahren länger als vier Wochen durchgehend ganz oder teilweise 
arbeitsunfähig aus gesundheitlichen Gründen?

SEHR WICHTIG: Arbeitsunfähigkeit ist ein STARKER Indikator für hohes Risiko!

Bewerte jede Phase der Arbeitsunfähigkeit basierend auf:
- Dauer der Arbeitsunfähigkeit (4 Wochen vs. Monate)
- Grund (Art der Erkrankung)
- Vollständige vs. teilweise Arbeitsunfähigkeit
- Ist die Person wieder voll arbeitsfähig?
- Rezidivrisiko
- Chronische vs. akute Ursache
"""
    
    return _assess_health_treatments(req.treatments, context)


if __name__ == "__main__":
    import uvicorn
    print("\n" + "="*60)
    print("Starting Underwriting AI Service")
    print("Access: http://192.168.22.72:8000")
    print("Docs: http://192.168.22.72:8000/docs")
    print("="*60 + "\n")
    
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")