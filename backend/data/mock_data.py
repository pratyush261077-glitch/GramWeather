from typing import Dict, Any, List
from datetime import datetime, timedelta
import random

def get_simulated_sensors_for_village(village_id: str, scenario: str = "normal") -> List[Dict[str, Any]]:
    """
    Returns simulated IoT sensor readings for a village's local micro-station.
    Scenario can be: 'normal', 'agreement_rain', 'conflict_dry'
    """
    now_str = datetime.utcnow().isoformat()
    
    if scenario == "agreement_rain":
        return [
            {
                "sensor_id": f"ESP32_{village_id.upper()}_NORTH_FIELD",
                "village_id": village_id,
                "temperature": 27.2,
                "humidity": 91.0,
                "rain_detected": True,
                "rainfall_mm": 8.4,
                "wind_speed": 16.5,
                "timestamp": now_str,
                "health_status": "ONLINE",
                "source": "ESP32 Village Micro-Sensor (Demo Hardware)",
                "is_simulated": True
            },
            {
                "sensor_id": f"ESP32_{village_id.upper()}_PANCHAYAT_ROOF",
                "village_id": village_id,
                "temperature": 27.5,
                "humidity": 89.5,
                "rain_detected": True,
                "rainfall_mm": 7.8,
                "wind_speed": 15.0,
                "timestamp": now_str,
                "health_status": "ONLINE",
                "source": "ESP32 Village Micro-Sensor (Demo Hardware)",
                "is_simulated": True
            }
        ]
    elif scenario == "conflict_dry":
        return [
            {
                "sensor_id": f"ESP32_{village_id.upper()}_NORTH_FIELD",
                "village_id": village_id,
                "temperature": 33.5,
                "humidity": 45.0,
                "rain_detected": False,
                "rainfall_mm": 0.0,
                "wind_speed": 8.0,
                "timestamp": now_str,
                "health_status": "ONLINE",
                "source": "ESP32 Village Micro-Sensor (Demo Hardware)",
                "is_simulated": True
            }
        ]
    else:
        # Default typical sensor reading
        return [
            {
                "sensor_id": f"ESP32_{village_id.upper()}_STATION_01",
                "village_id": village_id,
                "temperature": 29.8,
                "humidity": 66.0,
                "rain_detected": False,
                "rainfall_mm": 0.0,
                "wind_speed": 11.2,
                "timestamp": now_str,
                "health_status": "ONLINE",
                "source": "ESP32 Village Micro-Sensor (Demo Hardware)",
                "is_simulated": True
            }
        ]

def get_simulated_community_reports(village_id: str, scenario: str = "normal") -> List[Dict[str, Any]]:
    """
    Returns simulated nearby farmer reports within 5 km of the village center.
    """
    now = datetime.utcnow()
    
    if scenario == "agreement_rain":
        return [
            {
                "id": "COMM_REP_01",
                "village_id": village_id,
                "reporter_name": "Gurdeep Singh (2.1 km East)",
                "event": "Heavy Rain",
                "intensity": "Heavy",
                "time_description": "Started 15 mins ago",
                "description": "Paddy fields filling fast, continuous downpour.",
                "timestamp": (now - timedelta(minutes=15)).isoformat(),
                "status": "VERIFIED",
                "confidence_score": 92.0,
                "source": "Community Farmer Network",
                "is_simulated": True
            },
            {
                "id": "COMM_REP_02",
                "village_id": village_id,
                "reporter_name": "Manjit Kaur (3.4 km North)",
                "event": "Raining",
                "intensity": "Moderate",
                "time_description": "Started 25 mins ago",
                "description": "Dark clouds and steady rain.",
                "timestamp": (now - timedelta(minutes=25)).isoformat(),
                "status": "VERIFIED",
                "confidence_score": 88.0,
                "source": "Community Farmer Network",
                "is_simulated": True
            }
        ]
    elif scenario == "conflict_dry":
        return [
            {
                "id": "COMM_REP_03",
                "village_id": village_id,
                "reporter_name": "Harbhajan Lal (1.5 km West)",
                "event": "Clear",
                "intensity": "None",
                "time_description": "Current",
                "description": "Sunny and hot, no rain here.",
                "timestamp": (now - timedelta(minutes=10)).isoformat(),
                "status": "VERIFIED",
                "confidence_score": 90.0,
                "source": "Community Farmer Network",
                "is_simulated": True
            }
        ]
    else:
        return [
            {
                "id": "COMM_REP_04",
                "village_id": village_id,
                "reporter_name": "Ramesh Patel (1.8 km South)",
                "event": "Partly Cloudy",
                "intensity": "None",
                "time_description": "1 hour ago",
                "description": "Breeze picking up from east.",
                "timestamp": (now - timedelta(minutes=60)).isoformat(),
                "status": "VERIFIED",
                "confidence_score": 85.0,
                "source": "Community Farmer Network",
                "is_simulated": True
            }
        ]
