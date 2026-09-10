"""
Sensor Service
Manages local sensor fleet telemetry, simulated ESP32 hardware endpoints, and health monitoring.
"""

from typing import List, Dict, Any
from backend.data.mock_data import get_simulated_sensors_for_village
from backend.agents.sensing_agent import SensingAgent

class SensorService:
    @staticmethod
    def get_sensors_for_village(village_id: str, scenario: str = "normal") -> List[Dict[str, Any]]:
        raw_readings = get_simulated_sensors_for_village(village_id, scenario=scenario)
        validated_list = []
        for r in raw_readings:
            val_res = SensingAgent.validate_reading(r)
            reading = val_res["validated_reading"]
            reading["health_status"] = val_res["status"]
            reading["quality_flags"] = val_res["flags"]
            validated_list.append(reading)
        return validated_list

    @staticmethod
    def get_fleet_summary(village_id: str, scenario: str = "normal") -> Dict[str, Any]:
        sensors = SensorService.get_sensors_for_village(village_id, scenario=scenario)
        return SensingAgent.aggregate_village_sensors(sensors)
