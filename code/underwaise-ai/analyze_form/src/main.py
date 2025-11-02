#This throws an error
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
    specialSportActivities: str = Field(..., description="Freitext zu Hobbys, Aktivitäten, Verhalten")


class UnderwriteResponse(BaseModel):
    risk_score: int  # 1 (low) to 10 (high)
    explanation: str


@app.post("/get_risk_from_hobbies", response_model=UnderwriteResponse)
def get_risk_from_hobbies(req: UnderwriteRequest):
    """Assess risk from hobbies/activities with a single score."""

    prompt = f"""
Du bist ein Underwriting-Assistant für Lebensversicherungen. Analysiere die Hobbys/Aktivitäten und gib EINEN Risikowert zurück.

**Beispiele:**
1. "Wingsuit-Fliegen monatlich" → risk_score: 10 (extrem gefährlich, hohes Todesrisiko)
2. "Netflix und Pizza am Wochenende" → risk_score: 5 (sedentär, mittleres Gesundheitsrisiko)
3. "Marathonläufer, 5x/Woche Training" → risk_score: 2 (sehr gesund, niedriges Risiko)
4. "Gelegentlich Wandern" → risk_score: 1 (gesund und sicher)

**Antworte NUR mit gültigem JSON:**

{{
  "risk_score": <integer 1-10>,
  "explanation": "<Kurze Begründung warum dieser Wert gewählt wurde, 1-2 Sätze>"
}}

**Skala (nur ganze Zahlen):**
- 1-2: Sehr niedriges Risiko (gesunde, sichere Aktivitäten)
- 3-4: Niedriges Risiko (normale Aktivitäten)
- 5-6: Mittleres Risiko (sedentärer Lebensstil oder moderate Risiken)
- 7-8: Hohes Risiko (gefährliche Sportarten, ungesunder Lebensstil)
- 9-10: Sehr hohes Risiko (Extremsport, lebensgefährliche Aktivitäten)

**Regeln:**
- Berücksichtige Häufigkeit: "selten" vs "regelmässig"
- Nur gültiges JSON
- risk_score muss eine ganze Zahl zwischen 1 und 10 sein
- Erklärung soll konkret auf den Text eingehen

**Text:**
\"\"\"{req.specialSportActivities}\"\"\"
"""

    return _assess_risk(prompt)


# ------------ Health Questions Risk Assessment ------------

class FlexibleHealthRequest(BaseModel):
    """Accepts any dictionary structure - no field validation"""
    model_config = {"extra": "allow"}
    
    def __init__(self, **data):
        # Pass through any data without validation
        super().__init__()
        self.__dict__.update(data)


# Remove all the specific treatment models, keep only response models
class TreatmentRiskScore(BaseModel):
    line_number: int
    treatment_text: str
    risk_score: int  # 1 to 10
    explanation: str


class HealthQuestionResponse(BaseModel):
    overall_risk_score: int  # 1 to 10
    treatment_scores: List[TreatmentRiskScore]
    summary: str


# Reusable function to assess risk
def _assess_risk(prompt: str) -> UnderwriteResponse:
    """Reusable function to get risk assessment from LLM with retry."""
    llm = get_gpt_mini_llm()
    
    last_error = None
    for attempt in range(3):
        try:
            llm_response = llm.invoke(prompt)
            raw = llm_response.content.strip()
            
            # Extract JSON if LLM added extra text
            if not raw.startswith("{"):
                start = raw.index("{")
                end = raw.rindex("}") + 1
                raw = raw[start:end]
            
            parsed = json.loads(raw)
            
            risk_score = max(1, min(10, int(parsed["risk_score"])))
            explanation = parsed.get("explanation", "No explanation provided")
            
            return UnderwriteResponse(
                risk_score=risk_score,
                explanation=explanation
            )
            
        except Exception as e:
            last_error = e
            if attempt < 2:  # Don't log on last attempt
                print(f"Attempt {attempt + 1} failed: {str(e)}. Retrying...")
                continue
    
    # All attempts failed
    raise HTTPException(status_code=502, detail=f"Failed to process LLM response after 3 attempts: {str(last_error)}")


