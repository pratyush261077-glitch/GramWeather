import os
import sys
from fastapi import FastAPI, HTTPException, Query, Request, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uuid
from typing import Optional, List, Dict, Any

# Ensure backend directory is in sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.database.database import (
    init_db,
    load_villages,
    get_village_by_id,
    save_verification_result
)
from backend.database.schemas import (
    FarmerObservationCreate,
    VerificationResult
)
from backend.services.weather_service import WeatherService
from backend.services.forecast_service import ForecastService
from backend.services.observation_service import ObservationService
from backend.services.sensor_service import SensorService
from backend.services.notification_service import NotificationService
from backend.agents.verification_agent import VerificationAgent
from backend.agents.advisory_agent import AdvisoryAgent
from backend.agents.alert_agent import AlertAgent
from backend.agents.prediction_agent import PredictionAgent
from backend.external_sources.weather_api import OpenMeteoAdapter
from backend.external_sources.satellite_service import SatelliteServiceAdapter
from backend.data.mock_data import (
    get_simulated_sensors_for_village,
    get_simulated_community_reports
)
from datetime import date, timedelta
from backend.services.monsoon_service import (
    compute_outlook as compute_monsoon_outlook,
    backtest_onset as backtest_monsoon_onset,
    fetch_daily_rain,
    fetch_forecast_rain
)

app = FastAPI(
    title="GramWeather AI Backend",
    description="Hyperlocal Weather Intelligence for Indian Villages (Observe -> Verify -> Fuse -> Predict -> Explain -> Learn)",
    version="1.0.0"
)

# Upload directory configuration & static file mounting
UPLOAD_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "uploads")
OBSERVATIONS_UPLOAD_DIR = os.path.join(UPLOAD_DIR, "observations")
os.makedirs(OBSERVATIONS_UPLOAD_DIR, exist_ok=True)

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

ALLOWED_IMAGE_EXTS = {"jpg", "jpeg", "png", "webp"}
MAX_IMAGE_SIZE = 5 * 1024 * 1024  # 5MB

ALLOWED_AUDIO_EXTS = {"webm", "mp3", "m4a", "wav", "ogg"}
MAX_AUDIO_SIZE = 8 * 1024 * 1024  # 8MB

async def save_uploaded_media(upload_file: UploadFile, allowed_exts: set, max_size: int, media_type: str) -> str:
    filename = upload_file.filename or ""
    ext = os.path.splitext(filename)[1].lower().lstrip(".")
    if not ext and upload_file.content_type:
        ct_map = {
            "image/jpeg": "jpg",
            "image/jpg": "jpg",
            "image/png": "png",
            "image/webp": "webp",
            "audio/webm": "webm",
            "audio/mpeg": "mp3",
            "audio/mp3": "mp3",
            "audio/m4a": "m4a",
            "audio/mp4": "m4a",
            "audio/x-m4a": "m4a",
            "audio/wav": "wav",
            "audio/ogg": "ogg",
        }
        ext = ct_map.get(upload_file.content_type.split(";")[0].strip().lower(), "")
    
    if ext not in allowed_exts:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid {media_type} format '.{ext}'. Allowed formats: {', '.join(sorted(allowed_exts))}"
        )
        
    contents = await upload_file.read()
    if len(contents) > max_size:
        max_mb = max_size // (1024 * 1024)
        raise HTTPException(
            status_code=400,
            detail=f"{media_type.capitalize()} exceeds maximum allowed size of {max_mb}MB"
        )
        
    unique_filename = f"{uuid.uuid4().hex}.{ext}"
    save_path = os.path.join(OBSERVATIONS_UPLOAD_DIR, unique_filename)
    with open(save_path, "wb") as f:
        f.write(contents)
        
    return f"/uploads/observations/{unique_filename}"

# Enable CORS for React frontend (Vite default is 5173)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    init_db()
    print("[GramWeather AI] Database and backend services initialized.")

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "GramWeather AI Backend",
        "mode": "Observe-Verify-Fuse-Predict-Explain-Learn"
    }

@app.get("/api/villages")
def get_villages():
    """Returns curated Indian agricultural villages."""
    return load_villages()

@app.get("/api/weather/{village_id}")
async def get_village_weather(
    village_id: str,
    scenario: Optional[str] = Query("normal", description="'normal', 'agreement_rain', or 'conflict_dry'")
):
    """
    Main village weather intelligence endpoint.
    Fuses live Open-Meteo external data with local sensor fleet and verified observations.
    """
    try:
        data = await WeatherService.get_current_village_weather(village_id, scenario=scenario)
        return data
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal weather service error: {str(e)}")

