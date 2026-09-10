# GramWeather AI 🌾🌦️
## AI-Powered Hyperlocal Weather Intelligence for Indian Villages

> **Tagline:** From Regional Forecasts to Village-Level Weather Intelligence.  
> **Core Principle:** **Observe → Verify → Fuse → Predict → Explain → Learn**

---

## 1. System Overview

**GramWeather AI** addresses the rural meteorological gap by creating a human-in-the-loop, multi-source weather observation and intelligence network for Indian villages. Rather than trusting coarse regional forecasts or assuming unverified reports are ground truth, GramWeather AI cross-references local IoT sensors, farmer reports, community telemetry, and external numerical weather models before fusing conditions and delivering village-level farming advisories.

### Human-in-the-Loop Verification
- **Principle:** A human report is an **observation**, not automatically the truth.
- **Agreement Scenario:** Farmer report + Local Sensor + Community + Model concordant → **VERIFIED (High Confidence)**.
- **Conflict Scenario:** Farmer report disagrees with surrounding telemetry → **CONFLICT / UNVERIFIED (Communicates Uncertainty Honestly)**.

---

## 2. Repository Architecture

```text
GramWeather/
├── backend/
│   ├── main.py                   # FastAPI REST API & orchestration
│   ├── requirements.txt          # Python dependencies (fastapi, uvicorn, httpx, pydantic, scikit-learn, etc.)
│   ├── test_api.py               # Comprehensive 10-suite automated test runner
│   ├── agents/                   # Agentic Pipeline
│   │   ├── sensing_agent.py      # Micro-station IoT health and sanity checks
│   │   ├── observation_agent.py  # Unstructured farmer report normalization
│   │   ├── verification_agent.py # Cross-evidence verification engine & concordance scoring
│   │   ├── fusion_agent.py       # Multi-source weighted data fusion
│   │   ├── prediction_agent.py   # 8-Direction weather & cloud vector calculation
│   │   ├── advisory_agent.py     # Crop-specific agricultural advisories (Wheat, Paddy, Cotton, etc.)
│   │   └── alert_agent.py        # Severe weather threshold evaluator & emergency alerts
│   ├── services/                 # Service layer
│   │   ├── weather_service.py    # Primary weather orchestrator
│   │   ├── sensor_service.py     # ESP32 sensor fleet manager
│   │   ├── observation_service.py# Community and farmer report storage
│   │   ├── forecast_service.py   # Daily and hourly forecast aggregator
│   │   └── notification_service.py # Multilingual alert generator
│   ├── external_sources/         # External Source Adapters
│   │   ├── weather_api.py        # Live Open-Meteo API async adapter with fallback cache
│   │   ├── imd_service.py        # IMD official bulletin adapter stub
│   │   └── satellite_service.py  # CHIRPS satellite rainfall baseline adapter
│   ├── models/
│   │   └── prediction_model.py   # Tabular ML predictor for short-term shifts
│   ├── database/
│   │   ├── database.py           # SQLite database for persistence
│   │   └── schemas.py            # Pydantic data schemas & contracts
│   └── data/
│       ├── villages.json         # Curated Indian villages (Khanna, Baramati, Anand, Mandya, etc.)
│       └── mock_data.py          # Controlled IoT & community simulation scenarios
│
└── frontend/
    ├── package.json              # React 18, Vite
    ├── vite.config.js            # Proxy configuration for /api to backend
    ├── index.html                # HTML entry point with Google Fonts (Outfit & Inter)
    └── src/
        ├── App.jsx               # Application root shell with navigation
        ├── main.jsx              # React DOM mounting
        ├── context/
        │   └── WeatherContext.jsx# Global state (village, weather, observations, language, demo presets)
        ├── services/             # API clients
        │   ├── api.js            # Base HTTP client
        │   ├── weatherAPI.js     # Weather endpoints
        │   ├── observationAPI.js # Observation endpoints
        │   ├── verificationAPI.js# Verification & confidence endpoints
        │   └── advisoryAPI.js    # Advisory & alerts endpoints
        ├── components/           # Reusable UI components
        │   ├── Navbar.jsx        # Top navigation with village selector & demo switcher
        │   ├── WeatherCards.jsx  # Current conditions & 4 mini-metrics
        │   ├── DirectionCompass.jsx # Interactive 8-direction radar compass (N, NE, E, SE, S, SW, W, NW)
        │   ├── CloudMovement.jsx # Dynamic cloud movement vector
        │   ├── ConfidenceMeter.jsx # Visual gauge & verification status
        │   ├── ObservationCard.jsx # Farmer observation card with inspect action
        │   ├── AdvisoryCard.jsx  # Agricultural decision cards
        │   ├── FarmerAlert.jsx   # Severe weather banner
        │   ├── LanguageSelector.jsx # English, Hindi, Punjabi toggle
        │   ├── TransparencyBadge.jsx # Honest data attribution tags
        │   └── icons.jsx         # Custom zero-dependency SVG icon set
        ├── screens/              # Screen views
        │   ├── Dashboard.jsx     # Main 3-question dashboard
        │   ├── Verification.jsx  # Verification Engine inspector & dual scenario tester
        │   ├── WeatherMap.jsx    # Spatial micro-grid & IoT sensor inspector
        │   ├── Advisory.jsx      # Agricultural crop advisory screen
        │   ├── Alerts.jsx        # Early warning center
        │   ├── History.jsx       # Historical weather trends & CHIRPS benchmark
        │   └── ReportWeather.jsx # 1-click visual farmer reporting modal
        └── styles/
            ├── global.css        # Design tokens, variables, typography, animations
            └── dashboard.css     # Grid layout, compass styling, modal & glassmorphism
```

---

## 3. Getting Started & Running Locally

### Prerequisites
- Python 3.9+
- Node.js 18+ and npm

### 1. Run the Backend
```bash
cd backend
# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run automated tests
python test_api.py

# Start the FastAPI server (port 8000)
uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```

### 2. Run the Frontend
```bash
cd frontend

# Install dependencies
npm install

# Start the Vite development server (port 5173)
npm run dev
```

Visit **`http://127.0.0.1:5173/`** in your browser to explore the dashboard.

---

## 4. Key Demo Scenarios

In the top navbar, use the **Demo** dropdown to demonstrate the core innovation:
- **Scenario A (Agreement):** Simulates sensor detecting rain + concordant community reports → Result: **`VERIFIED`** (High Confidence).
- **Scenario B (Conflict):** Simulates sensor detecting dry conditions + clear sky model contrary to heavy rain report → Result: **`CONFLICT`** (Low Confidence, Honest Uncertainty).
