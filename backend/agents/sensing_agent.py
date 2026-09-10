"""
Sensing Agent
Handles sensor fleet ingestion, quality control checks, outlier filtering, and sensor health.
"""

from typing import Dict, Any, List
from datetime import datetime

class SensingAgent:
    @staticmethod
    def validate_reading(reading: Dict[str, Any]) -> Dict[str, Any]:
        temp = reading.get("temperature", 0.0)
        humidity = reading.get("humidity", 0.0)
        rainfall = reading.get("rainfall_mm", 0.0)
        
        flags = []
        is_valid = True
        
        # Physical plausibility limits for rural India
        if temp < -5.0 or temp > 55.0:
            flags.append("Abnormal temperature threshold breached")
            is_valid = False
            
        if humidity < 0.0 or humidity > 100.0:
            flags.append("Humidity out of bound 0-100%")
            is_valid = False
            
        if rainfall < 0.0 or rainfall > 250.0:
            flags.append("Rainfall out of physical cloudburst threshold")
            is_valid = False

        status = "ONLINE" if is_valid else "DEGRADED"
        
        return {
            "is_valid": is_valid,
            "status": status,
            "flags": flags,
            "validated_reading": reading
        }

    @staticmethod
    def aggregate_village_sensors(sensors: List[Dict[str, Any]]) -> Dict[str, Any]:
        if not sensors:
            return {
                "active_sensors": 0,
                "avg_temp": None,
                "avg_humidity": None,
                "rain_detected": False,
                "total_rainfall_mm": 0.0,
                "fleet_status": "NO_SENSORS"
            }
            
        valid_sensors = [s for s in sensors if s.get("health_status") != "OFFLINE"]
        if not valid_sensors:
            return {
                "active_sensors": 0,
                "fleet_status": "ALL_OFFLINE",
                "rain_detected": False,
                "total_rainfall_mm": 0.0
            }
            
        avg_temp = sum(s["temperature"] for s in valid_sensors) / len(valid_sensors)
        avg_hum = sum(s["humidity"] for s in valid_sensors) / len(valid_sensors)
        rain_detected = any(s.get("rain_detected", False) for s in valid_sensors)
        total_rain = max(s.get("rainfall_mm", 0.0) for s in valid_sensors)
        
        return {
            "active_sensors": len(valid_sensors),
            "avg_temp": round(avg_temp, 1),
            "avg_humidity": round(avg_hum, 1),
            "rain_detected": rain_detected,
            "total_rainfall_mm": round(total_rain, 1),
            "fleet_status": "OPTIMAL"
        }
