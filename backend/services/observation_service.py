"""
Observation Service
Manages farmer submissions, storage, retrieval, and nearby community observations.
"""

from typing import List, Dict, Any
from backend.database.database import (
    save_observation,
    get_observations_for_village,
    update_observation_status
)
from backend.agents.observation_agent import ObservationAgent
from backend.data.mock_data import get_simulated_community_reports

class ObservationService:
    @staticmethod
    def submit_farmer_report(raw_data: Dict[str, Any]) -> Dict[str, Any]:
        structured = ObservationAgent.process_incoming_report(raw_data)
        obs_id = save_observation(structured)
        structured["id"] = obs_id
        return structured

    @staticmethod
    def get_village_observations(village_id: str, limit: int = 15) -> List[Dict[str, Any]]:
        # Pull saved farmer submissions
        stored = get_observations_for_village(village_id, limit=limit)
        
        # If very few observations, enrich with controlled community reports for realistic visualization
        if len(stored) < 2:
            community_defaults = get_simulated_community_reports(village_id)
            for c in community_defaults:
                if "image_url" not in c:
                    c["image_url"] = None
                if "audio_url" not in c:
                    c["audio_url"] = None
                if "media_attached" not in c:
                    c["media_attached"] = {
                        "has_image": False,
                        "has_audio": False,
                        "image": False,
                        "audio": False
                    }
                if "confidence" not in c:
                    c["confidence"] = c.get("confidence_score", 50.0)
            return stored + community_defaults
            
        return stored

    @staticmethod
    def update_status(obs_id: str, status: str, confidence_score: float):
        update_observation_status(obs_id, status, confidence_score)
