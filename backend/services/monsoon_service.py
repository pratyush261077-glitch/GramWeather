"""
Monsoon Onset & Break Prediction Service
SIH26086: Hyperlocal Monsoon Onset & Break Prediction System (Block/Village Scale)

Onset detection adapts criteria from Pai et al. (2014):
  - 5-day cumulative rainfall >= 40 mm
  - At least 2 of those 5 days with >= 2.5 mm

Rainfall data sourced from Open-Meteo Archive API (ERA5 reanalysis) and
Open-Meteo Forecast API (NWP ensemble).

ALL confidence scores are HEURISTIC — they are NOT calibrated or validated
against ground-truth observations.
"""

import httpx
from typing import Dict, Any, List, Optional, Tuple
from datetime import date, timedelta

# ─────────────────────────────────────────────────────────────────────────────
# Climatological Onset Normals — Punjab Blocks
# ─────────────────────────────────────────────────────────────────────────────
# Source: APPROXIMATE values interpolated from IMD monsoon isochrone maps.
# These are NOT official IMD station-level or block-level normals.
# Typical Punjab monsoon onset range: ~25 Jun to ~1 Jul.
#
# Format: "Block": (month, day)

ONSET_NORMAL: Dict[str, Tuple[int, int]] = {
    # --- Specified by user (IMD isochrone approximation) ---
    "Khanna":       (6, 28),
    "Ludhiana":     (6, 28),
    "Amritsar":     (6, 27),
    "Patiala":      (6, 29),
    "Jalandhar":    (6, 27),
    "Ferozepur":    (6, 29),
    "Bathinda":     (7, 1),
    # --- Additional Punjab blocks (plausible dates, Jun 25 – Jul 1) ---
    "Sangrur":      (6, 29),
    "Moga":         (6, 29),
    "Gurdaspur":    (6, 26),
    "Hoshiarpur":   (6, 27),
    "Mansa":        (6, 30),
    "Kapurthala":   (6, 27),
    "Samrala":      (6, 28),   # same block as Khanna district
    "Payal":        (6, 28),   # Ludhiana district
    "Faridkot":     (6, 30),
    "Muktsar":      (7, 1),
    "Ropar":        (6, 27),
    "Mohali":       (6, 28),
}

ONSET_NORMAL_PROVENANCE = (
    "APPROXIMATE — interpolated from IMD monsoon isochrone maps. "
    "NOT official IMD block-level onset dates."
)

# Fallback for blocks not in the lookup (general Punjab average)
_PUNJAB_DEFAULT = (6, 28)


def _get_normal_onset(block: str, year: int) -> date:
    """Returns the climatological normal onset date for a given block and year."""
    entry = ONSET_NORMAL.get(block, _PUNJAB_DEFAULT)
    return date(year, entry[0], entry[1])


# ─────────────────────────────────────────────────────────────────────────────
# Onset Detection
# ─────────────────────────────────────────────────────────────────────────────

def detect_onset(daily_rain: List[Dict[str, Any]]) -> Optional[date]:
    """
    Detect effective monsoon onset from daily rainfall data.

    Criteria (adapted from IMD / Pai et al. 2014):
      First date from 1 June where the 5-day cumulative rainfall >= 40 mm
      AND at least 2 of those 5 days have >= 2.5 mm individual rainfall.

    Args:
        daily_rain: List of {"date": "YYYY-MM-DD", "precipitation_sum": float}

    Returns:
        date of detected onset, or None if criteria never met.
    """
    if not daily_rain or len(daily_rain) < 5:
        return None

    # Parse and filter to June onward, sorted by date
    entries = []
    for d in daily_rain:
        dt = (date.fromisoformat(d["date"])
              if isinstance(d["date"], str) else d["date"])
        if dt.month >= 6:
            rain = float(d.get("precipitation_sum", 0.0) or 0.0)
            entries.append({"date": dt, "rain": rain})

    entries.sort(key=lambda x: x["date"])

    for i in range(len(entries) - 4):
        window = entries[i:i + 5]
        cumulative = sum(e["rain"] for e in window)
        wet_days = sum(1 for e in window if e["rain"] >= 2.5)

        if cumulative >= 40.0 and wet_days >= 2:
            return window[0]["date"]

    return None


