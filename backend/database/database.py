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
            is_simulated INTEGER NOT NULL DEFAULT 0,
            image_url TEXT,
            audio_url TEXT,
            media_attached TEXT,
            language TEXT,
            latitude REAL,
            longitude REAL
        )
    """)

    # Migration for existing databases: check and add missing columns
    cursor.execute("PRAGMA table_info(observations)")
    existing_cols = {row[1] for row in cursor.fetchall()}
    new_cols = [
        ("image_url", "TEXT"),
        ("audio_url", "TEXT"),
        ("media_attached", "TEXT"),
        ("language", "TEXT"),
        ("latitude", "REAL"),
        ("longitude", "REAL"),
        ("user_id", "TEXT")
    ]
    for col_name, col_type in new_cols:
        if col_name not in existing_cols:
            try:
                cursor.execute(f"ALTER TABLE observations ADD COLUMN {col_name} {col_type}")
            except Exception as e:
                print(f"[DB Migration Warning] Could not add column {col_name}: {e}")

    # Users table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            phone TEXT,
            email TEXT,
            village TEXT,
            state TEXT,
            district TEXT,
            block TEXT,
            language TEXT NOT NULL DEFAULT 'en',
            role TEXT NOT NULL DEFAULT 'farmer',
            password_hash TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
    """)
    cursor.execute("CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email) WHERE email IS NOT NULL AND email != ''")
    cursor.execute("CREATE UNIQUE INDEX IF NOT EXISTS idx_users_phone ON users(phone) WHERE phone IS NOT NULL AND phone != ''")
    
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
    
    # Prepare media_attached json
    media_attached_val = obs_data.get("media_attached")
    if isinstance(media_attached_val, dict):
        media_attached_str = json.dumps(media_attached_val)
    else:
        has_img = bool(obs_data.get("image_url"))
        has_aud = bool(obs_data.get("audio_url"))
        media_attached_str = json.dumps({
            "has_image": has_img,
            "has_audio": has_aud,
            "image": has_img,
            "audio": has_aud
        })

    lat = obs_data.get("latitude") if obs_data.get("latitude") is not None else obs_data.get("lat")
    lon = obs_data.get("longitude") if obs_data.get("longitude") is not None else obs_data.get("lon")
    user_id = obs_data.get("user_id")

    cursor.execute("""
        INSERT INTO observations (
            id, village_id, reporter_name, event, intensity, time_description,
            description, timestamp, status, confidence_score, source, is_simulated,
            image_url, audio_url, media_attached, language, latitude, longitude, user_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        obs_id,
        obs_data.get("village_id", "khanna"),
        obs_data.get("reporter_name", "Farmer"),
        obs_data["event"],
        obs_data.get("intensity", "Moderate"),
        obs_data.get("time_description", "Just now"),
        obs_data.get("description", ""),
        obs_data.get("timestamp", datetime.utcnow().isoformat()),
        obs_data.get("status", "PENDING"),
        obs_data.get("confidence_score", 50.0),
        obs_data.get("source", "farmer"),
        1 if obs_data.get("is_simulated") else 0,
        obs_data.get("image_url"),
        obs_data.get("audio_url"),
        media_attached_str,
        obs_data.get("language", "en"),
        float(lat) if lat is not None else None,
        float(lon) if lon is not None else None,
        user_id
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
        r_keys = r.keys()
        img_url = r["image_url"] if "image_url" in r_keys else None
        aud_url = r["audio_url"] if "audio_url" in r_keys else None
        user_id = r["user_id"] if "user_id" in r_keys else None
        
        media_attached = None
        if "media_attached" in r_keys and r["media_attached"]:
            try:
                media_attached = json.loads(r["media_attached"])
            except Exception:
                pass
        if not media_attached:
            media_attached = {
                "has_image": bool(img_url),
                "has_audio": bool(aud_url),
                "image": bool(img_url),
                "audio": bool(aud_url)
            }

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
            "confidence": r["confidence_score"],
            "source": r["source"],
            "is_simulated": bool(r["is_simulated"]),
            "image_url": img_url,
            "audio_url": aud_url,
            "media_attached": media_attached,
            "language": r["language"] if "language" in r_keys else "en",
            "latitude": r["latitude"] if "latitude" in r_keys else None,
            "longitude": r["longitude"] if "longitude" in r_keys else None,
            "lat": r["latitude"] if "latitude" in r_keys else None,
            "lon": r["longitude"] if "longitude" in r_keys else None,
            "user_id": user_id
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

# =========================================================================
# User Database Operations
# =========================================================================

def create_user_in_db(user_data: Dict[str, Any]) -> Dict[str, Any]:
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()
    user_id = user_data.get("id") or f"USR_{str(uuid.uuid4())[:8].upper()}"
    created_at = user_data.get("created_at") or datetime.utcnow().isoformat()
    
    phone_val = user_data.get("phone")
    if phone_val is not None:
        phone_val = str(phone_val).strip()
        if not phone_val:
            phone_val = None

    email_val = user_data.get("email")
    if email_val is not None:
        email_val = str(email_val).strip().lower()
        if not email_val:
            email_val = None

    cursor.execute("""
        INSERT INTO users (
            id, name, phone, email, village, state, district, block,
            language, role, password_hash, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        user_id,
        user_data["name"],
        phone_val,
        email_val,
        user_data.get("village"),
        user_data.get("state"),
        user_data.get("district"),
        user_data.get("block"),
        user_data.get("language", "en"),
        user_data.get("role", "farmer"),
        user_data["password_hash"],
        created_at
    ))
    conn.commit()
    conn.close()
    
    saved = dict(user_data)
    saved["id"] = user_id
    saved["phone"] = phone_val
    saved["email"] = email_val
    saved["created_at"] = created_at
    return saved

def get_user_by_id_db(user_id: str) -> Optional[Dict[str, Any]]:
    if not user_id:
        return None
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return dict(row)
    return None

def get_user_by_email_db(email: str) -> Optional[Dict[str, Any]]:
    if not email:
        return None
    cleaned = str(email).strip().lower()
    if not cleaned:
        return None
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE LOWER(email) = ?", (cleaned,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return dict(row)
    return None

def get_user_by_phone_db(phone: str) -> Optional[Dict[str, Any]]:
    if not phone:
        return None
    cleaned = str(phone).strip()
    if not cleaned:
        return None
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE phone = ?", (cleaned,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return dict(row)
    return None

def get_user_by_identifier_db(identifier: str) -> Optional[Dict[str, Any]]:
    if not identifier:
        return None
    cleaned = str(identifier).strip()
    # Check email first
    user = get_user_by_email_db(cleaned)
    if not user:
        user = get_user_by_phone_db(cleaned)
    return user

