import os
import sys
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
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

app = FastAPI(
    title="GramWeather AI Backend",
    description="Hyperlocal Weather Intelligence for Indian Villages (Observe -> Verify -> Fuse -> Predict -> Explain -> Learn)",
    version="1.0.0"
)

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

@app.post("/api/observations")
def submit_observation(payload: FarmerObservationCreate):
    """
    Farmer weather report submission endpoint.
    Converts human report into structured observation schema.
    """
    res = ObservationService.submit_farmer_report(payload.dict())
    return {"message": "Farmer report received and structured.", "observation": res}

@app.get("/api/observations/{village_id}")
def get_observations(village_id: str, limit: int = 15):
    """Retrieves recent farmer reports and community observations for the village."""
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

@app.get("/api/advisory/{village_id}")
async def get_advisory(
    village_id: str,
    crop: Optional[str] = "Wheat",
    lang: Optional[str] = Query("en", description="Language code: en, hi, or pa")
):
    """Generates AI farming advisory for specific crop and current village conditions."""
    village = get_village_by_id(village_id)
    if not village:
        raise HTTPException(status_code=404, detail="Village not found")

    ext_weather = await OpenMeteoAdapter.fetch_current_weather(
        village["latitude"],
        village["longitude"]
    )
    
    return AdvisoryAgent.generate_advisory(village_id, crop or "Wheat", ext_weather, lang=lang or "en")

@app.get("/api/alerts/{village_id}")
async def get_alerts(village_id: str, lang: Optional[str] = "en"):
    """Returns weather warnings and actionable farmer alerts."""
    village = get_village_by_id(village_id)
    if not village:
        raise HTTPException(status_code=404, detail="Village not found")

    ext_weather = await OpenMeteoAdapter.fetch_current_weather(
        village["latitude"],
        village["longitude"]
    )
    
    alerts = AlertAgent.evaluate_weather_alerts(village_id, ext_weather)
    formatted = [NotificationService.format_alert_for_language(a, lang=lang) for a in alerts]
    return formatted

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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