# ─────────────────────────────────────────────────────────────────────────────
# Break Risk Classification
# ─────────────────────────────────────────────────────────────────────────────

def classify_break_risk(forecast_7d_rain_mm: float, phase: str) -> str:
    """
    Classify monsoon break risk from 7-day forecast total rainfall.

    Returns "HIGH", "MODERATE", "LOW", or "N/A" (before onset).
    """
    if phase in ("PRE_MONSOON", "PRE_ONSET"):
        return "N/A"

    if forecast_7d_rain_mm < 10.0:
        return "HIGH"
    elif forecast_7d_rain_mm < 15.0:
        return "MODERATE"
    else:
        return "LOW"


# ─────────────────────────────────────────────────────────────────────────────
# Onset Status & Confidence Heuristic
# ─────────────────────────────────────────────────────────────────────────────

def onset_status(
    detected_onset: Optional[date],
    normal_onset: date,
    today: date,
    forecast_agrees_with_climatology: bool,
    forecast_dry_spell: bool,
) -> Dict[str, Any]:
    """
    Determine onset status and confidence heuristic.

    Status: APPROACHING | IN_PROGRESS | DECLARED | DELAYED | NOT_YET

    Confidence heuristic (NOT calibrated, NOT validated):
      - Start at 50
      - +20 if NWP forecast agrees with climatology
      - +20 if detected onset is within ±7 days of normal
      - -15 if past normal date with no onset
      - -15 if forecast dry spell
      - Clamped to [30, 90]
    """
    confidence = 50
    basis: List[str] = []

    # ── Determine status ──
    if detected_onset is not None:
        status = "DECLARED"
        delta = (detected_onset - normal_onset).days
        if abs(delta) <= 7:
            confidence += 20
            basis.append(
                f"Detected onset ({detected_onset.isoformat()}) within ±7 days "
                f"of normal ({normal_onset.isoformat()}): +20"
            )
        else:
            basis.append(
                f"Detected onset ({detected_onset.isoformat()}) deviates "
                f"{delta:+d} days from normal: no bonus"
            )
    elif today > normal_onset + timedelta(days=14):
        status = "DELAYED"
        confidence -= 15
        basis.append(
            f"Past normal onset by {(today - normal_onset).days} days "
            f"with no onset detected: -15"
        )
    elif normal_onset - timedelta(days=7) <= today <= normal_onset + timedelta(days=7):
        status = "IN_PROGRESS"
        basis.append("Within ±7-day onset window")
    elif today >= normal_onset - timedelta(days=21):
        status = "APPROACHING"
        basis.append(
            f"Within 21 days of normal onset ({normal_onset.isoformat()})"
        )
    else:
        status = "NOT_YET"
        basis.append(
            f"Normal onset is {(normal_onset - today).days} days away"
        )

    # ── Forecast agreement ──
    if forecast_agrees_with_climatology:
        confidence += 20
        basis.append("NWP forecast agrees with climatological onset timing: +20")
    else:
        basis.append(
            "NWP forecast does not clearly agree with climatological timing: +0"
        )

    # ── Dry spell penalty ──
    if forecast_dry_spell:
        confidence -= 15
        basis.append("Forecast indicates dry spell in next 7 days: -15")

    confidence = max(30, min(90, confidence))

    return {
        "status": status,
        "confidence_pct": confidence,
        "confidence_label": (
            "HEURISTIC — NOT calibrated or validated against observations"
        ),
        "confidence_basis": basis,
    }


# ─────────────────────────────────────────────────────────────────────────────
# Open-Meteo Adapters
# ─────────────────────────────────────────────────────────────────────────────

_ARCHIVE_CACHE: Dict[str, List[Dict[str, Any]]] = {}

