import json
import os
import sqlite3
import uuid
from datetime import datetime
from typing import List, Optional, Dict, Any

DATABASE_PATH = os.path.join(os.path.dirname(__file__), "gramweather.db")
VILLAGES_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "villages.json")

def get_db_connection():
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Observations table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS observations (
            id TEXT PRIMARY KEY,
            village_id TEXT NOT NULL,
            reporter_name TEXT NOT NULL,
            event TEXT NOT NULL,
            intensity TEXT NOT NULL,
            time_description TEXT,
            description TEXT,
            timestamp TEXT NOT NULL,
            status TEXT NOT NULL,
            confidence_score REAL NOT NULL,
            source TEXT NOT NULL,
            is_simulated INTEGER NOT NULL DEFAULT 0
        )
    """)
    
    # Verification history table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS verification_results (
            id TEXT PRIMARY KEY,
            observation_id TEXT NOT NULL,
            village_id TEXT NOT NULL,
            status TEXT NOT NULL,
            confidence_score REAL NOT NULL,
            confidence_level TEXT NOT NULL,
            summary TEXT NOT NULL,
            evidence_json TEXT NOT NULL,
            action_implication TEXT NOT NULL,
            timestamp TEXT NOT NULL
        )
    """)
    
    conn.commit()
    conn.close()

def load_villages() -> List[Dict[str, Any]]:
    if os.path.exists(VILLAGES_FILE):
        with open(VILLAGES_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def get_village_by_id(village_id: str) -> Optional[Dict[str, Any]]:
    villages = load_villages()
    for v in villages:
        if v["id"].lower() == village_id.lower():
            return v
    return None

def save_observation(obs_data: Dict[str, Any]) -> str:
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()
    obs_id = obs_data.get("id") or str(uuid.uuid4())[:8]
    
    cursor.execute("""
        INSERT INTO observations (
            id, village_id, reporter_name, event, intensity, time_description,
            description, timestamp, status, confidence_score, source, is_simulated
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        obs_id,
        obs_data["village_id"],
        obs_data.get("reporter_name", "Farmer"),
        obs_data["event"],
        obs_data.get("intensity", "Moderate"),
        obs_data.get("time_description", "Just now"),
        obs_data.get("description", ""),
        obs_data.get("timestamp", datetime.utcnow().isoformat()),
        obs_data.get("status", "PENDING"),
        obs_data.get("confidence_score", 0.0),
        obs_data.get("source", "farmer_report"),
        1 if obs_data.get("is_simulated") else 0
    ))
    conn.commit()
    conn.close()
    return obs_id

def update_observation_status(obs_id: str, status: str, confidence_score: float):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE observations
        SET status = ?, confidence_score = ?
        WHERE id = ?
    """, (status, confidence_score, obs_id))
    conn.commit()
    conn.close()

def get_observations_for_village(village_id: str, limit: int = 20) -> List[Dict[str, Any]]:
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT * FROM observations
        WHERE village_id = ?
        ORDER BY timestamp DESC
        LIMIT ?
    """, (village_id, limit))
    rows = cursor.fetchall()
    conn.close()
    
    results = []
    for r in rows:
        results.append({
            "id": r["id"],
            "village_id": r["village_id"],
            "reporter_name": r["reporter_name"],
            "event": r["event"],
            "intensity": r["intensity"],
            "time_description": r["time_description"],
            "description": r["description"],
            "timestamp": r["timestamp"],
            "status": r["status"],
            "confidence_score": r["confidence_score"],
            "source": r["source"],
            "is_simulated": bool(r["is_simulated"])
        })
    return results

def save_verification_result(result_data: Dict[str, Any]):
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()
    rec_id = str(uuid.uuid4())[:8]
    
    cursor.execute("""
        INSERT INTO verification_results (
            id, observation_id, village_id, status, confidence_score,
            confidence_level, summary, evidence_json, action_implication, timestamp
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        rec_id,
        result_data["observation_id"],
        result_data["village_id"],
        result_data["status"],
        result_data["confidence_score"],
        result_data["confidence_level"],
        result_data["summary"],
        json.dumps(result_data["evidence_breakdown"]),
        result_data["action_implication"],
        result_data.get("timestamp", datetime.utcnow().isoformat())
    ))
    conn.commit()
    conn.close()
