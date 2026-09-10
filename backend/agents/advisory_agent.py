"""
Advisory Agent
ICAR Rule-Based Agricultural Decision Engine.
Reads Open-Meteo telemetry (7-day rain forecast, wind speed, 24h & 48h rain risk)
and applies ICAR-style agronomic thresholds for Wheat, Paddy, and Maize.
"""

from typing import Dict, Any, Optional
from datetime import datetime

class AdvisoryAgent:
    HONEST_LABEL = "Rule-based ICAR advisory, not expert instruction."

    CROP_NAMES = {
        "hi": {
            "Wheat": "गेहूं", "Paddy": "धान", "Maize": "मक्का",
            "Sugarcane": "गन्ना", "Cotton": "कपास", "Mustard": "सरसों"
        },
        "pa": {
            "Wheat": "ਕਣਕ", "Paddy": "ਝੋਨਾ", "Maize": "ਮੱਕੀ",
            "Sugarcane": "ਗੰਨਾ", "Cotton": "ਕਪਾਹ", "Mustard": "ਸਰ੍ਹੋਂ"
        }
    }

    # Crop-specific agronomic context based on ICAR recommendations
    CROP_CONTEXTS = {
        "Wheat": {
            "irrigation_note": "Crown Root Initiation (CRI) and tillering are critical moisture stages for wheat.",
            "spraying_note": "Target broadleaf weedicide or stripe rust fungicide when leaf moisture is dry.",
            "harvesting_note": "Grain moisture must be <12% for safe silo storage without mold.",
            "fertilizer_note": "Broadcast second split of Urea (65 kg/acre) before scheduled watering."
        },
        "Paddy": {
            "irrigation_note": "Paddy requires 2-5 cm standing water during vegetative and tillering phases.",
            "spraying_note": "Target stem borer or blast treatment; ensure at least 4h rain-free period after foliar spray.",
            "harvesting_note": "Drain field 10-14 days prior to harvest; protect harvested grain from surface moisture.",
            "fertilizer_note": "Split nitrogen into 3 doses; avoid top-dressing in standing water with high runoff."
        },
        "Maize": {
            "irrigation_note": "Maize is highly sensitive to waterlogging; sensitive to drought at silking/tasseling.",
            "spraying_note": "Direct spray into leaf whorls for Fall Armyworm (FAW) control during calm wind.",
            "harvesting_note": "Harvest cobs when husk turns dry parchment; sun-dry cobs to <14% moisture to prevent aflatoxin.",
            "fertilizer_note": "Top-dress nitrogen (40 kg/acre) at knee-high stage (V6) along rows followed by earthing up."
        }
    }

    @classmethod
    def generate_advisory(
        cls,
        village_id: str,
        crop: str,
        telemetry: Dict[str, Any],
        lang: str = "en"
    ) -> Dict[str, Any]:
        crop_clean = crop.strip().title()
        if crop_clean not in cls.CROP_CONTEXTS:
            # Fallback to Wheat or match closest
            crop_clean = "Wheat" if "wheat" in crop.lower() else ("Paddy" if "paddy" in crop.lower() else "Maize")

        temp = float(telemetry.get("temperature", 28.0) or 28.0)
        humidity = float(telemetry.get("relative_humidity", 60.0) or 60.0)
        wind_speed = float(telemetry.get("wind_speed_kmh", telemetry.get("wind_speed", 8.0)) or 8.0)
        forecast_7d_rain = float(telemetry.get("forecast_7d_rain_mm", 0.0) or 0.0)
        rain_within_24h = bool(telemetry.get("rain_within_24h", False))
        rain_within_48h = bool(telemetry.get("rain_within_48h", False))
        next_rain_desc = telemetry.get("next_rain_desc", "None in next 48h")
        crop_ctx = cls.CROP_CONTEXTS.get(crop_clean, cls.CROP_CONTEXTS["Wheat"])

        # -------------------------------------------------------------
        # 1. Irrigation Strategy
        # Thresholds:
        # - >= 15 mm -> "Skip irrigation; rain expected. Recheck after rain."
        # - 5-15 mm -> "Reduce irrigation by half and recheck soil moisture."
        # - Else -> "Irrigate as per crop stage; soil likely drying."
        # -------------------------------------------------------------
        if forecast_7d_rain >= 15.0:
            irrigation_decision = "Skip irrigation; rain expected. Recheck after rain."
            irrigation_severity = "WARNING"
        elif forecast_7d_rain >= 5.0:
            irrigation_decision = "Reduce irrigation by half and recheck soil moisture."
            irrigation_severity = "CAUTION"
        else:
            irrigation_decision = "Irrigate as per crop stage; soil likely drying."
            irrigation_severity = "NORMAL"

        irrigation_detail = f"7-day rain outlook is {forecast_7d_rain:.1f} mm. {crop_ctx['irrigation_note']}"

        # -------------------------------------------------------------
        # 2. Spraying Safety Window
        # Show wind speed and next rain.
        # - If wind > 12 km/h -> "Do NOT spray (wind drift)."
        # - If rain likely within 24h -> "Do NOT spray; rain will wash off."
        # - Else -> "Safe window: next 24-36h."
        # -------------------------------------------------------------
        if wind_speed > 12.0:
            spraying_decision = "Do NOT spray (wind drift)."
            spraying_severity = "DANGER"
            spraying_detail = f"Wind speed {wind_speed:.1f} km/h exceeds 12 km/h safety limit. Chemical drift causes loss and non-target damage."
        elif rain_within_24h:
            spraying_decision = "Do NOT spray; rain will wash off."
            spraying_severity = "DANGER"
            spraying_detail = f"Rain likely within 24h ({next_rain_desc}). Chemical wash-off prevents foliar absorption."
        else:
            spraying_decision = "Safe window: next 24-36h."
            spraying_severity = "SAFE"
            spraying_detail = f"Calm wind ({wind_speed:.1f} km/h) with rain-free window. {crop_ctx['spraying_note']}"

        # -------------------------------------------------------------
        # 3. Harvesting & Storage
        # - If rain expected within 48h -> "Harvest early / cover produce."
        # - Else -> "Favorable for harvest."
        # -------------------------------------------------------------
        if rain_within_48h:
            harvesting_decision = "Harvest early / cover produce."
            harvesting_severity = "WARNING"
            harvesting_detail = f"Rain expected within 48h ({next_rain_desc}). Move mature produce to dry storage or secure with waterproof tarpaulin."
        else:
            harvesting_decision = "Favorable for harvest."
            harvesting_severity = "SAFE"
            harvesting_detail = f"Sunny, dry conditions favorable for cutting, threshing, and yard drying. {crop_ctx['harvesting_note']}"

        # -------------------------------------------------------------
        # 4. Nutrient Management & Top-Dressing
        # - If rain expected within 24h -> "Hold fertilizer; rain will leach nutrients."
        # - Else -> "Top-dress on schedule."
        # -------------------------------------------------------------
        if rain_within_24h:
            fertilizer_decision = "Hold fertilizer; rain will leach nutrients."
            fertilizer_severity = "WARNING"
            fertilizer_detail = f"Surface runoff from expected rain within 24h will cause nitrate leaching and financial loss. Resume after soil settles."
        else:
            fertilizer_decision = "Top-dress on schedule."
            fertilizer_severity = "SAFE"
            fertilizer_detail = f"Adequate soil moisture without leaching risk. {crop_ctx['fertilizer_note']}"

        summary = f"{crop_clean} ({village_id.title()}): Temp {temp:.1f}°C, RH {humidity:.0f}%, Wind {wind_speed:.1f} km/h, 7d Rain {forecast_7d_rain:.1f} mm."

        return {
            "village_id": village_id,
            "crop": crop_clean,
            "weather_summary": summary,
            "honest_label": cls.HONEST_LABEL,
            "telemetry": {
                "temperature": temp,
                "relative_humidity": humidity,
                "wind_speed_kmh": wind_speed,
                "forecast_7d_rain_mm": forecast_7d_rain,
                "rain_within_24h": rain_within_24h,
                "rain_within_48h": rain_within_48h,
                "next_rain": next_rain_desc,
            },
            "irrigation": {
                "title": "Irrigation Strategy",
                "decision": irrigation_decision,
                "detail": irrigation_detail,
                "severity": irrigation_severity,
                "forecast_7d_rain_mm": forecast_7d_rain,
                "rule_threshold": "≥15 mm (Skip) · 5–15 mm (Halve) · <5 mm (Irrigate)"
            },
            "spraying": {
                "title": "Spraying Safety Window",
                "decision": spraying_decision,
                "detail": spraying_detail,
                "severity": spraying_severity,
                "wind_speed_kmh": wind_speed,
                "next_rain": next_rain_desc,
                "rule_threshold": "Wind >12 km/h or Rain within 24h → Do NOT spray"
            },
            "harvesting": {
                "title": "Harvesting & Storage",
                "decision": harvesting_decision,
                "detail": harvesting_detail,
                "severity": harvesting_severity,
                "rain_within_48h": rain_within_48h,
                "rule_threshold": "Rain within 48h → Harvest early / cover"
            },
            "fertilizer": {
                "title": "Nutrient Management & Top-Dressing",
                "decision": fertilizer_decision,
                "detail": fertilizer_detail,
                "severity": fertilizer_severity,
                "rain_within_24h": rain_within_24h,
                "rule_threshold": "Rain within 24h → Hold fertilizer"
            },
            # Backwards compatibility fields
            "irrigation_advice": f"{irrigation_decision} {irrigation_detail}",
            "spraying_advice": f"{spraying_decision} {spraying_detail}",
            "harvesting_advice": f"{harvesting_decision} {harvesting_detail}",
            "fertilizer_advice": f"{fertilizer_decision} {fertilizer_detail}",
            "risk_level": "MODERATE" if (spraying_severity == "DANGER" or irrigation_severity == "WARNING") else "LOW",
            "generated_at": datetime.utcnow().isoformat()
        }