async def fetch_daily_rain(
    latitude: float,
    longitude: float,
    start_date: str,
    end_date: str,
    client: Optional[httpx.AsyncClient] = None,
) -> List[Dict[str, Any]]:
    """
    Fetch daily rainfall from Open-Meteo Archive API (ERA5 reanalysis).

    Returns list of {"date": str, "precipitation_sum": float}.
    """
    cache_key = f"{round(latitude, 4)}_{round(longitude, 4)}_{start_date}_{end_date}"
    if cache_key in _ARCHIVE_CACHE:
        return _ARCHIVE_CACHE[cache_key]

    url = "https://archive-api.open-meteo.com/v1/archive"
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "start_date": start_date,
        "end_date": end_date,
        "daily": "precipitation_sum",
        "timezone": "Asia/Kolkata",
    }

    import asyncio
    import re

    async def _do_fetch(c: httpx.AsyncClient):
        p = dict(params)
        resp = await c.get(url, params=p)
        if resp.status_code == 400 and "out of allowed range" in resp.text:
            m = re.findall(r"\d{4}-\d{2}-\d{2}", resp.text)
            if len(m) >= 2:
                p["end_date"] = m[-1]
                resp = await c.get(url, params=p)
        resp.raise_for_status()
        raw = resp.json()
        daily = raw.get("daily", {})
        dates = daily.get("time", [])
        precip = daily.get("precipitation_sum", [])
        return [
            {"date": d, "precipitation_sum": float(p or 0.0)}
            for d, p in zip(dates, precip)
        ]

    for attempt in range(2):
        try:
            if client is not None:
                result = await _do_fetch(client)
            else:
                async with httpx.AsyncClient(timeout=15.0) as local_client:
                    result = await _do_fetch(local_client)
            if result:
                _ARCHIVE_CACHE[cache_key] = result
            return result
        except Exception as e:
            if attempt == 0:
                await asyncio.sleep(0.5)
            else:
                print(f"[MonsoonService] Archive API error for {start_date} to {end_date}: {e}")
                return []
    return []


async def fetch_forecast_rain(
    latitude: float,
    longitude: float,
) -> Tuple[List[Dict[str, Any]], float]:
    """
    Fetch 7-day rainfall forecast from Open-Meteo Forecast API.

    Returns (daily_forecast_list, total_7d_rain_mm).
    """
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "daily": "precipitation_sum",
        "timezone": "Asia/Kolkata",
        "forecast_days": 7,
    }

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.get(url, params=params)
            resp.raise_for_status()
            raw = resp.json()

        daily = raw.get("daily", {})
        dates = daily.get("time", [])
        precip = daily.get("precipitation_sum", [])

        forecast = [
            {"date": d, "precipitation_sum": float(p or 0.0)}
            for d, p in zip(dates, precip)
        ]
        total = sum(f["precipitation_sum"] for f in forecast)
        return forecast, round(total, 1)

    except Exception as e:
        print(f"[MonsoonService] Forecast API error: {e}")
        return [], 0.0


# ─────────────────────────────────────────────────────────────────────────────
# Rolling 7-Day Rain (Dry Spell Index)
# ─────────────────────────────────────────────────────────────────────────────

def _rolling_7d_rain(daily_rain: List[Dict[str, Any]], today: date) -> float:
    """Sum rainfall for the 7-day window ending on `today`."""
    cutoff = today - timedelta(days=6)
    total = 0.0
    for d in daily_rain:
        dt = (date.fromisoformat(d["date"])
              if isinstance(d["date"], str) else d["date"])
        if cutoff <= dt <= today:
            total += float(d.get("precipitation_sum", 0.0) or 0.0)
    return round(total, 1)


# ─────────────────────────────────────────────────────────────────────────────
# Compute Outlook — main orchestrator
# ─────────────────────────────────────────────────────────────────────────────

