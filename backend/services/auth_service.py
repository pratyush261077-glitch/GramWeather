import os
import uuid
from datetime import datetime, timedelta
from typing import Optional, Dict, Any, Tuple
import bcrypt
import jwt
from dotenv import load_dotenv

from backend.database.database import (
    create_user_in_db,
    get_user_by_id_db,
    get_user_by_email_db,
    get_user_by_phone_db,
    get_user_by_identifier_db,
    init_db
)

# Load environment variables
load_dotenv()

# JWT configuration
JWT_SECRET = os.getenv("JWT_SECRET", "gramweather_sih2024_hyperlocal_auth_secret_key_dev")
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_DAYS = 7


def hash_password(plain_password: str) -> str:
    """Hash a plain text password using bcrypt with a secure salt."""
    salt = bcrypt.gensalt(rounds=12)
    hashed = bcrypt.hashpw(plain_password.encode("utf-8"), salt)
    return hashed.decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against the stored bcrypt hash."""
    if not plain_password or not hashed_password:
        return False
    try:
        return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))
    except Exception:
        return False


def create_access_token(user_id: str, role: str, expires_delta: Optional[timedelta] = None) -> str:
    """
    Generate a signed JWT token.
    Prototype note: stored in client localStorage for development;
    production deployment should migrate to secure httpOnly, SameSite cookies.
    """
    now = datetime.utcnow()
    expire = now + (expires_delta or timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS))
    payload = {
        "user_id": user_id,
        "sub": user_id,
        "role": role,
        "iat": now,
        "exp": expire
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_access_token(token: str) -> Dict[str, Any]:
    """Decode and validate a JWT access token."""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise ValueError("Authentication token has expired. Please log in again.")
    except jwt.InvalidTokenError as e:
        raise ValueError(f"Invalid authentication token: {str(e)}")


def sanitize_user_dict(user: Dict[str, Any]) -> Dict[str, Any]:
    """Return user record with password_hash removed."""
    safe = dict(user)
    safe.pop("password_hash", None)
    return safe


def signup_user(signup_data: Dict[str, Any]) -> Tuple[Dict[str, Any], str]:
    """
    Register a new user account.
    Validates that email/phone are unique.
    """
    init_db()
    name = signup_data.get("name", "").strip()
    password = signup_data.get("password", "")
    email = signup_data.get("email")
    phone = signup_data.get("phone")
    role = signup_data.get("role", "farmer")
    village = signup_data.get("village")
    state = signup_data.get("state")
    district = signup_data.get("district")
    block = signup_data.get("block")
    language = signup_data.get("language", "en")

    if not name or len(name) < 2:
        raise ValueError("Name must be at least 2 characters long.")
    if not password or len(password) < 4:
        raise ValueError("Password must be at least 4 characters long.")

    if not email and not phone:
        raise ValueError("Please provide either an email or a phone number for your account.")

    # Check for duplicate email
    if email:
        cleaned_email = str(email).strip().lower()
        if get_user_by_email_db(cleaned_email):
            raise ValueError("An account with this email is already registered.")
        email = cleaned_email

    # Check for duplicate phone
    if phone:
        cleaned_phone = str(phone).strip()
        if get_user_by_phone_db(cleaned_phone):
            raise ValueError("An account with this phone number is already registered.")
        phone = cleaned_phone

    # Hash password with bcrypt
    pw_hash = hash_password(password)

    user_record = {
        "id": f"USR_{str(uuid.uuid4())[:8].upper()}",
        "name": name,
        "email": email,
        "phone": phone,
        "role": role if role in ["farmer", "officer"] else "farmer",
        "village": village,
        "state": state,
        "district": district,
        "block": block,
        "language": language or "en",
        "password_hash": pw_hash,
        "created_at": datetime.utcnow().isoformat()
    }

    created = create_user_in_db(user_record)
    token = create_access_token(created["id"], created["role"])
    return sanitize_user_dict(created), token


def login_user(identifier: str, password: str) -> Tuple[Dict[str, Any], str]:
    """
    Authenticate a user by phone or email + password.
    Returns (safe_user_dict, jwt_token).
    """
    init_db()
    if not identifier or not identifier.strip():
        raise ValueError("Please enter your email or phone number.")
    if not password:
        raise ValueError("Please enter your password.")

    cleaned_id = identifier.strip()
    user = get_user_by_identifier_db(cleaned_id)
    if not user:
        raise ValueError("No registered account found with that email or phone.")

    if not verify_password(password, user.get("password_hash", "")):
        raise ValueError("Incorrect password. Please verify and try again.")

    token = create_access_token(user["id"], user.get("role", "farmer"))
    return sanitize_user_dict(user), token


def get_user_from_token(token: str) -> Dict[str, Any]:
    """Given a bearer token string, decode and return user record."""
    payload = decode_access_token(token)
    user_id = payload.get("user_id") or payload.get("sub")
    if not user_id:
        raise ValueError("Malformed token: missing user_id.")
    user = get_user_by_id_db(user_id)
    if not user:
        raise ValueError("User associated with this token no longer exists.")
    return sanitize_user_dict(user)


def seed_demo_accounts():
    """
    Seed initial judge evaluation demo accounts on startup.
    - Farmer: farmer@gramweather.in / demo1234
    - Officer: officer@gramweather.in / demo1234
    """
    init_db()

    # 1. Farmer Demo Account
    farmer_email = "farmer@gramweather.in"
    if not get_user_by_email_db(farmer_email):
        try:
            create_user_in_db({
                "id": "DEMO_FARMER_01",
                "name": "Ramesh Patel (Demo Farmer)",
                "email": farmer_email,
                "phone": "9876543210",
                "village": "Khanna",
                "state": "Punjab",
                "district": "Ludhiana",
                "block": "Khanna",
                "language": "en",
                "role": "farmer",
                "password_hash": hash_password("demo1234"),
                "created_at": datetime.utcnow().isoformat()
            })
            print(f"[Auth Seed] Seeded demo farmer account: {farmer_email} / demo1234")
        except Exception as e:
            print(f"[Auth Seed Warning] Could not seed demo farmer: {e}")

    # 2. Officer Demo Account
    officer_email = "officer@gramweather.in"
    if not get_user_by_email_db(officer_email):
        try:
            create_user_in_db({
                "id": "DEMO_OFFICER_01",
                "name": "Dr. Gurpreet Kaur (Agri Officer)",
                "email": officer_email,
                "phone": "9876543211",
                "village": "Khanna",
                "state": "Punjab",
                "district": "Ludhiana",
                "block": "Khanna",
                "language": "en",
                "role": "officer",
                "password_hash": hash_password("demo1234"),
                "created_at": datetime.utcnow().isoformat()
            })
            print(f"[Auth Seed] Seeded demo officer account: {officer_email} / demo1234")
        except Exception as e:
            print(f"[Auth Seed Warning] Could not seed demo officer: {e}")
