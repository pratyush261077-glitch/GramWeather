import asyncio
import httpx
import sys
import os

# Add project root to sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.main import app

async def run_tests():
    print("=== GramWeather AI Automated Test Suite ===")
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://testserver") as client:
        # 1. Health check
        res = await client.get("/api/health")
        assert res.status_code == 200, f"Health check failed: {res.text}"
        print("✓ /api/health passed:", res.json()["status"])

        # 2. Villages catalog
        res = await client.get("/api/villages")
        assert res.status_code == 200
        villages = res.json()
        assert len(villages) >= 5, f"Expected >= 5 villages, got {len(villages)}"
        print(f"✓ /api/villages passed ({len(villages)} villages loaded)")

        # 3. Live village weather from Open-Meteo
        res = await client.get("/api/weather/khanna")
        assert res.status_code == 200
        w_data = res.json()
        assert "current" in w_data
        assert "direction_weather" in w_data
        assert "cloud_movement" in w_data
        print(f"✓ /api/weather/khanna passed: Temp {w_data['current']['temperature']}°C, Condition: {w_data['current']['weather_condition']}, Confidence: {w_data['confidence_score']}%")

        # 4. 8-Direction Weather
        res = await client.get("/api/direction-weather/khanna")
        assert res.status_code == 200
        dirs = res.json()["directions"]
        assert len(dirs) == 8, f"Expected 8 cardinal points, got {len(dirs)}"
        print(f"✓ /api/direction-weather passed (8 directions generated)")

        # 5. Farmer observation submission
        obs_payload = {
            "village_id": "khanna",
            "reporter_name": "Test Farmer Harpreet",
            "event": "Heavy Rain",
            "intensity": "Heavy",
            "time_description": "10 mins ago",
            "description": "Continuous heavy downpour in northern paddy fields."
        }
        res = await client.post("/api/observations", json=obs_payload)
        assert res.status_code == 200
        created_obs = res.json()["observation"]
        print(f"✓ /api/observations passed (created observation ID: {created_obs['id']})")

        # 6. Verification Engine: Scenario A (Agreement)
        verify_payload_a = dict(created_obs)
        res = await client.post("/api/verify?scenario=agreement_rain", json=verify_payload_a)
        assert res.status_code == 200
        result_a = res.json()
        assert result_a["status"] == "VERIFIED", f"Expected VERIFIED, got {result_a['status']}"
        assert result_a["confidence_score"] >= 70.0
        print(f"✓ /api/verify Scenario A (Agreement) passed: Status {result_a['status']}, Confidence {result_a['confidence_score']}%")

        # 7. Verification Engine: Scenario B (Conflict)
        verify_payload_b = dict(created_obs)
        res = await client.post("/api/verify?scenario=conflict_dry", json=verify_payload_b)
        assert res.status_code == 200
        result_b = res.json()
        assert result_b["status"] == "CONFLICT", f"Expected CONFLICT, got {result_b['status']}"
        assert result_b["confidence_score"] < 50.0
        print(f"✓ /api/verify Scenario B (Conflict) passed: Status {result_b['status']}, Confidence {result_b['confidence_score']}%")

        # 8. AI Farming Advisory
        res = await client.get("/api/advisory/khanna?crop=Wheat")
        assert res.status_code == 200
        adv = res.json()
        assert "irrigation_advice" in adv
        assert "spraying_advice" in adv
        print(f"✓ /api/advisory/khanna passed for crop {adv['crop']}: Risk {adv['risk_level']}")

        # 9. Farmer Alerts
        res = await client.get("/api/alerts/khanna")
        assert res.status_code == 200
        alerts = res.json()
        assert len(alerts) >= 1
        print(f"✓ /api/alerts/khanna passed ({len(alerts)} alerts evaluated)")

        # 10. History & CHIRPS baseline
        res = await client.get("/api/history/khanna")
        assert res.status_code == 200
        hist = res.json()
        assert "recent_trend" in hist
        assert "chirps_baseline" in hist
        print(f"✓ /api/history/khanna passed: CHIRPS benchmark {hist['chirps_baseline']['average_monthly_rainfall_mm']} mm")

        # 11. SIH26086: Monsoon Onset & Break Prediction System
        res = await client.get("/api/monsoon-outlook/khanna")
        assert res.status_code == 200
        monsoon = res.json()
        assert monsoon["problem_statement_id"] == "SIH26086"
        assert "onset_window" in monsoon
        assert "break_risk_pct" in monsoon
        assert len(monsoon["indicators"]) >= 3
        print(f"✓ /api/monsoon-outlook/khanna (SIH26086) passed: Phase '{monsoon['monsoon_phase']}', Onset '{monsoon['onset_window']}', Break Risk {monsoon['break_risk_pct']}%")

        # 12. Closed-Loop Learning & Verification Record
        res = await client.get("/api/learning-loop/khanna")
        assert res.status_code == 200
        loop = res.json()
        assert len(loop["logs"]) >= 3
        assert len(loop["citations"]) >= 5
        print(f"✓ /api/learning-loop/khanna passed: MAE {loop['mean_absolute_error_rain_prob']}, Citations: {len(loop['citations'])}")

    print("\n🎉 ALL 12 TEST SUITES PASSED FLAWLESSLY!")

if __name__ == "__main__":
    asyncio.run(run_tests())

