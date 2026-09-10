"""
Fusion Agent
Combines verified observations, physical telemetry, and external forecasts
into a unified village weather state.
"""

from typing import Dict, Any, List
from datetime import datetime

class FusionAgent:
    @staticmethod
    def fuse_weather_state(
        external_weather: Dict[str, Any],
        sensors: List[Dict[str, Any]],
        recent_verified_observations: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        fused = dict(external_weather)
        
        # Sensor influence
        valid_sensors = [s for s in sensors if s.get("health_status") == "ONLINE"]
        if valid_sensors:
            sensor_temp = sum(s["temperature"] for s in valid_sensors) / len(valid_sensors)
            sensor_hum = sum(s["humidity"] for s in valid_sensors) / len(valid_sensors)
            # Weighted average: 60% external forecast, 40% real-time local sensor
            fused["temperature"] = round(0.6 * external_weather["temperature"] + 0.4 * sensor_temp, 1)
            fused["relative_humidity"] = round(0.6 * external_weather["relative_humidity"] + 0.4 * sensor_hum, 1)
            
            if any(s.get("rain_detected") for s in valid_sensors):
                fused["rain_probability"] = max(fused.get("rain_probability", 0.0), 85.0)
                fused["weather_condition"] = "Rain / Showers"

        # Verified human observation influence
        rain_obs = [obs for obs in recent_verified_observations if "rain" in obs.get("event", "").lower() and obs.get("status") == "VERIFIED"]
        if rain_obs:
            fused["rain_probability"] = max(fused.get("rain_probability", 0.0), 90.0)
            fused["weather_condition"] = f"Verified {rain_obs[0].get('event')}"
            
        fused["data_fusion_sources"] = [
            {"source": "Open-Meteo NWP", "weight": 0.50, "status": "LIVE"},
            {"source": "ESP32 Sensor Fleet", "weight": 0.30, "status": "SIMULATED_DEMO"},
            {"source": "Verified Community Reports", "weight": 0.20, "status": "ACTIVE"}
        ]
        fused["fusion_timestamp"] = datetime.utcnow().isoformat()
        return fused
