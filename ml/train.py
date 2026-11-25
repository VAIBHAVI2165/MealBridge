"""Train the date-split XGBRegressor waste-risk model on SYNTHETIC data."""
from __future__ import annotations
import argparse
from pathlib import Path
import joblib
import numpy as np
import pandas as pd
from sklearn.metrics import mean_absolute_error, r2_score
from xgboost import XGBRegressor

FEATURES = [
    "day_of_week", "month", "season", "is_holiday",
    "planned_plates", "leftover_last_7_avg",
]
TARGET = "leftover_plates"
SEASON_ORDER = ["summer", "monsoon", "post-monsoon", "winter"]

def train_model(data_path="ml/data/synthetic_waste_history.csv",
                model_path="ml/risk_model.joblib"):
    df = pd.read_csv(data_path, parse_dates=["date"])
    required = {"date", *FEATURES, TARGET}
    missing = required - set(df.columns)
    if missing:
        raise ValueError(f"Dataset is missing columns: {sorted(missing)}")
    df = df.sort_values("date")
    cutoff = df["date"].max() - pd.DateOffset(months=3)
    train, test = df[df.date < cutoff].copy(), df[df.date >= cutoff].copy()
    if train.empty or test.empty:
        raise ValueError("Need at least 3 months of chronological test data and training data.")

    # Explicit categorical encoding is stored in the model bundle for inference parity.
    for frame in (train, test):
        frame["season"] = pd.Categorical(frame["season"], categories=SEASON_ORDER).codes
    X_train = train[FEATURES].astype(float)
    X_test = test[FEATURES].astype(float)
    model = XGBRegressor(
        n_estimators=350, max_depth=4, learning_rate=0.04,
        subsample=0.9, colsample_bytree=0.9, objective="reg:squarederror",
        random_state=42, n_jobs=4
    )
    model.fit(X_train, train[TARGET])
    predictions = np.maximum(0, model.predict(X_test))
    mae = float(mean_absolute_error(test[TARGET], predictions))
    r2 = float(r2_score(test[TARGET], predictions))
    bundle = {
        "model": model, "features": FEATURES, "season_order": SEASON_ORDER,
        "synthetic": True, "training_rows": int(len(train)),
        "test_rows": int(len(test)), "test_cutoff": str(cutoff.date()),
        "mae": mae, "r2": r2,
    }
    out = Path(model_path)
    out.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(bundle, out)
    print(f"Date split cutoff: {cutoff.date()}")
    print(f"Train rows: {len(train)} | Test rows: {len(test)}")
    print(f"MAE: {mae:.3f}")
    print(f"R²: {r2:.4f}")
    print(f"Saved model bundle: {out}")
    return bundle

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--data", default="ml/data/synthetic_waste_history.csv")
    parser.add_argument("--model", default="ml/risk_model.joblib")
    args = parser.parse_args()
    train_model(args.data, args.model)