# Reusable function for health question assessment
def _assess_health_treatments(request_data: dict, question_context: str) -> HealthQuestionResponse:
    """Reusable function to assess multiple treatment lines with retry."""
    
    # Extract treatments from whatever field name is provided
    treatments = None
    for key, value in request_data.items():
        if isinstance(value, list) and len(value) > 0:
            treatments = value
            break
    
    if not treatments:
        raise HTTPException(status_code=400, detail="No treatment list found in request")
    
    # Convert treatment objects to readable strings for the LLM
    treatment_strings = []
    for i, t in enumerate(treatments):
        treatment_str = json.dumps(t, ensure_ascii=False)
        treatment_strings.append(f"{i+1}. {treatment_str}")
    
    prompt = f"""
Du bist ein Underwriting-Assistant für Lebensversicherungen. Du sollst die Risiken von Behandlungen einschätzen.

**Kontext:** {question_context}

**Aufgabe:** Bewerte jede Behandlung einzeln mit einem Risiko-Score von 1 bis 10 (nur ganze Zahlen).
Interpretiere die JSON-Daten flexibel - nicht alle Felder sind immer vorhanden.

**Behandlungen:**
{chr(10).join(treatment_strings)}

**Antworte NUR mit gültigem JSON:**

{{
  "overall_risk_score": <integer 1-10>,
  "treatment_scores": [
    {{
      "line_number": 1,
      "treatment_text": "<Originaltext als JSON-String>",
      "risk_score": <integer 1-10>,
      "explanation": "<Begründung für diesen Score>"
    }},
    ...
  ],
  "summary": "<Gesamteinschätzung aller Behandlungen zusammen>"
}}

**Risiko-Skala (nur ganze Zahlen):**
- 1-2: Sehr niedriges Risiko (abgeschlossene Routinebehandlungen, normale Erkältungen)
- 3-4: Niedriges Risiko (kleinere Beschwerden, vollständig ausgeheilt)
- 5-6: Mittleres Risiko (chronische aber gut behandelbare Erkrankungen)
- 7-8: Hohes Risiko (schwere Erkrankungen, laufende Behandlungen)
- 9-10: Sehr hohes Risiko (lebensbedrohliche Erkrankungen, Berufsunfähigkeit)

**Bewertungskriterien:**
- Schweregrad der Erkrankung
- Ist die Behandlung abgeschlossen oder laufend?
- Dauer der Behandlung
- Art der Therapie (ambulant vs. stationär)
- Prognose und Heilungschancen

**WICHTIGE Regeln:**
- Nur gültiges JSON zurückgeben
- Alle risk_score Werte müssen ganze Zahlen zwischen 1 und 10 sein
- Jede Behandlung einzeln bewerten
- Overall_risk_score ist der höchste Wert wenn eine Behandlung sehr kritisch ist. Sollten zwei oder mehr höhere Werte vorhanden sein, kann es auch mal eine Zahl höher sein.
- treatment_text muss den Original-JSON-String der Behandlung enthalten
- Wenn Informationen fehlen, interpretiere basierend auf vorhandenen Daten
"""

    llm = get_gpt_mini_llm()
    
    last_error = None
    for attempt in range(3):
        try:
            llm_response = llm.invoke(prompt)
            raw = llm_response.content.strip()
            
            if not raw.startswith("{"):
                start = raw.index("{")
                end = raw.rindex("}") + 1
                raw = raw[start:end]
            
            parsed = json.loads(raw)
            
            overall_risk = max(1, min(10, int(parsed["overall_risk_score"])))
            summary = parsed.get("summary", "No summary provided")
            
            treatment_scores = []
            for ts in parsed["treatment_scores"]:
                treatment_scores.append(TreatmentRiskScore(
                    line_number=int(ts["line_number"]),
                    treatment_text=ts["treatment_text"],
                    risk_score=max(1, min(10, int(ts["risk_score"]))),
                    explanation=ts["explanation"]
                ))
            
            return HealthQuestionResponse(
                overall_risk_score=overall_risk,
                treatment_scores=treatment_scores,
                summary=summary
            )
            
        except Exception as e:
            last_error = e
            if attempt < 2:  # Don't log on last attempt
                print(f"Attempt {attempt + 1} failed: {str(e)}. Retrying...")
                continue
    
    # All attempts failed
    raise HTTPException(status_code=502, detail=f"Failed to process LLM response after 3 attempts: {str(last_error)}")


@app.post("/assess_physical_health", response_model=HealthQuestionResponse)
async def assess_physical_health(request_data: dict):
    """
    Endpoint 1: Physical health complaints, illnesses, accidents in past 5 years
    
    Question: Have you had any health complaints, illnesses, consequences of accidents, 
    or congenital conditions in the past five years for which you sought treatment?
    """
    
    context = """
Frage: Hatten Sie in den letzten fünf Jahren gesundheitliche Beschwerden, Krankheiten, 
Unfallfolgen oder angeborene Leiden, wegen derer Sie in ärztlicher Behandlung waren?

Erwartete Felder (können variieren):
- startDate: Startdatum der Behandlung (YYYY-MM-DD)
- endDate: Enddatum der Behandlung (YYYY-MM-DD oder null wenn laufend)
- reason: Grund/Diagnose der Behandlung
- isTreatmentCompleted: Boolean - ob Behandlung abgeschlossen ist
- treatmentFacilityAddress: Adresse der Behandlungseinrichtung (optional)

Bewerte jede Behandlung basierend auf:
- Art der Erkrankung/Beschwerde
- Zeitraum (kürzlich vs. vor Jahren)
- Ob die Behandlung abgeschlossen ist (isTreatmentCompleted)
- Schweregrad der Erkrankung
- Chronisch vs. akut
"""
    
    return _assess_health_treatments(request_data, context)


