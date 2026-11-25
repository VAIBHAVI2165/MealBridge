"""Generate the project's explicitly SYNTHETIC food-waste training dataset.

Creates 6 providers x 730 days (4,380 rows, approximately 5,000) spanning
two years. No real provider history or personal data is used.
"""
from __future__ import annotations
import argparse
from pathlib import Path
import numpy as np
import pandas as pd

SYNTHETIC_DATASET = True
PROVIDER_COUNT = 6
DAYS = 730

def season_for_month(month: int) -> str:
    if 3 <= month <= 6:
        return "summer"
    if 7 <= month <= 9:
        return "monsoon"
    if 10 <= month <= 11:
        return "post-monsoon"
    return "winter"

def generate_dataset(output_path: str | Path = "ml/data/synthetic_waste_history.csv",
                     start_date: str = "2024-01-01", seed: int = 42,
                     providers: int = PROVIDER_COUNT, days: int = DAYS) -> pd.DataFrame:
    rng = np.random.default_rng(seed)
    dates = pd.date_range(start=start_date, periods=days, freq="D")
    rows = []
    # Stable provider-level scale variation keeps the synthetic records realistic.
    provider_scales = rng.uniform(0.82, 1.18, size=providers)
    holiday_dates = {
        "01-01", "01-26", "08-15", "10-02", "12-25",
        "03-08", "11-01"
    }
    for provider_idx in range(providers):
        history = []
        for date in dates:
            dow = int(date.dayofweek)
            month = int(date.month)
            season = season_for_month(month)
            is_holiday = int(date.strftime("%m-%d") in holiday_dates)
            planned = int(rng.integers(180, 601) * provider_scales[provider_idx])
            base_rate = 0.08
            if dow >= 5 or is_holiday:
                base_rate += 0.06
            if season == "summer":
                base_rate += 0.03
            elif season == "winter":
                base_rate -= 0.02
            # Small random noise; clamp to plausible range.
            rate = float(np.clip(base_rate + rng.normal(0, 0.025), 0.01, 0.35))
            leftover = int(np.clip(round(planned * rate), 0, planned))
            trailing = float(np.mean(history[-7:])) if history else planned * 0.08
            rows.append({
                "date": date,
                "provider_id": f"SYN_PROVIDER_{provider_idx + 1}",
                "day_of_week": dow,
                "month": month,
                "season": season,
                "is_holiday": is_holiday,
                "planned_plates": planned,
                "leftover_last_7_avg": round(trailing, 2),
                "leftover_plates": leftover,
            })
            history.append(leftover)
    df = pd.DataFrame(rows)
    df["date"] = pd.to_datetime(df["date"])
    out = Path(output_path)
    out.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(out, index=False)
    return df

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate SYNTHETIC FoodRescue AI waste data.")
    parser.add_argument("--output", default="ml/data/synthetic_waste_history.csv")
    parser.add_argument("--seed", type=int, default=42)
    args = parser.parse_args()
    frame = generate_dataset(args.output, seed=args.seed)
    print(f"Created {len(frame):,} SYNTHETIC rows at {args.output}")
    print(frame.head())
