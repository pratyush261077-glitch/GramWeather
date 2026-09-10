"""
Firebase Configuration Stub
Allows optional future integration with Firebase Firestore / Auth.
Falls back to local SQLite when credentials are not supplied.
"""

import os

FIREBASE_ENABLED = bool(os.getenv("FIREBASE_CREDENTIALS_PATH"))

def get_firebase_app():
    if not FIREBASE_ENABLED:
        return None
    try:
        import firebase_admin
        from firebase_admin import credentials
        cred = credentials.Certificate(os.getenv("FIREBASE_CREDENTIALS_PATH"))
        return firebase_admin.initialize_app(cred)
    except Exception as e:
        print(f"[Firebase] Initialization skipped: {e}")
        return None