@app.post("/assess_mental_health", response_model=HealthQuestionResponse)
async def assess_mental_health(request_data: dict):
    """
    Endpoint 2: Psychiatric, psychological, or psychotherapeutic treatment
    
    Question: Have you ever been advised or treated by a psychiatrist, psychologist, 
    or psychotherapist?
    """
    
    context = """
Frage: Waren Sie jemals in psychiatrischer, psychologischer oder psychotherapeutischer 
Beratung oder Behandlung?

WICHTIG: Psychische Erkrankungen haben oft ein HÖHERES Risiko für Berufsunfähigkeit!

Erwartete Felder (können variieren):
- startDate: Startdatum der Behandlung (YYYY-MM-DD)
- endDate: Enddatum der Behandlung (YYYY-MM-DD oder null wenn laufend)
- reason: Art der psychischen Erkrankung/Behandlung
- isTreatmentCompleted: Boolean - ob Behandlung abgeschlossen ist
- treatmentFacilityAddress: Adresse der Behandlungseinrichtung (optional)

Bewerte jede Behandlung basierend auf:
- Art der psychischen Erkrankung (Depression, Burnout, Angststörung, etc.)
- Schweregrad (leicht vs. schwer)
- Zeitraum und Dauer
- Ob die Behandlung abgeschlossen ist (isTreatmentCompleted)
- Rezidivrisiko (Rückfallgefahr)
- Auswirkungen auf Arbeitsfähigkeit
"""
    
    return _assess_health_treatments(request_data, context)


@app.post("/assess_medication", response_model=HealthQuestionResponse)
async def assess_medication(request_data: dict):
    """
    Endpoint 3: Regular medication use in past 5 years
    
    Question: Have you taken or do you take medication regularly in the past five years 
    (excluding contraception)?
    """
    
    context = """
Frage: Haben Sie in den letzten fünf Jahren regelmässig Medikamente eingenommen 
(ausser Verhütungsmittel)?

Erwartete Felder (können variieren):
- startDate: Startdatum der Medikation (YYYY-MM-DD)
- endDate: Enddatum der Medikation (YYYY-MM-DD oder null wenn laufend)
- reason: Grund für die Medikation
- medicationNameAndDosage: Name und Dosierung des Medikaments
- medicationPeriodicity: Häufigkeit (z.B. DAILY, WEEKLY)
- isTreatmentCompleted: Boolean - ob Medikation beendet ist

Bewerte jede Medikation basierend auf:
- Art des Medikaments und zugrunde liegende Erkrankung
- Grund für die Medikation (reason)
- Dauer der Einnahme (startDate bis endDate)
- Häufigkeit der Einnahme (medicationPeriodicity)
- Ob die Medikation noch läuft (isTreatmentCompleted)
- Schweregrad der zugrunde liegenden Erkrankung
"""
    
    return _assess_health_treatments(request_data, context)


@app.post("/assess_work_disability", response_model=HealthQuestionResponse)
async def assess_work_disability(request_data: dict):
    """
    Endpoint 4: Work disability or inability to work in past 5 years
    
    Question: Is your ability to work or earn currently restricted, or have you been 
    fully or partially unable to work for more than four consecutive weeks in the past 
    five years due to health reasons?
    """
    
    context = """
Frage: Ist Ihre Arbeits- oder Erwerbsfähigkeit derzeit eingeschränkt oder waren Sie in den 
letzten fünf Jahren länger als vier Wochen durchgehend ganz oder teilweise 
arbeitsunfähig aus gesundheitlichen Gründen?

SEHR WICHTIG: Arbeitsunfähigkeit ist ein STARKER Indikator für hohes Risiko!

Erwartete Felder (können variieren):
- startDate: Startdatum der Arbeitsunfähigkeit (YYYY-MM-DD)
- endDate: Enddatum der Arbeitsunfähigkeit (YYYY-MM-DD oder null wenn aktuell noch AU)
- reason: Grund für die Arbeitsunfähigkeit
- isTreatmentCompleted: Boolean - ob wieder arbeitsfähig

Bewerte jede Phase der Arbeitsunfähigkeit basierend auf:
- Dauer der Arbeitsunfähigkeit (Differenz zwischen startDate und endDate)
- Grund (Art der Erkrankung im reason Feld)
- Ob Person wieder arbeitsfähig ist (isTreatmentCompleted)
- Rezidivrisiko
- Chronische vs. akute Ursache
- Besonders kritisch: psychische Erkrankungen, lange Ausfallzeiten (>3 Monate)
"""
    
    return _assess_health_treatments(request_data, context)

# Settings (dev)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")