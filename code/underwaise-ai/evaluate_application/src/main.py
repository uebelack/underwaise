from fastapi import FastAPI, HTTPException, Body
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any, Literal
import numpy as np
import pandas as pd
import joblib
import os

app = FastAPI(
    title="SVM Inference API",
    description=(
        "An API for running inference on an SVM model. "
        "Supports inputs as a Pandas DataFrame encoded in JSON (multiple orients) "
        "or a legacy 2D list of numbers."
    ),
    version="1.0.0",
)

DEFAULT_MODEL_PATH = "svm_model.joblib"
DEFAULT_SCALER_PATH = "scaler.joblib"


class InferenceRequest(BaseModel):
    """
    Input payload for /infer.

    You may provide either:
    - **dataframe** + **orient**: A Pandas DataFrame in JSON form
    - **data**: A legacy 2D array (list of lists) of numeric features
    """

    dataframe: Optional[Dict[str, Any]] = Field(
        default=None,
        description=(
            "JSON object representing a Pandas DataFrame (structure depends on `orient`).\n\n"
            "**Convert a JSON object + orient into a pandas DataFrame. Supported orients:**\n"
            "- **'records'**: `List[Dict[str, Any]]` (e.g., `[{\"f1\": 1, \"f2\": 2}, ...]`)\n"
            "- **'split'**: `{ \"columns\": [...], \"index\": [...], \"data\": [[...],[...],...] }`\n"
            "- **'columns'**: `{ col_name: [values], ... }`\n"
            "- **'index'**: `{ index_key: { col: value, ... }, ... }`\n"
        ),
        example=[
            {"f1": 1.2, "f2": 3.4, "f3": 5.6},
            {"f1": 0.1, "f2": 0.2, "f3": 0.3}
        ],
    )
    orient: Optional[Literal['records', 'split', 'columns', 'index']] = Field(
        default='records',
        description="Pandas JSON orientation for `dataframe`.",
        examples=["records", "split", "columns", "index"],
    )
    data: Optional[List[List[float]]] = Field(
        default=None,
        description="Legacy matrix-like data as a 2D array of floats. Use this **or** `dataframe`.",
        example=[[1.2, 3.4, 5.6], [0.1, 0.2, 0.3]],
    )
    model_file: Optional[str] = Field(
        default=None,
        description=f"Path to the `.joblib` model. Defaults to `{DEFAULT_MODEL_PATH}` if omitted.",
        example="artifacts/svm_model.joblib",
    )
    scaler_file: Optional[str] = Field(
        default=None,
        description=f"Path to the `.joblib` scaler. Defaults to `{DEFAULT_SCALER_PATH}` if omitted.",
        example="artifacts/scaler.joblib",
    )

    class Config:
        # Optional: provide multiple request examples in the schema
        json_schema_extra = {
            "examples": [
                {
                    "summary": "DataFrame as records (default orient)",
                    "value": {
                        "dataframe": [
                            {"f1": 1.2, "f2": 3.4, "f3": 5.6},
                            {"f1": 0.1, "f2": 0.2, "f3": 0.3}
                        ],
                        "orient": "records"
                    },
                },
                {
                    "summary": "DataFrame with split orient",
                    "value": {
                        "dataframe": {
                            "columns": ["f1", "f2", "f3"],
                            "data": [[1.2, 3.4, 5.6], [0.1, 0.2, 0.3]]
                        },
                        "orient": "split"
                    },
                },
                {
                    "summary": "Legacy 2D array",
                    "value": {
                        "data": [[1.2, 3.4, 5.6], [0.1, 0.2, 0.3]]
                    },
                },
            ]
        }


class InferenceResponse(BaseModel):
    success: bool = Field(..., description="Whether the inference call succeeded.")
    logs: List[str] = Field(..., description="Processing log messages.")
    num_samples: int = Field(..., description="Number of samples inferred.")
    num_features: int = Field(..., description="Number of features per sample.")
    predictions: List[str] = Field(..., description="Human-readable mapped predictions.")
    raw_predictions: List[Any] = Field(..., description="Raw model outputs.")
    prediction_margin_to_hyperplane: Any = Field(
        ...,
        description="Distance of datapoint to decision hyperplane"
    )
    used_model_file: str = Field(..., description="Path of the model actually used.")
    used_scaler_file: str = Field(..., description="Path of the scaler actually used.")
    columns_used: Optional[List[str]] = Field(
        None, description="Column order used for inference when a DataFrame was provided."
    )


