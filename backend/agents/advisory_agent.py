"""
Advisory Agent
Converts real-time village weather parameters into actionable agricultural decisions.
Considers crop type, humidity, rain probability, and wind velocity.
"""

from typing import Dict, Any
from datetime import datetime

class AdvisoryAgent:
    CROP_NAMES = {
        "hi": {
            "Wheat": "गेहूं", "Paddy": "धान", "Sugarcane": "गन्ना",
            "Cotton": "कपास", "Mustard": "सरसों", "Maize": "मक्का",
            "Soybean": "सोयाबीन", "Chilli": "मिर्च", "Tobacco": "तंबाकू",
            "Pulses": "दालें"
        },
        "pa": {
            "Wheat": "ਕਣਕ", "Paddy": "ਝੋਨਾ", "Sugarcane": "ਗੰਨਾ",
            "Cotton": "ਕਪਾਹ", "Mustard": "ਸਰ੍ਹੋਂ", "Maize": "ਮੱਕੀ",
            "Soybean": "ਸੋਇਆਬੀਨ", "Chilli": "ਮਿਰਚ", "Tobacco": "ਤੰਬਾਕੂ",
            "Pulses": "ਦਾਲਾਂ"
        }
    }

    @staticmethod
    def generate_advisory(
        village_id: str,
        crop: str,
        weather: Dict[str, Any],
        lang: str = "en"
    ) -> Dict[str, Any]:
        crop_clean = crop.strip().title()
        temp = weather.get("temperature", 28.0)
        humidity = weather.get("relative_humidity", 60.0)
        rain_prob = weather.get("rain_probability", 20.0)
        wind_speed = weather.get("wind_speed", 10.0)
        precip = weather.get("precipitation", 0.0)

        crop_display = AdvisoryAgent.CROP_NAMES.get(lang, {}).get(crop_clean, crop_clean)

        # 1. Irrigation recommendation
        if rain_prob > 60.0 or precip > 2.0:
            risk = "MODERATE" if rain_prob < 80 else "HIGH"
            if lang == "hi":
                irrigation_advice = f"{crop_display} के लिए सिंचाई स्थगित करें। प्राकृतिक बारिश की उच्च संभावना ({rain_prob:.0f}%) है, जिससे पंप की बिजली बचेगी और खेत में जलभराव नहीं होगा।"
            elif lang == "pa":
                irrigation_advice = f"{crop_display} ਲਈ ਸਿੰਚਾਈ ਰੋਕੋ। ਕੁਦਰਤੀ ਮੀਂਹ ਦੀ ਉੱਚ ਸੰਭਾਵਨਾ ({rain_prob:.0f}%) ਹੈ, ਜਿਸ ਨਾਲ ਪੰਪ ਦੀ ਬਿਜਲੀ ਬਚੇਗੀ ਅਤੇ ਖੇਤ ਵਿੱਚ ਪਾਣੀ ਨਹੀਂ ਖੜ੍ਹੇਗਾ।"
            else:
                irrigation_advice = f"Postpone irrigation for {crop_clean}. High probability of natural rainfall ({rain_prob:.0f}%), saving pump energy and avoiding soil saturation."
        elif temp > 35.0 and humidity < 40.0:
            risk = "MODERATE"
            if lang == "hi":
                irrigation_advice = f"उच्च वाष्पीकरण दर्ज किया गया ({temp:.1f}°C)। फसल को नमी संकट से बचाने के लिए शाम को हल्की सिंचाई या ड्रिप सिंचाई करें।"
            elif lang == "pa":
                irrigation_advice = f"ਵਾਸ਼ਪੀਕਰਨ ਜ਼ਿਆਦਾ ਦਰਜ ਹੋਇਆ ({temp:.1f}°C)। ਫ਼ਸਲ ਨੂੰ ਨਮੀ ਦੇ ਤਣਾਅ ਤੋਂ ਬਚਾਉਣ ਲਈ ਸ਼ਾਮ ਨੂੰ ਹਲਕੀ ਸਿੰਚਾਈ ਕਰੋ।"
            else:
                irrigation_advice = f"High evapotranspiration detected ({temp:.1f}°C). Provide light evening irrigation or drip watering to prevent crop moisture stress."
        else:
            risk = "LOW"
            if lang == "hi":
                irrigation_advice = f"{crop_display} के लिए सामान्य सिंचाई कार्यक्रम उपयुक्त है। मिट्टी में नमी की कमी की दर सामान्य है।"
            elif lang == "pa":
                irrigation_advice = f"{crop_display} ਲਈ ਆਮ ਸਿੰਚਾਈ ਸਮਾਂ-ਸਾਰਣੀ ਢੁਕਵੀਂ ਹੈ। ਮਿੱਟੀ ਵਿੱਚ ਨਮੀ ਦੀ ਕਮੀ ਆਮ ਹੈ।"
            else:
                irrigation_advice = f"Normal irrigation schedule suitable for {crop_clean}. Soil moisture depletion rate is moderate."

        # 2. Pesticide / Chemical spraying
        if wind_speed > 16.0:
            if lang == "hi":
                spraying_advice = f"पत्तियों पर छिड़काव न करें! हवा की गति ({wind_speed:.1f} किमी/घंटा) सुरक्षित सीमा से अधिक है; दवा उड़ने से नुकसान होगा।"
            elif lang == "pa":
                spraying_advice = f"ਪੱਤਿਆਂ 'ਤੇ ਛਿੜਕਾਅ ਨਾ ਕਰੋ! ਹਵਾ ਦੀ ਰਫ਼ਤਾਰ ({wind_speed:.1f} km/h) ਸੁਰੱਖਿਅਤ ਸੀਮਾ ਤੋਂ ਵੱਧ ਹੈ; ਦਵਾਈ ਉੱਡਣ ਦਾ ਖ਼ਤਰਾ ਹੈ।"
            else:
                spraying_advice = f"Avoid foliar spraying! Wind speed ({wind_speed:.1f} km/h) exceeds spray safety threshold; chemical drift will cause loss."
        elif rain_prob > 50.0:
            if lang == "hi":
                spraying_advice = f"कीटनाशक या फफूंदनाशक का छिड़काव रोकें। संभावित बारिश ({rain_prob:.0f}%) से दवा धुलने का खतरा है।"
            elif lang == "pa":
                spraying_advice = f"ਕੀਟਨਾਸ਼ਕ ਜਾਂ ਉੱਲੀਨਾਸ਼ਕ ਦਾ ਛਿੜਕਾਅ ਰੋਕੋ। ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ ({rain_prob:.0f}%) ਕਾਰਨ ਦਵਾਈ ਧੁਲ ਸਕਦੀ ਹੈ।"
            else:
                spraying_advice = f"Hold off on pesticide or fungicide applications. Anticipated precipitation ({rain_prob:.0f}%) risks chemical wash-off."
        else:
            if lang == "hi":
                spraying_advice = f"कीटनाशक/सूक्ष्म पोषक तत्वों के छिड़काव के लिए मौसम अनुकूल है। हवा शांत ({wind_speed:.1f} किमी/घंटा) है और दवा धुलने का खतरा नहीं है।"
            elif lang == "pa":
                spraying_advice = f"ਕੀਟਨਾਸ਼ਕ ਅਤੇ ਪੋਸ਼ਕ ਤੱਤਾਂ ਦੇ ਛਿੜਕਾਅ ਲਈ ਮੌਸਮ ਬਿਲਕੁਲ ਢੁਕਵਾਂ ਹੈ। ਹਵਾ ਸ਼ਾਂਤ ({wind_speed:.1f} km/h) ਹੈ।"
            else:
                spraying_advice = f"Weather conditions optimal for pesticide/micronutrient spraying. Wind is calm ({wind_speed:.1f} km/h) with low wash-off risk."

        # 3. Harvesting & Storage
        if rain_prob > 65.0:
            if lang == "hi":
                harvesting_advice = f"यदि {crop_display} की फसल पक चुकी है, तो कटाई तेज करें और कटी फसल को तुरंत तिरपाल से ढके सूखे स्थान पर रखें।"
            elif lang == "pa":
                harvesting_advice = f"ਜੇਕਰ {crop_display} ਪੱਕ ਚੁੱਕੀ ਹੈ, ਤਾਂ ਵਾਢੀ ਤੇਜ਼ ਕਰੋ ਅਤੇ ਤੁਰੰਤ ਤਰਪਾਲ ਹੇਠਾਂ ਸੁੱਕੀ ਜਗ੍ਹਾ ਰੱਖੋ।"
            else:
                harvesting_advice = f"If {crop_clean} is at harvest maturity, accelerate cutting and immediately transfer grain/produce to tarpaulin-covered dry storage."
        else:
            if lang == "hi":
                harvesting_advice = f"कटाई, गहाई और खलिहान में धूप में सुखाने के लिए मौसम बहुत अनुकूल और सूखा है।"
            elif lang == "pa":
                harvesting_advice = f"ਫ਼ਸਲ ਦੀ ਵਾਢੀ, ਗਹਾਈ ਅਤੇ ਸੁਕਾਉਣ ਲਈ ਮੌਸਮ ਸਾਫ਼ ਅਤੇ ਅਨੁਕੂਲ ਹੈ।"
            else:
                harvesting_advice = f"Favorable dry weather for cutting, threshing, and open yard sun-drying of harvest."

        # 4. Fertilizer application
        if rain_prob > 60.0:
            if lang == "hi":
                fertilizer_advice = f"यूरिया/नाइट्रोजन उर्वरक का छिड़काव टालें। बारिश के पानी के बहाव से पोषक तत्व बह जाएंगे।"
            elif lang == "pa":
                fertilizer_advice = f"ਯੂਰੀਆ/ਨਾਈਟ੍ਰੋਜਨ ਖਾਦ ਪਾਉਣਾ ਟਾਲੋ। ਸੰਭਾਵਿਤ ਮੀਂਹ ਦੇ ਵਹਾਅ ਨਾਲ ਖਾਦ ਵਹਿ ਜਾਵੇਗੀ।"
            else:
                fertilizer_advice = f"Delay top-dressing of Urea/Nitrogen fertilizers. Surface runoff from expected rain will lead to nutrient leaching."
        else:
            if lang == "hi":
                fertilizer_advice = f"उर्वरक एवं पोषक तत्व देने के लिए अनुकूल एवं सुरक्षित समय है।"
            elif lang == "pa":
                fertilizer_advice = f"ਖਾਦ ਅਤੇ ਖੁਰਾਕੀ ਤੱਤ ਪਾਉਣ ਲਈ ਸੁਰੱਖਿਅਤ ਸਮਾਂ ਹੈ।"
            else:
                fertilizer_advice = f"Safe window for basal and top-dressing nutrient management."

        if lang == "hi":
            summary = f"गाँव मौसम: {temp:.1f}°C, {humidity:.0f}% आर्द्रता, {rain_prob:.0f}% बारिश संभावना, हवा {wind_speed:.1f} किमी/घं।"
        elif lang == "pa":
            summary = f"ਪਿੰਡ ਮੌਸਮ: {temp:.1f}°C, {humidity:.0f}% ਨਮੀ, {rain_prob:.0f}% ਮੀਂਹ ਸੰਭਾਵਨਾ, ਹਵਾ {wind_speed:.1f} km/h."
        else:
            summary = f"Village weather: {temp:.1f}°C, {humidity:.0f}% RH, {rain_prob:.0f}% rain prob, wind {wind_speed:.1f} km/h."

        return {
            "village_id": village_id,
            "crop": crop_clean,
            "weather_summary": summary,
            "irrigation_advice": irrigation_advice,
            "spraying_advice": spraying_advice,
            "harvesting_advice": harvesting_advice,
            "fertilizer_advice": fertilizer_advice,
            "risk_level": risk,
            "generated_at": datetime.utcnow().isoformat()
        }
