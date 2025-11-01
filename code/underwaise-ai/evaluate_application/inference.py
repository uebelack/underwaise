from fastapi import FastAPI, Query, HTTPException
from fastapi.responses import JSONResponse
import numpy as np
import joblib
from sklearn.datasets import make_classification

app = FastAPI(title="SVM Inference API")

@app.get("/infer")
def infer(model_file: str = Query(..., description="Path to the model file (.joblib)"),
          scaler_file: str = Query(..., description="Path to the scaler file (.joblib)")):
    logs = []

    try:
        logs.append("Loading model and scaler for inference...")
        loaded_model = joblib.load(model_file)
        loaded_scaler = joblib.load(scaler_file)

        # Generate dummy data for example inference
        X, y = make_classification(
            n_samples=10,
            n_features=20,
            n_informative=10,
            n_redundant=2,
            n_classes=4,
            n_clusters_per_class=1,
            random_state=42
        )

        label_map = {
            0: 'Acceptance',
            1: 'Risk surcharge indicated',
            2: 'Additional clarification indicated',
            3: 'Rejection'
        }

        # Example inference
        new_sample = X[0].reshape(1, -1)
        new_sample_scaled = loaded_scaler.transform(new_sample)
        prediction = loaded_model.predict(new_sample_scaled)

        if hasattr(loaded_model, "predict_proba"):
            prediction_prob = loaded_model.predict_proba(new_sample_scaled).tolist()
        else:
            prediction_prob = "Not available for this strategy"

        logs.append(f"Predicted class: {prediction[0]}")
        logs.append(f"Class probabilities: {prediction_prob}")

        return JSONResponse(content={
            "success": True,
            "logs": logs,
            "prediction": int(prediction[0]),
            "prediction_probabilities": prediction_prob
        })

    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