def dataframe_from_json(obj: Dict[str, Any], orient: str) -> pd.DataFrame:
    """
    Convert a JSON object + orient into a pandas DataFrame.
    Supported orients:
      - 'records': List[Dict[str, Any]] (e.g., [{"f1":1, "f2":2}, ...])
      - 'split':   {"columns":[...], "index":[...], "data":[[...],[...],...]}
      - 'columns': {col_name: [values], ...}
      - 'index':   {index_key: {col: value, ...}, ...}
    """
    if orient == 'records':
        if not isinstance(obj, list):
            raise ValueError("For orient='records', 'dataframe' must be a list of objects (records).")
        return pd.DataFrame.from_records(obj)
    elif orient == 'split':
        if not isinstance(obj, dict) or 'data' not in obj:
            raise ValueError("For orient='split', include keys: 'data', optionally 'columns' and 'index'.")
        return pd.DataFrame(data=obj['data'], columns=obj.get('columns'), index=obj.get('index'))
    elif orient == 'columns':
        if not isinstance(obj, dict):
            raise ValueError("For orient='columns', 'dataframe' must be an object mapping column -> list.")
        return pd.DataFrame.from_dict(obj, orient='columns')
    elif orient == 'index':
        if not isinstance(obj, dict):
            raise ValueError("For orient='index', 'dataframe' must map index -> {col: value}.")
        return pd.DataFrame.from_dict(obj, orient='index')
    else:
        raise ValueError(f"Unsupported orient: {orient}")


@app.post(
    "/infer",
    response_model=InferenceResponse,
    summary="Run SVM inference",
    description=(
        "Accepts features as a Pandas DataFrame encoded in JSON (with selectable `orient`) "
        "or as a legacy 2D numeric array.\n\n"
        "### How the DataFrame JSON is interpreted\n"
        "Convert a JSON object + orient into a pandas DataFrame.\n\n"
        "**Supported orients:**\n"
        "- **'records'**: `List[Dict[str, Any]]` (e.g., `[{\"f1\":1, \"f2\":2}, ...]`)\n"
        "- **'split'**: `{ \"columns\": [...], \"index\": [...], \"data\": [[...],[...],...] }`\n"
        "- **'columns'**: `{ col_name: [values], ... }`\n"
        "- **'index'**: `{ index_key: { col: value, ... }, ... }`\n"
    ),
    tags=["inference"],
    responses={
        422: {
            "description": "Invalid input payload.",
            "content": {
                "application/json": {
                    "example": {"detail": "You must provide either 'dataframe' (with 'orient') or 'data'."}
                }
            },
        },
        404: {
            "description": "Model or scaler file not found.",
            "content": {
                "application/json": {
                    "example": {"detail": "Model file not found: model.joblib"}
                }
            },
        },
        500: {
            "description": "Unhandled server error.",
            "content": {
                "application/json": {
                    "example": {"detail": "Non-numeric values detected after conversion."}
                }
            },
        },
    },
)
def infer(
    request: InferenceRequest = Body(
        ...,
        description=(
            "Provide **either** a `dataframe` (with `orient`) **or** a legacy `data` 2D array. "
            "If `model_file`/`scaler_file` are omitted, defaults are used."
        ),
    )
) -> InferenceResponse:
    """
    Perform inference with an SVM model and optional probability output.
    """
    logs = []

    # Resolve defaults if not provided by UI
    model_path = request.model_file or DEFAULT_MODEL_PATH
    scaler_path = request.scaler_file or DEFAULT_SCALER_PATH
    try:
        logs.append(f"Using model: {model_path}")
        logs.append(f"Using scaler: {scaler_path}")

        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found: {model_path}")
        if not os.path.exists(scaler_path):
            raise FileNotFoundError(f"Scaler file not found: {scaler_path}")

        logs.append("Loading model and scaler for inference...")
        loaded_model = joblib.load(model_path)
        loaded_scaler = joblib.load(scaler_path)

        if request.dataframe is not None:
            df = dataframe_from_json(request.dataframe, request.orient or 'records')
        elif request.data is not None:
            df = pd.DataFrame(request.data)
        else:
            raise HTTPException(status_code=422, detail="You must provide either 'dataframe' (with 'orient') or 'data'.")

        logs.append(f"Constructed DataFrame with shape: {df.shape}")
        X = df.apply(pd.to_numeric, errors='coerce').to_numpy(dtype=float)
        if np.isnan(X).any():
            raise ValueError("Non-numeric values detected after conversion. Please ensure all features are numeric.")

        X_scaled = loaded_scaler.transform(X)
        logs.append("Data scaled successfully.")

        predictions = loaded_model.predict(X_scaled)

        if hasattr(loaded_model, "predict_proba"):
            prediction_margin_to_hyperplane = loaded_model.decision_function(X_scaled).tolist()
        else:
            prediction_margin_to_hyperplane = "Not available for this model"

        label_map = {
            0: 'Acceptance',
            1: 'Risk surcharge indicated',
            2: 'Additional clarification indicated',
            3: 'Rejection'
        }
        mapped_predictions = [label_map.get(int(p), str(p)) for p in predictions]

        return InferenceResponse(
            success=True,
            logs=logs,
            num_samples=int(X.shape[0]),
            num_features=int(X.shape[1]) if X.ndim == 2 else 0,
            predictions=mapped_predictions,
            raw_predictions=np.asarray(predictions).tolist(),
            prediction_margin_to_hyperplane=prediction_margin_to_hyperplane,
            used_model_file=model_path,
            used_scaler_file=skaler_path if (skaler_path := scaler_path) else scaler_path,  # keep as string; ensures presence
            columns_used = None if request.data is not None else [str(c) for c in df.columns.tolist()],
        )

    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
