"""
Alert Agent
Threshold Event Engine for Hyperlocal Severe Weather Triggers.
Monitors:
- HEAVY RAIN: forecast rain >= 64.5 mm in 24h -> "Avoid irrigation, protect harvested produce."
- STRONG WIND: wind >= 40 km/h -> "Secure vulnerable crops and structures."
- HEAT: max temperature >= 42 C -> "High temperature, check crop water needs."
- BREAK RISK: monsoon break risk is HIGH -> "Monsoon break likely, plan irrigation backup."

Each alert provides:
- id
- village_id
- type (HEAVY RAIN / STRONG WIND / HEAT / BREAK RISK)
- severity (CRITICAL / WARNING)
- action_required (one action sentence)
- timestamp
- source_label
- parameter_trigger
- is_injected (boolean)
"""

from typing import Dict, Any, List, Optional
from datetime import datetime
import uuid

# In-memory storage for synthetic demo injected alerts per village
_INJECTED_ALERTS: Dict[str, List[Dict[str, Any]]] = {}

class AlertAgent:
    @classmethod
    def evaluate_weather_alerts(
        cls,
        village_id: str,
        weather: Dict[str, Any],
        monsoon_outlook: Optional[Dict[str, Any]] = None
    ) -> List[Dict[str, Any]]:
        alerts = []
        now_iso = datetime.utcnow().isoformat()

        # Telemetry parameters
        forecast_rain_24h = float(weather.get("rain_24h_mm", weather.get("precipitation", 0.0)) or 0.0)
        curr_wind = float(weather.get("wind_speed_kmh", weather.get("wind_speed", 0.0)) or 0.0)
        max_wind = float(weather.get("max_wind_speed_kmh", curr_wind) or curr_wind)
        effective_wind = max(curr_wind, max_wind)

        curr_temp = float(weather.get("temperature", 28.0) or 28.0)
        max_temp = float(weather.get("max_temperature", curr_temp) or curr_temp)
        effective_temp = max(curr_temp, max_temp)

        # Monsoon break risk: check outlook or 7-day rain (<10 mm = HIGH break risk)
        break_risk = "LOW"
        if monsoon_outlook:
            break_risk = monsoon_outlook.get("break_risk_7d", "LOW")
        else:
            rain_7d = float(weather.get("forecast_7d_rain_mm", 10.0) or 10.0)
            if rain_7d < 10.0:
                break_risk = "HIGH"
            elif rain_7d < 15.0:
                break_risk = "MODERATE"

        # -------------------------------------------------------------
        # 1. HEAVY RAIN Trigger
        # Condition: forecast rain >= 64.5 mm in 24h
        # Action: "Avoid irrigation, protect harvested produce."
        # -------------------------------------------------------------
        if forecast_rain_24h >= 64.5:
            alerts.append({
                "id": f"ALT_RAIN_{uuid.uuid4().hex[:6]}",
                "village_id": village_id,
                "type": "HEAVY RAIN",
                "severity": "CRITICAL",
                "title": "Heavy Rain Alert",
                "message": f"24-hour forecasted precipitation is {forecast_rain_24h:.1f} mm, exceeding IMD heavy rainfall threshold (64.5 mm).",
                "action_required": "Avoid irrigation, protect harvested produce.",
                "parameter_trigger": f"Forecast Rain: {forecast_rain_24h:.1f} mm / 24h (≥ 64.5 mm)",
                "source_label": "Open-Meteo NWP Forecast (IMD 64.5mm threshold)",
                "timestamp": now_iso,
                "is_injected": False,
                "is_active": True
            })

        # -------------------------------------------------------------
        # 2. STRONG WIND Trigger
        # Condition: wind >= 40 km/h
        # Action: "Secure vulnerable crops and structures."
        # -------------------------------------------------------------
        if effective_wind >= 40.0:
            alerts.append({
                "id": f"ALT_WIND_{uuid.uuid4().hex[:6]}",
                "village_id": village_id,
                "type": "STRONG WIND",
                "severity": "WARNING",
                "title": "Strong Wind Warning",
                "message": f"Sustained wind speeds / gusts forecasted at {effective_wind:.1f} km/h (threshold ≥ 40 km/h).",
                "action_required": "Secure vulnerable crops and structures.",
                "parameter_trigger": f"Wind Speed: {effective_wind:.1f} km/h (≥ 40 km/h)",
                "source_label": "Open-Meteo Wind Telemetry",
                "timestamp": now_iso,
                "is_injected": False,
                "is_active": True
            })

        # -------------------------------------------------------------
        # 3. HEAT Trigger
        # Condition: max temperature >= 42 C
        # Action: "High temperature, check crop water needs."
        # -------------------------------------------------------------
        if effective_temp >= 42.0:
            alerts.append({
                "id": f"ALT_HEAT_{uuid.uuid4().hex[:6]}",
                "village_id": village_id,
                "type": "HEAT",
                "severity": "WARNING",
                "title": "High Heat Warning",
                "message": f"Ambient temperature expected to reach {effective_temp:.1f}°C (threshold ≥ 42°C). High evapotranspiration.",
                "action_required": "High temperature, check crop water needs.",
                "parameter_trigger": f"Max Temp: {effective_temp:.1f}°C (≥ 42°C)",
                "source_label": "Open-Meteo Temperature Telemetry",
                "timestamp": now_iso,
                "is_injected": False,
                "is_active": True
            })

        # -------------------------------------------------------------
        # 4. BREAK RISK Trigger
        # Condition: monsoon break risk is HIGH
        # Action: "Monsoon break likely, plan irrigation backup."
        # -------------------------------------------------------------
        if str(break_risk).upper() == "HIGH":
            alerts.append({
                "id": f"ALT_BREAK_{uuid.uuid4().hex[:6]}",
                "village_id": village_id,
                "type": "BREAK RISK",
                "severity": "WARNING",
                "title": "Monsoon Break Spell Warning",
                "message": "NWP multi-day ensemble projects extended dry spell (<10 mm rain over next 7 days).",
                "action_required": "Monsoon break likely, plan irrigation backup.",
                "parameter_trigger": "Monsoon Break Risk: HIGH (<10 mm / 7d)",
                "source_label": "GramWeather Monsoon Break Model (Pai et al. 2014)",
                "timestamp": now_iso,
                "is_injected": False,
                "is_active": True
            })

        # Append any active synthetic demo injected alerts for this village
        v_key = village_id.lower()
        if v_key in _INJECTED_ALERTS and _INJECTED_ALERTS[v_key]:
            alerts.extend(_INJECTED_ALERTS[v_key])

        return alerts

    @classmethod
    def inject_demo_alert(cls, village_id: str, alert_type: str = "HEAVY RAIN") -> Dict[str, Any]:
        """Injects a synthetic event (HEAVY RAIN or BREAK RISK) for judges to preview live alert triggers."""
        v_key = village_id.lower()
        now_iso = datetime.utcnow().isoformat()
        if alert_type.upper() == "BREAK RISK":
            demo_alert = {
                "id": f"ALT_DEMO_BREAK_{uuid.uuid4().hex[:6]}",
                "village_id": village_id,
                "type": "BREAK RISK",
                "severity": "WARNING",
                "title": "Monsoon Break Spell Warning (Demo Injection)",
                "message": "NWP multi-day ensemble projects extended dry spell (<10 mm rain over next 7 days).",
                "action_required": "Monsoon break likely, plan irrigation backup.",
                "parameter_trigger": "Monsoon Break Risk: HIGH (<10 mm / 7d)",
                "source_label": "GramWeather Monsoon Break Model (Pai et al. 2014)",
                "timestamp": now_iso,
                "is_injected": True,
                "is_active": True
            }
        else:
            demo_alert = {
                "id": f"ALT_DEMO_RAIN_{uuid.uuid4().hex[:6]}",
                "village_id": village_id,
                "type": "HEAVY RAIN",
                "severity": "CRITICAL",
                "title": "Severe Heavy Rain Warning (Demo Injection)",
                "message": "Forecast rainfall is 72.8 mm in next 24h, exceeding the IMD heavy rain threshold (64.5 mm).",
                "action_required": "Avoid irrigation, protect harvested produce.",
                "parameter_trigger": "Forecast Rain: 72.8 mm / 24h (≥ 64.5 mm)",
                "source_label": "Open-Meteo NWP Forecast (Demo Synthetic Event)",
                "timestamp": now_iso,
                "is_injected": True,
                "is_active": True
            }
        if v_key not in _INJECTED_ALERTS:
            _INJECTED_ALERTS[v_key] = []
        _INJECTED_ALERTS[v_key] = [demo_alert]
        return demo_alert

    @classmethod
    def clear_demo_alerts(cls, village_id: str) -> bool:
        """Clears synthetic demo injected alerts for this village."""
        v_key = village_id.lower()
        if v_key in _INJECTED_ALERTS:
            _INJECTED_ALERTS[v_key] = []
        return True
