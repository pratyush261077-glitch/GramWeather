"""
Notification Service
Formats agricultural alerts and notifications with multilingual text generation.
"""

from typing import Dict, Any, List

ALERT_TRANSLATIONS = {
    "hi": {
        "Severe Rain & Waterlogging Advisory": "भारी बारिश और जलभराव की चेतावनी",
        "Strong Wind Gust Warning": "तेज हवा और आंधी की चेतावनी",
        "Extreme Heat Stress Alert": "अत्यधिक गर्मी और लू की चेतावनी",
        "Favorable Village Weather": "अनुकूल मौसम"
    },
    "pa": {
        "Severe Rain & Waterlogging Advisory": "ਭਾਰੀ ਮੀਂਹ ਅਤੇ ਪਾਣੀ ਭਰਨ ਦੀ ਚੇਤਾਵਨੀ",
        "Strong Wind Gust Warning": "ਤੇਜ਼ ਹਵਾ ਅਤੇ ਝੱਖੜ ਦੀ ਚੇਤਾਵਨੀ",
        "Extreme Heat Stress Alert": "ਬਹੁਤ ਜ਼ਿਆਦਾ ਗਰਮੀ ਦੀ ਚੇਤਾਵਨੀ",
        "Favorable Village Weather": "ਅਨੁਕੂਲ ਮੌਸਮ"
    }
}

class NotificationService:
    @staticmethod
    def format_alert_for_language(alert: Dict[str, Any], lang: str = "en") -> Dict[str, Any]:
        result = dict(alert)
        if lang in ALERT_TRANSLATIONS:
            title_trans = ALERT_TRANSLATIONS[lang].get(alert.get("title"))
            if title_trans:
                result["title_localized"] = title_trans
        return result