@app.get("/api/forecast/{village_id}")
async def get_village_forecast(village_id: str):
    """Fetches 7-day daily and 24-hour hourly forecast from Open-Meteo."""
    try:
        return await ForecastService.get_village_forecast(village_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/observations")
@app.post("/api/observations")
async def submit_observation(request: Request):
    """
    Farmer weather report submission endpoint.
    Accepts multipart/form-data (fields: event, intensity, description, language, lat, lon
    plus optional files: image [max 5MB] and audio [max 8MB]) or application/json for text-only reports.
    """
    content_type = request.headers.get("content-type", "")
    
    if "multipart/form-data" in content_type:
        form = await request.form()
        
        event = form.get("event") or "Cloudy"
        intensity = form.get("intensity") or "Moderate"
        description = form.get("description") or ""
        language = form.get("language") or "en"
        lat = form.get("lat") or form.get("latitude")
        lon = form.get("lon") or form.get("longitude")
        village_id = form.get("village_id") or "khanna"
        reporter_name = form.get("reporter_name") or "Local Farmer"
        time_description = form.get("time_description") or "Just now"
        
        image_file = form.get("image")
        audio_file = form.get("audio")
        
        image_url = None
        if image_file and hasattr(image_file, "filename") and image_file.filename:
            image_url = await save_uploaded_media(
                image_file,
                ALLOWED_IMAGE_EXTS,
                MAX_IMAGE_SIZE,
                "image"
            )
            
        audio_url = None
        if audio_file and hasattr(audio_file, "filename") and audio_file.filename:
            audio_url = await save_uploaded_media(
                audio_file,
                ALLOWED_AUDIO_EXTS,
                MAX_AUDIO_SIZE,
                "audio"
            )
            
        payload_dict = {
            "event": str(event),
            "intensity": str(intensity),
            "description": str(description),
            "language": str(language),
            "lat": float(lat) if lat not in (None, "") else None,
            "lon": float(lon) if lon not in (None, "") else None,
            "latitude": float(lat) if lat not in (None, "") else None,
            "longitude": float(lon) if lon not in (None, "") else None,
            "village_id": str(village_id),
            "reporter_name": str(reporter_name),
            "time_description": str(time_description),
            "image_url": image_url,
            "audio_url": audio_url,
        }
    else:
        # JSON body
        try:
            payload_dict = await request.json()
        except Exception:
            payload_dict = {}

    res = ObservationService.submit_farmer_report(payload_dict)
    
    # Merge structured observation fields with response envelope for both top-level and nested access
    response_data = dict(res)
    response_data["message"] = "Farmer report received and structured."
    response_data["observation"] = res
    return response_data

@app.get("/observations/{village_id}")
@app.get("/api/observations/{village_id}")
def get_observations(village_id: str, limit: int = 15):
    """Retrieves recent farmer reports and community observations for the village including media URLs."""
    return ObservationService.get_village_observations(village_id, limit=limit)

@app.post("/api/verify")
async def verify_observation_endpoint(
    observation: Dict[str, Any],
    scenario: Optional[str] = Query("normal", description="Optional demo scenario force: 'agreement_rain' or 'conflict_dry'")
):
    """
    Core Verification Engine Endpoint.
    Cross-checks farmer observation against sensor telemetry, community reports, and Open-Meteo NWP.
    """
    village_id = observation.get("village_id", "khanna")
    village = get_village_by_id(village_id)
    if not village:
        raise HTTPException(status_code=404, detail="Village not found")

    # Fetch live Open-Meteo weather
    ext_weather = await OpenMeteoAdapter.fetch_current_weather(
        village["latitude"],
        village["longitude"]
    )
    
    # If a specific demo scenario is forced, modify external weather to match demo expectations
    if scenario == "agreement_rain":
        ext_weather["rain_probability"] = 82.0
        ext_weather["precipitation"] = 4.5
        ext_weather["weather_condition"] = "Rain Showers"
    elif scenario == "conflict_dry":
        ext_weather["rain_probability"] = 5.0
        ext_weather["precipitation"] = 0.0
        ext_weather["weather_condition"] = "Mainly Clear"

    sensors = SensorService.get_sensors_for_village(village_id, scenario=scenario)
    community = get_simulated_community_reports(village_id, scenario=scenario)

    result = VerificationAgent.verify_observation(
        observation=observation,
        sensors=sensors,
        community_reports=community,
        external_weather=ext_weather
    )
    
    # Update observation status in database
    if "id" in observation:
        ObservationService.update_status(
            observation["id"],
            result["status"],
            result["confidence_score"]
        )
    save_verification_result(result)
    
    return result

@app.get("/api/confidence/{village_id}")
async def get_village_confidence(village_id: str):
    """Returns the multi-source confidence metrics for a village."""
    village = get_village_by_id(village_id)
    if not village:
        raise HTTPException(status_code=404, detail="Village not found")
        
    sensors = SensorService.get_sensors_for_village(village_id)
    obs = ObservationService.get_village_observations(village_id)
    verified_obs = [o for o in obs if o.get("status") == "VERIFIED"]
    
    score = 80.0
    if len(sensors) > 0:
        score += 8.0
    if len(verified_obs) > 0:
        score += 8.0
    score = min(98.0, score)

    return {
        "village_id": village_id,
        "overall_confidence": score,
        "verification_status": "VERIFIED" if score >= 75 else "UNVERIFIED",
        "active_sources_count": 3,
        "sensors_online": len(sensors),
        "community_reports_count": len(obs),
        "primary_weather_source": "Open-Meteo (Live) + ESP32 Fleet (Simulated)",
        "last_updated": "Just now"
    }

@app.get("/advisory/{village_id}")
@app.get("/api/advisory/{village_id}")
async def get_advisory(
    village_id: str,
    crop: Optional[str] = "Wheat",
    lang: Optional[str] = Query("en", description="Language code: en, hi, or pa")
):
    """
    Generates ICAR rule-based agricultural advisory for specific crop (Wheat, Paddy, Maize)
    using live Open-Meteo telemetry (7-day rain sum, wind speed, 24h & 48h precipitation).
    """
    village = _resolve_village(village_id)
    telemetry = await OpenMeteoAdapter.fetch_advisory_telemetry(
        float(village.get("latitude", 30.70)),
        float(village.get("longitude", 76.22))
    )
    return AdvisoryAgent.generate_advisory(
        village_id=village_id,
        crop=crop or "Wheat",
        telemetry=telemetry,
        lang=lang or "en"
    )

@app.get("/alerts/{village_id}")
@app.get("/api/alerts/{village_id}")
async def get_alerts(village_id: str, lang: Optional[str] = "en"):
    """
    Threshold Event Engine for severe weather warnings:
    - HEAVY RAIN: forecast rain >= 64.5 mm in 24h -> "Avoid irrigation, protect harvested produce."
    - STRONG WIND: wind >= 40 km/h -> "Secure vulnerable crops and structures."
    - HEAT: max temperature >= 42 C -> "High temperature, check crop water needs."
    - BREAK RISK: monsoon break risk is HIGH -> "Monsoon break likely, plan irrigation backup."
    """
    village = _resolve_village(village_id)
    telemetry = await OpenMeteoAdapter.fetch_advisory_telemetry(
        float(village.get("latitude", 30.70)),
        float(village.get("longitude", 76.22))
    )
    alerts = AlertAgent.evaluate_weather_alerts(village_id, telemetry)
    formatted = [NotificationService.format_alert_for_language(a, lang=lang or "en") for a in alerts]
    return formatted

@app.post("/alerts/{village_id}/inject")
@app.post("/api/alerts/{village_id}/inject")
async def inject_demo_alert(village_id: str, alert_type: Optional[str] = "HEAVY RAIN"):
    """Injects a synthetic Heavy Rain or Break Risk event for judges to preview live alert triggers."""
    return AlertAgent.inject_demo_alert(village_id, alert_type=alert_type or "HEAVY RAIN")

@app.post("/alerts/{village_id}/clear")
@app.post("/api/alerts/{village_id}/clear")
@app.delete("/alerts/{village_id}/clear")
@app.delete("/api/alerts/{village_id}/clear")
async def clear_demo_alerts(village_id: str):
    """Clears injected synthetic demo alerts for the village."""
    AlertAgent.clear_demo_alerts(village_id)
    return {"status": "cleared", "village_id": village_id}

@app.get("/api/direction-weather/{village_id}")
async def get_direction_weather(village_id: str):
    """Calculates 8-direction weather conditions."""
    village = get_village_by_id(village_id)
    if not village:
        raise HTTPException(status_code=404, detail="Village not found")

    ext = await OpenMeteoAdapter.fetch_current_weather(
        village["latitude"],
        village["longitude"]
    )
    
    directions = PredictionAgent.calculate_8_direction_weather(
        base_rain_prob=ext.get("rain_probability", 20.0),
        wind_direction_deg=ext.get("wind_direction", 90.0),
        wind_speed_kmh=ext.get("wind_speed", 12.0),
        cloud_cover_pct=ext.get("cloud_cover", 40.0)
    )
    return {
        "village_id": village_id,
        "directions": directions,
        "source_attribution": "Spatial Model Interpolation (Attributed to Open-Meteo NWP)"
    }

@app.get("/api/monsoon-outlook/{village_id}")
async def get_monsoon_outlook(village_id: str):
    """
    SIH26086: Hyperlocal Monsoon Onset & Break Prediction System.
    Evaluates multi-day onset window and break spell risk using IMD / Pai et al. (2014) criteria.
    """
    village = get_village_by_id(village_id)
    if not village:
        raise HTTPException(status_code=404, detail="Village not found")

    ext = await OpenMeteoAdapter.fetch_current_weather(
        village["latitude"],
        village["longitude"]
    )
    
    sample_forecast_days = [
        {"precipitation_sum": ext.get("precipitation", 0.0), "precipitation_probability_max": ext.get("rain_probability", 20.0)},
        {"precipitation_sum": 3.5, "precipitation_probability_max": 65.0},
        {"precipitation_sum": 4.2, "precipitation_probability_max": 75.0}
    ]

    return PredictionAgent.calculate_monsoon_onset_and_break(
        village_id=village_id,
        current_weather=ext,
        forecast_daily=sample_forecast_days
    )

@app.get("/api/learning-loop/{village_id}")
async def get_learning_loop(village_id: str):
    """
    Closed-Loop Verification & Learning Record (Predict → Listen → Compare → Verify → Correct → Explain → Learn)
    """
    village = get_village_by_id(village_id)
    if not village:
        raise HTTPException(status_code=404, detail="Village not found")

    return PredictionAgent.get_learning_loop_data(village_id)

@app.get("/api/history/{village_id}")
async def get_history(village_id: str):
    """Provides historical trend and CHIRPS benchmark data."""
    village = get_village_by_id(village_id)
    if not village:
        raise HTTPException(status_code=404, detail="Village not found")

    # Sample calibrated 7-day historical trend
    trend = [
        {"date": "Day -6", "temp_max": 33.2, "temp_min": 24.1, "rainfall_mm": 0.0, "rain_prob": 10.0},
        {"date": "Day -5", "temp_max": 34.0, "temp_min": 24.8, "rainfall_mm": 0.0, "rain_prob": 15.0},
        {"date": "Day -4", "temp_max": 32.5, "temp_min": 23.9, "rainfall_mm": 1.2, "rain_prob": 40.0},
        {"date": "Day -3", "temp_max": 30.1, "temp_min": 22.5, "rainfall_mm": 8.5, "rain_prob": 80.0},
        {"date": "Day -2", "temp_max": 31.0, "temp_min": 23.0, "rainfall_mm": 3.0, "rain_prob": 55.0},
        {"date": "Day -1", "temp_max": 32.2, "temp_min": 23.5, "rainfall_mm": 0.0, "rain_prob": 20.0},
        {"date": "Today", "temp_max": 33.0, "temp_min": 24.0, "rainfall_mm": 0.0, "rain_prob": 25.0}
    ]
    chirps = SatelliteServiceAdapter.get_seasonal_rainfall_baseline(village_id, month=9)

    return {
        "village_id": village_id,
        "recent_trend": trend,
        "chirps_baseline": chirps
    }

def _resolve_village(village_id: str) -> Dict[str, Any]:
    """Resolve village dictionary by ID, name, or block, falling back to Khanna."""
    v = get_village_by_id(village_id)
    if v:
        return v
    for item in load_villages():
        if item.get("name", "").lower() == village_id.lower() or item.get("block", "").lower() == village_id.lower():
            return item
    # Fallback to Khanna default: lat 30.70, lon 76.22
    return {
        "id": village_id.lower(),
        "name": village_id.title(),
        "block": village_id.title(),
        "district": "Ludhiana",
        "state": "Punjab",
        "latitude": 30.70,
        "longitude": 76.22,
    }

@app.get("/monsoon/{village}")
@app.get("/api/monsoon/{village}")
async def get_monsoon(village: str):
    """
    Monsoon Onset & Break Prediction Outlook for a village or block.
    Adapts IMD / Pai et al. (2014) criteria using Open-Meteo ERA5 reanalysis and NWP forecast.
    """
    v = _resolve_village(village)
    lat = float(v.get("latitude", 30.70))
    lon = float(v.get("longitude", 76.22))
    today = date.today()
    archive_end = (today - timedelta(days=1)).isoformat()
    start_date = f"{today.year}-06-01"
    daily_history = await fetch_daily_rain(lat, lon, start_date, archive_end)
    forecast_7d, forecast_sum = await fetch_forecast_rain(lat, lon)
    return await compute_monsoon_outlook(v, daily_history, forecast_7d, forecast_sum, today)

@app.get("/monsoon/{village}/backtest")
@app.get("/api/monsoon/{village}/backtest")
async def get_monsoon_backtest(village: str):
    """
    Backtest onset detection for 2023, 2024, 2025, 2026.
    Compares detected onset dates with climatological normal.
    """
    v = _resolve_village(village)
    lat = float(v.get("latitude", 30.70))
    lon = float(v.get("longitude", 76.22))
    block = v.get("block", v.get("district", "Khanna"))
    return await backtest_monsoon_onset(lat, lon, block, [2023, 2024, 2025, 2026])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
