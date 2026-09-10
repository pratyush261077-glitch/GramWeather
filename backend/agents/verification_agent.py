"""
Verification Agent
Core Innovation of GramWeather AI.
Cross-references farmer observations with local sensors, community reports, and external NWP models.
Communicates uncertainty instead of pretending to know the answer.
"""

from typing import Dict, Any, List
from datetime import datetime

class VerificationAgent:
    @staticmethod
    def verify_observation(
        observation: Dict[str, Any],
        sensors: List[Dict[str, Any]],
        community_reports: List[Dict[str, Any]],
        external_weather: Dict[str, Any]
    ) -> Dict[str, Any]:
        obs_event = observation.get("event", "").lower()
        obs_intensity = observation.get("intensity", "").lower()
        
        evidence_breakdown = []
        agreements = 0
        total_weight = 0.0
        concordance_sum = 0.0

        # 1. Evaluate Sensor Evidence (Weight: 0.35)
        sensor_weight = 0.35
        total_weight += sensor_weight
        sensor_rain = any(s.get("rain_detected", False) for s in sensors)
        sensor_high_hum = any(s.get("humidity", 0.0) >= 80.0 for s in sensors)
        
        sensor_agrees = False
        sensor_detail = ""
        if "rain" in obs_event:
            if sensor_rain:
                sensor_agrees = True
                sensor_detail = "Local micro-sensor detects active precipitation."
            elif sensor_high_hum:
                sensor_agrees = True
                sensor_detail = "Sensor shows high saturation (>80% humidity), pre-rain or light drizzle likely."
            else:
                sensor_agrees = False
                sensor_detail = f"Sensor dry: humidity is lower, no precipitation registered."
        elif obs_event in ["clear", "partly cloudy", "cloudy"]:
            if not sensor_rain:
                sensor_agrees = True
                sensor_detail = "Sensor confirms no rain detected."
            else:
                sensor_agrees = False
                sensor_detail = "Sensor detects rainfall contrary to clear sky report."
        else:
            sensor_agrees = True
            sensor_detail = "Sensor reading consistent with ambient baseline."

        if sensor_agrees:
            agreements += 1
            concordance_sum += sensor_weight
            
        evidence_breakdown.append({
            "source_name": "Local ESP32 Micro-Station",
            "reading": f"Rain: {'Detected' if sensor_rain else 'Dry'}, Humidity: {sensors[0]['humidity'] if sensors else 'N/A'}%",
            "agrees": sensor_agrees,
            "reliability_weight": sensor_weight,
            "detail": sensor_detail,
            "is_simulated": True
        })

        # 2. Evaluate Nearby Community Reports (Weight: 0.35)
        comm_weight = 0.35
        total_weight += comm_weight
        
        matching_comm = 0
        conflicting_comm = 0
        for cr in community_reports:
            cr_event = cr.get("event", "").lower()
            if ("rain" in obs_event and "rain" in cr_event) or (obs_event == cr_event):
                matching_comm += 1
            else:
                conflicting_comm += 1
                
        comm_agrees = (matching_comm >= conflicting_comm) and (len(community_reports) > 0)
        comm_detail = f"{matching_comm} nearby farmer reports agree, {conflicting_comm} conflict."
        
        if comm_agrees:
            agreements += 1
            concordance_sum += comm_weight
            
        evidence_breakdown.append({
            "source_name": "Nearby Community Reports",
            "reading": f"{matching_comm} concordant reports in radius",
            "agrees": comm_agrees,
            "reliability_weight": comm_weight,
            "detail": comm_detail,
            "is_simulated": True
        })

        # 3. Evaluate External Weather Model (Open-Meteo) (Weight: 0.30)
        ext_weight = 0.30
        total_weight += ext_weight
        
        rain_prob = external_weather.get("rain_probability", 0.0)
        precip = external_weather.get("precipitation", 0.0)
        cloud = external_weather.get("cloud_cover", 0.0)
        
        ext_agrees = False
        ext_detail = ""
        if "rain" in obs_event:
            if rain_prob >= 40.0 or precip > 0.0:
                ext_agrees = True
                ext_detail = f"NWP model indicates {rain_prob}% rain probability with active radar clouds."
            else:
                ext_agrees = False
                ext_detail = f"Model predicts low rain probability ({rain_prob}%) and no precipitation."
        else:
            if rain_prob < 50.0:
                ext_agrees = True
                ext_detail = f"NWP model predicts calm conditions ({rain_prob}% rain prob)."
            else:
                ext_agrees = False
                ext_detail = f"Model predicts rain likelihood ({rain_prob}%)."

        if ext_agrees:
            agreements += 1
            concordance_sum += ext_weight

        evidence_breakdown.append({
            "source_name": "Open-Meteo NWP Forecast Model",
            "reading": f"{external_weather.get('weather_condition', 'Partly cloudy')}, Rain Prob: {rain_prob}%",
            "agrees": ext_agrees,
            "reliability_weight": ext_weight,
            "detail": ext_detail,
            "is_simulated": False
        })

        # Compute final confidence score and categorical status
        score_pct = round((concordance_sum / total_weight) * 100.0, 1)
        
        if score_pct >= 70.0:
            status = "VERIFIED"
            level = "HIGH"
            summary = f"Observation confirmed by {agreements} of 3 independent sources. High hyperlocal certainty."
            action = "Condition verified. Proceed with weather-sensitive advisory adjustments."
        elif score_pct >= 40.0:
            status = "UNVERIFIED"
            level = "MEDIUM"
            summary = f"Mixed signals: partial agreement across sensor and forecast models. Awaiting additional observation."
            action = "Exercise caution. Do not base irreversible agricultural operations on unverified reports."
        else:
            status = "CONFLICT"
            level = "LOW"
            summary = f"Sharp conflict detected between farmer observation and surrounding telemetry."
            action = "Marked as unverified conflict. Retaining baseline weather model until corroborated."

        return {
            "observation_id": observation.get("id", "OBS_UNKNOWN"),
            "village_id": observation.get("village_id", "khanna"),
            "status": status,
            "confidence_score": score_pct,
            "confidence_level": level,
            "summary": summary,
            "evidence_breakdown": evidence_breakdown,
            "action_implication": action,
            "timestamp": datetime.utcnow().isoformat()
        }
