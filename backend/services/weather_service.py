"""
Weather Service
Primary orchestration service integrating external Open-Meteo, sensor fleet,
fusion agent, and prediction agent.
"""

from typing import Dict, Any
from datetime import datetime
from backend.database.database import get_village_by_id
from backend.external_sources.weather_api import OpenMeteoAdapter
from backend.services.sensor_service import SensorService
from backend.services.observation_service import ObservationService
from backend.agents.fusion_agent import FusionAgent
from backend.agents.prediction_agent import PredictionAgent

class WeatherService:
    @staticmethod
    async def get_current_village_weather(village_id: str, scenario: str = "normal") -> Dict[str, Any]:
        village = get_village_by_id(village_id)
        if not village:
            raise ValueError(f"Village '{village_id}' not found in database catalog.")

        # 1. Fetch live weather from Open-Meteo using village lat/lon
        raw_external = await OpenMeteoAdapter.fetch_current_weather(
            village["latitude"],
            village["longitude"]
        )

        # 2. Get local micro-sensor data
        sensors = SensorService.get_sensors_for_village(village_id, scenario=scenario)

        # 3. Get recent verified observations
        recent_obs = ObservationService.get_village_observations(village_id, limit=5)
        verified_obs = [o for o in recent_obs if o.get("status") == "VERIFIED"]

        # 4. Fuse weather state
        fused = FusionAgent.fuse_weather_state(raw_external, sensors, verified_obs)

        # 5. Calculate 8-direction weather
        direction_weather = PredictionAgent.calculate_8_direction_weather(
            base_rain_prob=fused.get("rain_probability", 20.0),
            wind_direction_deg=fused.get("wind_direction", 90.0),
            wind_speed_kmh=fused.get("wind_speed", 12.0),
            cloud_cover_pct=fused.get("cloud_cover", 40.0)
        )

        # 6. Calculate cloud movement vector
        cloud_movement = PredictionAgent.calculate_cloud_movement(
            wind_direction_cardinal=fused.get("wind_direction_cardinal", "NW"),
            wind_speed_kmh=fused.get("wind_speed", 12.0),
            cloud_cover_pct=fused.get("cloud_cover", 40.0)
        )

        # 7. Village confidence score
        sensors_online = sum(1 for s in sensors if s.get("health_status") == "ONLINE")
        confidence_score = 85.0 if sensors_online > 0 else 72.0
        if verified_obs:
            confidence_score = min(96.0, confidence_score + 10.0)

        # 8. SIH26086: Monsoon Onset & Break Risk Outlook
        # Sample forecast daily array for onset analysis
        sample_forecast_days = [
            {"precipitation_sum": fused.get("precipitation", 0.0), "precipitation_probability_max": fused.get("rain_probability", 20.0)},
            {"precipitation_sum": 3.2 if fused.get("rain_probability", 20.0) > 50 else 0.0, "precipitation_probability_max": 65.0 if fused.get("rain_probability", 20.0) > 50 else 20.0},
            {"precipitation_sum": 4.8 if fused.get("rain_probability", 20.0) > 50 else 0.0, "precipitation_probability_max": 75.0 if fused.get("rain_probability", 20.0) > 50 else 15.0}
        ]
        monsoon_outlook = PredictionAgent.calculate_monsoon_onset_and_break(
            village_id=village_id,
            current_weather=fused,
            forecast_daily=sample_forecast_days
        )

        # 9. Closed-Loop Learning & Verification Record
        learning_loop = PredictionAgent.get_learning_loop_data(village_id)

        return {
            "village": village,
            "current": fused,
            "raw_external": raw_external,
            "direction_weather": direction_weather,
            "cloud_movement": cloud_movement,
            "monsoon_outlook": monsoon_outlook,
            "learning_loop": learning_loop,
            "sensors": sensors,
            "sensors_online_count": sensors_online,
            "confidence_score": round(confidence_score, 1),
            "verification_status": "VERIFIED" if confidence_score >= 75 else "MODERATE",
            "last_updated": datetime.utcnow().isoformat()
        }
