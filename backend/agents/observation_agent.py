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
        
        lat_val = raw_data.get("latitude") if raw_data.get("latitude") is not None else raw_data.get("lat")
        lon_val = raw_data.get("longitude") if raw_data.get("longitude") is not None else raw_data.get("lon")
        
        image_url = raw_data.get("image_url")
        audio_url = raw_data.get("audio_url")
        
        media_attached = raw_data.get("media_attached")
        if not isinstance(media_attached, dict):
            has_img = bool(image_url)
            has_aud = bool(audio_url)
            media_attached = {
                "has_image": has_img,
                "has_audio": has_aud,
                "image": has_img,
                "audio": has_aud
            }

        structured_obs = {
            "id": obs_id,
            "village_id": raw_data.get("village_id", "khanna"),
            "reporter_name": raw_data.get("reporter_name", "Local Farmer"),
            "event": normalized_event,
            "intensity": intensity,
            "time_description": raw_data.get("time_description", "Just now"),
            "description": raw_data.get("description", ""),
            "language": raw_data.get("language", "en"),
            "latitude": float(lat_val) if lat_val is not None else None,
            "longitude": float(lon_val) if lon_val is not None else None,
            "lat": float(lat_val) if lat_val is not None else None,
            "lon": float(lon_val) if lon_val is not None else None,
            "image_url": image_url,
            "audio_url": audio_url,
            "media_attached": media_attached,
            "timestamp": datetime.utcnow().isoformat(),
            "status": "PENDING",
            "confidence_score": 50.0,
            "confidence": 50.0,
            "source": "farmer",
            "is_simulated": bool(raw_data.get("is_simulated", False))
        }
        return structured_obs
