from fastapi import FastAPI, HTTPException, Form
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import pandas as pd
import numpy as np
import joblib

app = FastAPI(title="SVM Inference API")

# Define expected input schema
class InferenceRequest(BaseModel):
    data: list[list[float]]  # 2D array (list of samples)
    model_file: str          # path to .joblib model
    scaler_file: str         # path to .joblib scaler

@app.post("/infer")
def infer(request: InferenceRequest):
    logs = []

    try:
        logs.append("Loading model and scaler for inference...")
        loaded_model = joblib.load(request.model_file)
        loaded_scaler = joblib.load(request.scaler_file)

        # Convert input JSON to numpy array
        X = np.array(request.data)
        logs.append(f"Received input data with shape: {X.shape}")

        # Scale input data
        X_scaled = loaded_scaler.transform(X)
        logs.append("Data scaled successfully.")

        # Predict
        predictions = loaded_model.predict(X_scaled)

        # Optionally get prediction probabilities
        if hasattr(loaded_model, "predict_proba"):
            prediction_prob = loaded_model.predict_proba(X_scaled).tolist()
        else:
            prediction_prob = "Not available for this model"

        # Optional mapping
        label_map = {
            0: 'Acceptance',
            1: 'Risk surcharge indicated',
            2: 'Additional clarification indicated',
            3: 'Rejection'
        }
        mapped_predictions = [label_map.get(p, str(p)) for p in predictions]

        return JSONResponse(content={
            "success": True,
            "logs": logs,
            "num_samples": len(X),
            "predictions": mapped_predictions,
            "raw_predictions": predictions.tolist(),
            "prediction_probabilities": prediction_prob
        })

    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