async def compute_outlook(
    village: Dict[str, Any],
    daily_history: List[Dict[str, Any]],
    forecast_7d: List[Dict[str, Any]],
    forecast_7d_rain_mm: float,
    today: date,
) -> Dict[str, Any]:
    """
    Compute full monsoon onset & break outlook for a village.

    Returns a JSON-serializable dict with climatological onset, detected onset,
    status, phase, confidence, break risk, dry spell index, forecasts, and
    advisory strings.
    """
    block = village.get("block", village.get("district", "Khanna"))
    year = today.year

    normal_onset = _get_normal_onset(block, year)
    window_start = normal_onset - timedelta(days=7)
    window_end = normal_onset + timedelta(days=7)

    # ── Detect onset from historical daily rain ──
    detected = detect_onset(daily_history)

    # ── Forecast agreement heuristic ──
    # If we are within the onset window (±7 days) and forecast shows >= 20 mm
    # in the next 7 days, we consider the NWP to "agree" with climatology.
    forecast_agrees = (
        window_start <= today <= window_end + timedelta(days=7)
        and forecast_7d_rain_mm >= 20.0
    )

    # Dry spell heuristic: < 10 mm total forecast rain in 7 days
    forecast_dry = forecast_7d_rain_mm < 10.0

    # ── Status & confidence ──
    status_info = onset_status(
        detected_onset=detected,
        normal_onset=normal_onset,
        today=today,
        forecast_agrees_with_climatology=forecast_agrees,
        forecast_dry_spell=forecast_dry,
    )

    # ── Phase ──
    if detected:
        phase = "ACTIVE_MONSOON_BREAK_RISK" if forecast_dry else "ACTIVE_MONSOON"
    elif status_info["status"] == "DELAYED":
        phase = "DELAYED_ONSET"
    elif status_info["status"] in ("APPROACHING", "IN_PROGRESS"):
        phase = "PRE_ONSET"
    else:
        phase = "PRE_MONSOON"

    # ── Break risk ──
    break_risk = classify_break_risk(forecast_7d_rain_mm, phase)

    # ── Dry spell index (rolling 7-day actual rain) ──
    dry_spell_index = _rolling_7d_rain(daily_history, today)

    # ── Advisory strings (conditional language) ──
    if phase in ("PRE_MONSOON", "PRE_ONSET"):
        sowing = (
            "Hold sowing until cumulative rain reaches at least 40 mm over "
            "5 days. Monitor daily rainfall before committing seed."
        )
        irrigation = (
            f"Continue pre-monsoon irrigation as needed. Monsoon onset "
            f"expected around {normal_onset.strftime('%d %b')}."
        )
    elif phase == "DELAYED_ONSET":
        sowing = (
            "Monsoon onset is delayed beyond normal. Do NOT sow yet — "
            "risk of seed desiccation is high. Wait for sustained rainfall."
        )
        irrigation = (
            "Continue full irrigation. Conserve stored water. "
            "Onset delay may extend dry period."
        )
    elif phase == "ACTIVE_MONSOON_BREAK_RISK":
        sowing = (
            "Monsoon active but break risk detected. If already sown, "
            "ensure drainage. Delay transplanting until rain resumes."
        )
        irrigation = (
            f"Supplement with irrigation if available. Forecast shows "
            f"{forecast_7d_rain_mm:.0f} mm in next 7 days — possible break spell."
        )
    elif phase == "ACTIVE_MONSOON":
        sowing = (
            "Onset declared. Soil moisture building. Safe to begin sowing "
            "if field conditions permit."
        )
        irrigation = (
            "Reduce irrigation — monsoon rainfall is supplementing soil "
            "moisture. Monitor waterlogging risk."
        )
    else:
        sowing = (
            "Conditions uncertain. Monitor daily rainfall before "
            "committing to sowing."
        )
        irrigation = (
            "Maintain current irrigation schedule. Adjust based on "
            "observed daily rainfall."
        )

    return {
        "village_id": village.get("id", "unknown"),
        "village_name": village.get("name", "Unknown"),
        "block": block,
        "today": today.isoformat(),
        "climatological_onset": {
            "date": normal_onset.isoformat(),
            "provenance": ONSET_NORMAL_PROVENANCE,
        },
        "onset_window": {
            "start": window_start.isoformat(),
            "end": window_end.isoformat(),
            "label": (
                f"{window_start.strftime('%d %b')} – "
                f"{window_end.strftime('%d %b')} ({year})"
            ),
        },
        "detected_onset": detected.isoformat() if detected else None,
        "onset_status": status_info["status"],
        "phase": phase,
        "confidence_pct": status_info["confidence_pct"],
        "confidence_label": status_info["confidence_label"],
        "confidence_basis": status_info["confidence_basis"],
        "break_risk_7d": break_risk,
        "dry_spell_index_7d_mm": dry_spell_index,
        "forecast_7d_rain_mm": forecast_7d_rain_mm,
        "forecast_7d": forecast_7d,
        "advisory": {
            "sowing": sowing,
            "irrigation": irrigation,
        },
        "methodology_notes": [
            "Onset detection: 5-day cumulative >= 40 mm with >= 2 wet days "
            "(>= 2.5 mm each), adapted from Pai et al. (2014)",
            "Climatological normals are APPROXIMATE, interpolated from IMD "
            "isochrone maps",
            "Confidence score is a HEURISTIC, NOT calibrated against "
            "validation data",
            "Rainfall data: Open-Meteo Archive API (ERA5 reanalysis) and "
            "Forecast API (NWP ensemble)",
            "This is a prototype for SIH26086 — results have NOT been "
            "validated against ground truth",
        ],
    }


