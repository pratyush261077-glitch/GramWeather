"""
Forecast Service
Fetches and structures daily and hourly forecasts from Open-Meteo.
"""

from typing import Dict, Any, List
from backend.external_sources.weather_api import OpenMeteoAdapter
from backend.database.database import get_village_by_id

class ForecastService:
    @staticmethod
    async def get_village_forecast(village_id: str) -> Dict[str, Any]:
        village = get_village_by_id(village_id)
        if not village:
            raise ValueError(f"Village {village_id} not found")

        raw_forecast = await OpenMeteoAdapter.fetch_forecast(
            village["latitude"],
            village["longitude"]
        )

        daily = raw_forecast.get("daily", {})
        hourly = raw_forecast.get("hourly", {})

        # Process 7-day daily forecast
        daily_items = []
        if "time" in daily:
            for i in range(len(daily["time"])):
                daily_items.append({
                    "date": daily["time"][i],
                    "temp_max": daily["temperature_2m_max"][i] if "temperature_2m_max" in daily else 32.0,
                    "temp_min": daily["temperature_2m_min"][i] if "temperature_2m_min" in daily else 22.0,
                    "precipitation_sum": daily["precipitation_sum"][i] if "precipitation_sum" in daily else 0.0,
                    "precipitation_probability_max": daily["precipitation_probability_max"][i] if "precipitation_probability_max" in daily else 20.0,
                    "weather_code": daily["weather_code"][i] if "weather_code" in daily else 1
                })

        # Process next 24 hours
        hourly_items = []
        if "time" in hourly:
            # take next 24 hours
            limit = min(24, len(hourly["time"]))
            for i in range(limit):
                hourly_items.append({
                    "time": hourly["time"][i],
                    "temperature": hourly["temperature_2m"][i] if "temperature_2m" in hourly else 28.0,
                    "rain_probability": hourly["precipitation_probability"][i] if "precipitation_probability" in hourly else 10.0,
                    "cloud_cover": hourly["cloud_cover"][i] if "cloud_cover" in hourly else 30.0
                })

        return {
            "village_id": village_id,
            "daily": daily_items,
            "hourly": hourly_items,
            "source": "Open-Meteo NWP Multi-Model Ensemble",
            "is_simulated": False
        }
