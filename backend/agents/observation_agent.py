"""
Observation Agent
Converts unstructured farmer reports and quick clicks into standardized observation structures.
Principle: A human report is an observation, not automatically the truth.
"""

from typing import Dict, Any, Optional
from datetime import datetime
import uuid

EVENT_NORMALIZE_MAP = {
    "raining": "Raining",
    "heavy rain": "Heavy Rain",
    "clear": "Clear",
    "cloudy": "Cloudy",
    "partly cloudy": "Partly Cloudy",
    "fog": "Fog",
    "strong wind": "Strong Wind",
    "unusually hot": "Unusually Hot",
    "unusually cold": "Unusually Cold",
    "hail": "Hail",
    "thunderstorm": "Thunderstorm"
}

class ObservationAgent:
    @staticmethod
    def process_incoming_report(raw_data: Dict[str, Any]) -> Dict[str, Any]:
        event_raw = str(raw_data.get("event", "Cloudy")).strip().lower()
        normalized_event = EVENT_NORMALIZE_MAP.get(event_raw, raw_data.get("event", "Cloudy"))
        
        intensity = raw_data.get("intensity", "Moderate")
        if normalized_event in ["Clear", "Cloudy", "Fog"] and intensity == "Heavy":
            intensity = "Moderate"
            
        obs_id = f"FARM_OBS_{uuid.uuid4().hex[:6].upper()}"
        
        structured_obs = {
            "id": obs_id,
            "village_id": raw_data["village_id"],
            "reporter_name": raw_data.get("reporter_name", "Local Farmer"),
            "event": normalized_event,
            "intensity": intensity,
            "time_description": raw_data.get("time_description", "Just now"),
            "description": raw_data.get("description", ""),
            "latitude": raw_data.get("latitude"),
            "longitude": raw_data.get("longitude"),
            "timestamp": datetime.utcnow().isoformat(),
            "status": "PENDING",
            "confidence_score": 50.0,
            "source": "farmer_report",
            "is_simulated": bool(raw_data.get("is_simulated", False))
        }
        return structured_obs