# ─────────────────────────────────────────────────────────────────────────────
# Backtest
# ─────────────────────────────────────────────────────────────────────────────

async def backtest_onset(
    latitude: float,
    longitude: float,
    block: str,
    years: List[int],
) -> Dict[str, Any]:
    """
    Backtest onset detection for multiple years.

    For each year, fetches Jun–Aug rainfall from Open-Meteo Archive API,
    runs detect_onset, and compares to climatological normal.

    Returns error_days per year. No accuracy numbers are fabricated.
    """
    results: List[Dict[str, Any]] = []

    async with httpx.AsyncClient(timeout=15.0) as client:
        for year in years:
            normal = _get_normal_onset(block, year)
            start = f"{year}-06-01"
            end = f"{year}-08-31"

            daily = await fetch_daily_rain(latitude, longitude, start, end, client=client)
            detected = detect_onset(daily)

            total_rain = sum(
                float(d.get("precipitation_sum", 0.0) or 0.0) for d in daily
            )

            if detected is not None:
                error_days = (detected - normal).days
                interpretation = (
                    f"Detected onset was {abs(error_days)} day(s) "
                    f"{'late' if error_days > 0 else 'early'} "
                    f"vs. climatological normal"
                )
            else:
                error_days = None
                interpretation = (
                    "Onset NOT detected — criteria not met in Jun–Aug window"
                )

            results.append({
                "year": year,
                "climatological_normal": normal.isoformat(),
                "detected_onset": detected.isoformat() if detected else None,
                "error_days": error_days,
                "error_interpretation": interpretation,
                "jun_aug_total_rain_mm": round(total_rain, 1),
                "data_source": "Open-Meteo Archive API (ERA5 reanalysis)",
            })

    return {
        "block": block,
        "latitude": latitude,
        "longitude": longitude,
        "climatological_normal_provenance": ONSET_NORMAL_PROVENANCE,
        "onset_criteria": (
            "5-day cumulative >= 40 mm with >= 2 wet days (>= 2.5 mm each)"
        ),
        "backtest_results": results,
        "disclaimer": (
            "This backtest uses ERA5 reanalysis data from Open-Meteo, "
            "NOT IMD station observations. Error values reflect "
            "model-vs-climatology comparison, NOT validated forecast skill. "
            "No accuracy claims are made."
        ),
    }
