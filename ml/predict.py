"""Inference helpers for the waste-risk model."""
from __future__ import annotations
from datetime import date, datetime
from pathlib import Path
import joblib
import pandas as pd

SEASONS = ["summer", "monsoon", "post-monsoon", "winter"]

def season_for_month(month: int) -> str:
    if 3 <= month <= 6: return "summer"
    if 7 <= month <= 9: return "monsoon"
    if 10 <= month <= 11: return "post-monsoon"
    return "winter"

def load_model(model_path="ml/risk_model.joblib"):
    path = Path(model_path)
    if not path.exists():
        raise FileNotFoundError(
            f"Trained model not found at {path}. Run: python -m ml.make_data && python -m ml.train"
        )
    return joblib.load(path)

def predict_waste(model_bundle, planned_plates: int, target_date: date | datetime | str,
                  leftover_last_7_avg: float = 0.0) -> dict:
    if planned_plates <= 0:
        raise ValueError("planned_plates must be a positive integer")
    dt = pd.Timestamp(target_date)
    season = season_for_month(int(dt.month))
    row = pd.DataFrame([{
        "day_of_week": int(dt.dayofweek),
        "month": int(dt.month),
        "season": SEASONS.index(season),
        "is_holiday": int(dt.strftime("%m-%d") in {"01-01","01-26","08-15","10-02","12-25","03-08","11-01"}),
        "planned_plates": int(planned_plates),
        "leftover_last_7_avg": float(max(0, leftover_last_7_avg)),
    }], columns=model_bundle["features"]).astype(float)
    predicted = max(0.0, float(model_bundle["model"].predict(row)[0]))
    predicted = min(predicted, float(planned_plates))
    ratio = predicted / planned_plates
    level = "Low" if ratio < 0.05 else ("Medium" if ratio <= 0.15 else "High")
    suggested = max(1, min(planned_plates, round(planned_plates - 0.8 * predicted)))
    return {
        "risk_level": level,
        "predicted_leftover": round(predicted, 2),
        "leftover_ratio": round(ratio, 4),
        "suggested_plates": suggested,
        "recommendation": f"Prepare {suggested} plates instead of {planned_plates}.",
        "is_synthetic_model": bool(model_bundle.get("synthetic", True)),
    }
