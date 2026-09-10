from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class Village(BaseModel):
    id: str
    name: str
    block: Optional[str] = None
    district: str
    state: str
    latitude: float
    longitude: float
    elevation: float
    primary_crops: List[str]
    sensor_fleet_id: str

class WeatherCurrent(BaseModel):
    temperature: float
    relative_humidity: float
    rain_probability: float
    precipitation: float
    wind_speed: float
    wind_direction: float
    wind_direction_cardinal: str
    cloud_cover: float
    surface_pressure: float
    weather_code: int
    weather_condition: str
    timestamp: str
    source: str = "open_meteo"
    is_simulated: bool = False

class DirectionWeatherItem(BaseModel):
    direction: str
    bearing_deg: float
    rain_probability: float
    condition: str
    cloud_cover: float
    wind_speed: float
    rain_cell_distance_km: float = 15.0
    estimated_arrival_minutes: int = 45
    trajectory: str = "SW → NE"
    is_simulated: bool = False

class DirectionWeatherResponse(BaseModel):
    village_id: str
    timestamp: str
    directions: List[DirectionWeatherItem]
    source_attribution: str = "Spatial Model Interp / Open-Meteo"

class CloudMovementInfo(BaseModel):
    from_direction: str
    to_direction: str
    speed_kmh: float
    cloud_density_pct: float
    summary: str
    is_simulated: bool = False

class SensorReading(BaseModel):
    sensor_id: str
    village_id: str
    temperature: float
    humidity: float
    rain_detected: bool
    rainfall_mm: float
    wind_speed: float
    timestamp: str
    health_status: str  # "ONLINE", "DEGRADED", "OFFLINE"
    source: str = "esp32_sensor_network"
    is_simulated: bool = True

class FarmerObservationCreate(BaseModel):
    village_id: str
    reporter_name: str = "Local Farmer"
    event: str  # "Raining", "Heavy Rain", "Clear", "Cloudy", "Fog", "Strong Wind", "Unusually Hot", "Hail"
    intensity: str = "Moderate"  # "Light", "Moderate", "Heavy", "None"
    time_description: str = "Just now"
    description: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None

class FarmerObservation(BaseModel):
    id: str
    village_id: str
    reporter_name: str
    event: str
    intensity: str
    time_description: str
    description: Optional[str] = None
    timestamp: str
    status: str = "PENDING"  # "VERIFIED", "CONFLICT", "UNVERIFIED", "PENDING"
    confidence_score: float = 0.0
    source: str = "farmer_report"
    is_simulated: bool = False

class VerificationEvidenceItem(BaseModel):
    source_name: str
    reading: str
    agrees: bool
    reliability_weight: float
    detail: str
    is_simulated: bool = False

class VerificationResult(BaseModel):
    observation_id: str
    village_id: str
    status: str  # "VERIFIED", "CONFLICT", "UNVERIFIED"
    confidence_score: float
    confidence_level: str  # "HIGH", "MEDIUM", "LOW"
    summary: str
    evidence_breakdown: List[VerificationEvidenceItem]
    action_implication: str
    timestamp: str

class VillageConfidence(BaseModel):
    village_id: str
    overall_confidence: float
    verification_status: str
    active_sources_count: int
    sensors_online: int
    community_reports_count: int
    primary_weather_source: str
    last_updated: str

class FarmingAdvisory(BaseModel):
    village_id: str
    crop: str
    weather_summary: str
    irrigation_advice: str
    spraying_advice: str
    harvesting_advice: str
    fertilizer_advice: str
    risk_level: str  # "LOW", "MODERATE", "HIGH"
    generated_at: str

class FarmerAlert(BaseModel):
    id: str
    village_id: str
    severity: str  # "CRITICAL", "WARNING", "INFO"
    title: str
    message: str
    action_required: str
    parameter_trigger: str
    timestamp: str
    is_active: bool = True

class HistoricalTrendItem(BaseModel):
    date: str
    temp_max: float
    temp_min: float
    precipitation_sum: float
    rain_probability_max: float

class MonsoonIndicatorItem(BaseModel):
    name: str
    measured_value: str
    threshold: str
    status: str  # "MET", "PENDING", "ACTIVE"
    scientific_basis: str

class MonsoonOutlook(BaseModel):
    village_id: str
    problem_statement_id: str = "SIH26086"
    problem_statement_title: str = "Hyperlocal Monsoon Onset & Break Prediction System (Block/Village Scale)"
    monsoon_phase: str
    onset_window: str
    onset_probability: float
    break_risk_pct: float
    break_risk_level: str
    consecutive_wet_days: int
    rainfall_intensity_trend: str
    indicators: List[MonsoonIndicatorItem]
    farming_sowing_advice: str
    generated_at: str

class ForecastVerificationLogItem(BaseModel):
    event_date: str
    predicted_rain_prob: float
    actual_rain_occurred: bool
    actual_rainfall_mm: float
    prediction_error: float
    bias_correction_applied: str
    status: str

class LearningLoopRecord(BaseModel):
    village_id: str
    model_version: str = "GramWeather-Ensemble-v1.2"
    mean_absolute_error_rain_prob: float
    calibration_score: float
    validation_loop_step: str = "Predict → Listen → Compare → Verify → Correct → Explain → Learn"
    logs: List[ForecastVerificationLogItem]
    citations: List[str]

