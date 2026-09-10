"""
Alert Agent
Monitors critical meteorological thresholds and generates actionable farmer alerts.
"""

from typing import Dict, Any, List
from datetime import datetime
import uuid

class AlertAgent:
    @staticmethod
    def evaluate_weather_alerts(village_id: str, weather: Dict[str, Any]) -> List[Dict[str, Any]]:
        alerts = []
        temp = weather.get("temperature", 25.0)
        wind = weather.get("wind_speed", 10.0)
        rain_prob = weather.get("rain_probability", 0.0)
        precip = weather.get("precipitation", 0.0)
        weather_code = weather.get("weather_code", 0)

        # 1. Heavy rain / storm alert
        if precip > 15.0 or rain_prob >= 80.0 or weather_code in [65, 82, 95, 96, 99]:
            alerts.append({
                "id": f"ALT_RAIN_{uuid.uuid4().hex[:6]}",
                "village_id": village_id,
                "severity": "CRITICAL" if (precip > 25.0 or weather_code in [95, 96, 99]) else "WARNING",
                "title": "Severe Rain & Waterlogging Advisory",
                "message": f"Heavy rainfall alert ({rain_prob:.0f}% likelihood). Expected precipitation: {max(precip, 12.0):.1f} mm.",
                "action_required": "Halt field irrigation, clear farm drainage outlets, and secure harvested grain under waterproof tarpaulins.",
                "parameter_trigger": f"Rain Prob {rain_prob}% / Precip {precip} mm",
                "timestamp": datetime.utcnow().isoformat(),
                "is_active": True
            })

        # 2. Strong wind / squall alert
        if wind > 30.0:
            alerts.append({
                "id": f"ALT_WIND_{uuid.uuid4().hex[:6]}",
                "village_id": village_id,
                "severity": "WARNING",
                "title": "Strong Wind Gust Warning",
                "message": f"Sustained wind speeds reaching {wind:.1f} km/h detected in the village periphery.",
                "action_required": "Provide mechanical staking for tall crops (sugarcane, banana, maize). Halt elevated chemical spraying.",
                "parameter_trigger": f"Wind {wind:.1f} km/h",
                "timestamp": datetime.utcnow().isoformat(),
                "is_active": True
            })

        # 3. High heat stress alert
        if temp >= 40.0:
            alerts.append({
                "id": f"ALT_HEAT_{uuid.uuid4().hex[:6]}",
                "village_id": village_id,
                "severity": "WARNING",
                "title": "Extreme Heat Stress Alert",
                "message": f"Daytime ambient temperature approaching {temp:.1f}°C, elevating crop evapotranspiration.",
                "action_required": "Inspect standing crops for wilting. Ensure adequate livestock hydration and shelter.",
                "parameter_trigger": f"Temperature {temp:.1f}°C",
                "timestamp": datetime.utcnow().isoformat(),
                "is_active": True
            })

        # If conditions are pleasant/calm, provide an informational status
        if not alerts:
            alerts.append({
                "id": f"ALT_INFO_{uuid.uuid4().hex[:6]}",
                "village_id": village_id,
                "severity": "INFO",
                "title": "Favorable Village Weather",
                "message": "Atmospheric conditions are stable. No severe meteorological warnings for the village.",
                "action_required": "Optimal window for routine agricultural maintenance and field preparation.",
                "parameter_trigger": "Normal weather parameters",
                "timestamp": datetime.utcnow().isoformat(),
                "is_active": True
            })

        return alerts
