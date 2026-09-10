/**
 * GramWeather AI - Multilingual Dictionary
 * Complete localization support for English (en), Hindi (hi), and Punjabi (pa).
 */

export const TRANSLATIONS = {
  en: {
    // Header & Nav
    brandTitle: "GramWeather AI",
    brandSubtitle: "Hyperlocal Village Intelligence",
    navMonsoon: "Monsoon",
    monsoonScreenTitle: "Monsoon Onset & Break Prediction System",
    monsoonScreenSub: "Hyperlocal Block/Village Scale Intelligence",
    cardOnsetWindow: "Onset Window",
    climatologicalNormal: "Climatological normal",
    cardBreakRisk: "Break & Dry-Spell Risk",
    breakRiskNext7d: "Break risk next 7 days",
    rainOutlook7d: "7-day rain outlook",
    drySpellIndexLast7d: "Dry-spell index (last 7d)",
    cardConfidence: "Confidence Heuristic",
    cardAdvisory: "Agricultural Decision Advisory",
    sowingStrategy: "Sowing Strategy",
    irrigationSchedule: "Irrigation Schedule",
    monsoonFooter: "Data: Open-Meteo (live) · IMD isochrone climatology (approximate) · Confidence is a heuristic, not a calibrated probability.",
    navDashboard: "Dashboard",
    navVerification: "Verification Lab",
    navAdvisory: "AI Advisory",
    navAlerts: "Alerts",
    btnReportWeather: "Report Weather",
    demoPresetLabel: "Demo:",
    demoNormal: "Normal (Live)",
    demoAgreement: "Scenario A: Agreement",
    demoConflict: "Scenario B: Conflict",
    bannerSihId: "SIH26086",
    bannerTitle: "Hyperlocal Monsoon Onset & Break Prediction System",
    bannerTeam: "• Team TechDynamics",
    bannerTagline: "“Weather Apps Forecast. GramWeather AI Verifies.”",
    villageElevation: "Elevation",
    villageDistrict: "District",
    villageBlock: "Block",
    primaryCrops: "Crops",
    chamberState: "State",
    chamberBlock: "Block",
    chamberVillage: "Village",
    chamber1Label: "Chamber 1: State",
    chamber2Label: "Chamber 2: Block",
    chamber3Label: "Chamber 3: Village",
    selectState: "Select State",
    selectBlock: "Select Block",
    selectVillage: "Select Village",
    threeChamberTitle: "3-Chamber Location Selection",
    threeChamberSubtitle: "State ➔ Block ➔ Village",
    changeLocation: "Change Location",
    locationConfirmed: "Active Village Location",

    // Hero Weather
    feelsLike: "Feels like",
    updatedLive: "Updated live",
    rainSystemActive: "Rain System Active",
    stableWeatherWindow: "Stable Atmospheric Window",
    relativeHumidity: "Relative Humidity",
    rainProbability: "Rain Probability",
    windVelocity: "Wind Velocity",
    surfacePressure: "Surface Pressure",

    // Monsoon Onset & Break Card
    monsoonCardBadge: "Monsoon Intelligence",
    monsoonCardScale: "Block / Village Scale",
    monsoonCardTitle: "Monsoon Onset Window & Break Risk Outlook",
    monsoonOnsetWindow: "Monsoon Onset Window",
    monsoonBreakRisk: "Dry Spell / Break Risk",
    breakProbability: "Break Probability",
    consecutiveWetDays: "Consecutive Wet Days",
    sowingStrategyTitle: "Sowing Strategy Advisory",
    scientificIndicatorsTitle: "Scientific Onset Indicators (IMD & ISRO MOSDAC Benchmarks)",

    // 8-Direction Compass
    compassTitle: "8-Direction Weather Radar",
    compassSub: "Directional rain probabilities derived from spatial NWP gradient & wind vector. Click a cardinal point to inspect.",
    rainLikelihood: "Rain Likelihood",
    rainCell: "Rain Cell",
    vector: "Vector",
    eta: "ETA",
    bearing: "Bearing",

    // Cloud Movement
    cloudMovementTitle: "Cloud Movement Vector",
    origin: "ORIGIN",
    trajectory: "TRAJECTORY",
    upwind: "Upwind",
    downwind: "Downwind",
    cloudDensity: "Cloud Density",

    // Confidence Meter
    confidenceTitle: "Village Weather Confidence",
    certainty: "Certainty",
    confidenceDesc: "Multi-source consensus derived from local IoT sensors, nearby farmer reports, and Open-Meteo NWP models.",
    sensorsOnline: "Sensors Online",
    microStations: "Micro-Stations",
    farmerReportsActive: "Active Reports",
    statusVerified: "VERIFIED",
    statusConflict: "CONFLICT",
    statusUnverified: "UNVERIFIED",
    statusModerate: "MODERATE",

    // AI Farming Advisory
    advisoryTitle: "AI Farming Advisory Engine",
    advisorySubtitle: "Empowering farmers with hyperlocal, crop-specific timing for irrigation, spraying, and harvest protection.",
    riskLevel: "Risk",
    irrigationStrategy: "Irrigation Strategy",
    sprayingWindow: "Spraying Safety Window",
    harvestingStorage: "Harvesting & Storage",
    nutrientManagement: "Nutrient Management & Top-Dressing",
    voiceReadout: "Voice Readout",
    speaking: "Speaking...",
    advisoryDisclaimer: "Calibrated with Open-Meteo microclimate parameters and ICAR agricultural guidelines.",
    honestLabel: "Rule-based ICAR advisory, not expert instruction.",

    // Feed & Observations
    feedTitle: "Village Observations Feed",
    feedSub: "Farmer and community reports verified against local IoT sensors and NWP model telemetry.",
    addReport: "Add Report",
    reportedBy: "Reported by",
    inspectEvidence: "Inspect Evidence",
    confidence: "Confidence",
    noObservations: "No local observations logged yet today.",

    // Report Weather Modal
    modalTitle: "Report Local Weather",
    voiceInputBadge: "Multilingual & Voice-First",
    voicePrompt: "FARMER VOICE SPEECH INPUT (CLICK TO SIMULATE VOICE)",
    voiceSample1: "Dark clouds are coming from the southwest, and the weather feels humid.",
    voiceSample2: "Heavy rain started 15 mins ago, fields filling fast.",
    step1SelectEvent: "1. SELECT OBSERVED WEATHER EVENT",
    intensityLabel: "INTENSITY",
    sinceWhenLabel: "SINCE WHEN?",
    namePlaceholder: "Your Name / Farm Location (e.g. Jaswant Singh, North Field)",
    descPlaceholder: "Optional description (e.g. Drizzle started near pond, puddles forming fast)",
    btnSubmitReport: "Submit Village Observation",
    submitting: "Submitting to AI Pipeline...",
    reportSuccess: "Report submitted successfully! Now pending cross-verification.",

    // Verification Lab
    verificationTitle: "Verification Engine",
    verificationSub: "Core Innovation: Human-in-the-loop cross-verification before fusing village weather state.",
    demoPreset: "Demo Preset:",
    selectObsToExamine: "Select Observation to Cross-Examine:",
    evaluatedObs: "Evaluated Observation",
    concordanceScore: "Concordance Score",
    actionImplication: "Action Implication",
    evidenceMatrixTitle: "Independent Evidence Concordance Matrix",
    colSource: "Data Source Layer",
    colTelemetry: "Observed Telemetry",
    colConcordance: "Concordance",
    colWeight: "Model Weight",
    colDetail: "Verification Detail",
    colClass: "Classification",
    agrees: "Agrees",
    conflicts: "Conflicts",

    // Closed Loop
    learningLoopTitle: "Closed-Loop Learning & Bias Correction",
    learningLoopSub: "Predict → Listen → Compare → Verify → Correct → Explain → Learn",
    maeLabel: "Mean Absolute Error (MAE)",
    calibrationLabel: "Model Calibration Score",
    activeModelLabel: "Active Village Model",
    recentEvalTitle: "Recent Prediction vs Actual Weather Evaluations",
    colEvalWindow: "Evaluation Window",
    colPredictedProb: "Predicted Prob",
    colActualEvent: "Actual Rain Event",
    colError: "Prediction Error",
    colBiasCorrection: "Bias Correction Applied",
    colStatus: "Verification",
    researchCitationsTitle: "Research Basis & Methodological Citations",

    // Alerts Screen & Card
    alertsTitle: "Early Warning & Alert Dispatch",
    alertsSub: "Active meteorological alerts and urgent protective actions for",
    actionRequired: "Action Required",
    immediateAction: "Immediate Action",
    triggerMetric: "Trigger Metric",
    noAlerts: "No active severe weather warnings for this village.",
    demoInjectAlert: "Demo: Inject Alert",
    demoClearAlert: "Clear Demo Alert",

    // History Screen
    historyTitle: "Historical Weather & CHIRPS Baseline",
    historySub: "Comparing recent multi-day village rainfall against multi-year satellite benchmarks.",
    chirpsNormal: "Satellite Climate Normal (CHIRPS v2.0)",
    avgMonthlyRain: "Average Monthly Rainfall",
    sevenDayTrend: "7-Day Rainfall & Temperature Trend",
    dry: "Dry",
    statusLabel: "Status",
    citationLabel: "Citation",

    // Common labels
    connecting: "Connecting to village atmospheric telemetry...",
    villageMapTitle: "Village Spatial Micro-Grid",
    villageMapSub: "Spatial mapping of village center, local IoT sensor nodes, and incoming weather systems.",
    liveBadge: "LIVE",
    simulatedBadge: "SIMULATED",
    pending: "PENDING",
    verified: "VERIFIED",
    conflict: "CONFLICT",
    unverified: "UNVERIFIED",
    yes: "Yes",
    noRain: "No Rain",
    light: "Light",
    moderate: "Moderate",
    heavy: "Heavy",
    justNow: "Just now",
    minsAgo15: "15 mins ago",
    minsAgo30: "30 mins ago",
    hourAgo1: "1 hour ago",

    // Crops
    cropWheat: "Wheat",
    cropPaddy: "Paddy (Rice)",
    cropSugarcane: "Sugarcane",
    cropCotton: "Cotton",
    cropMustard: "Mustard",
    cropMaize: "Maize",
    cropSoybean: "Soybean",
    cropChilli: "Chilli",
    cropTobacco: "Tobacco",
    cropPulses: "Pulses",

    // Weather Conditions
    condClear: "Clear Sky",
    condMainlyClear: "Mainly Clear",
    condPartlyCloudy: "Partly Cloudy",
    condOvercast: "Overcast",
    condRainShowers: "Rain Showers",
    condHeavyRain: "Heavy Rain",
    condThunderstorm: "Thunderstorm",
    condHail: "Hail Storm",
    condStrongWind: "Strong Wind",
    condCloudy: "Cloudy",
  },

  hi: {
    // Header & Nav
    brandTitle: "ग्रामवेदर एआई",
    brandSubtitle: "गाँव स्तरीय मौसम बुद्धिमत्ता",
    navMonsoon: "मानसून",
    monsoonScreenTitle: "मानसून आगमन एवं ड्राई स्पेल (रुकावट) भविष्यवाणी प्रणाली",
    monsoonScreenSub: "अति-स्थानीय ब्लॉक/गाँव स्तरीय बुद्धिमत्ता",
    cardOnsetWindow: "मानसून आगमन अवधि",
    climatologicalNormal: "जलवायु सामान्य तिथि",
    cardBreakRisk: "सूखा एवं मानसून रुकावट जोखिम",
    breakRiskNext7d: "अगले 7 दिनों में रुकावट जोखिम",
    rainOutlook7d: "7-दिवसीय वर्षा पूर्वानुमान",
    drySpellIndexLast7d: "ड्राई स्पेल सूचकांक (पिछले 7 दिन)",
    cardConfidence: "अनुमानित विश्वास स्कोर",
    cardAdvisory: "कृषि निर्णय सलाह",
    sowingStrategy: "बुवाई रणनीति",
    irrigationSchedule: "सिंचाई योजना",
    monsoonFooter: "डेटा स्रोत: ओपन-मेटियो (लाइव) · मौसम विभाग IMD आइसोक्रोन (अनुमानित) · विश्वास स्कोर गणितीय अनुमान है, कोई कैलिब्रेटेड संभावना नहीं।",
    navDashboard: "डैशबोर्ड",
    navVerification: "सत्यापन लैब",
    navAdvisory: "कृषि सलाह",
    navAlerts: "चेतावनी",
    btnReportWeather: "मौसम दर्ज करें",
    demoPresetLabel: "डेमो मोड:",
    demoNormal: "सामान्य (लाइव)",
    demoAgreement: "परिदृश्य A: सहमति (वेरिफाइड)",
    demoConflict: "परिदृश्य B: विरोधाभास (अनिश्चित)",
    bannerSihId: "SIH26086",
    bannerTitle: "अति-स्थानीय मानसून आगमन एवं ड्राई स्पेल (रुकावट) भविष्यवाणी प्रणाली",
    bannerTeam: "• टीम टेक-डायनामिक्स",
    bannerTagline: "“मौसम ऍप्स अनुमान लगाते हैं। ग्रामवेदर एआई सत्यापन करता है।”",
    villageElevation: "ऊंचाई",
    villageDistrict: "ज़िला",
    villageBlock: "ब्लॉक",
    primaryCrops: "प्रमुख फसलें",
    chamberState: "राज्य",
    chamberBlock: "ब्लॉक",
    chamberVillage: "गाँव",
    chamber1Label: "चेंबर 1: राज्य",
    chamber2Label: "चेंबर 2: ब्लॉक",
    chamber3Label: "चेंबर 3: गाँव",
    selectState: "राज्य चुनें",
    selectBlock: "ब्लॉक चुनें",
    selectVillage: "गाँव चुनें",
    threeChamberTitle: "3-स्तरीय स्थान चयन",
    threeChamberSubtitle: "राज्य ➔ ब्लॉक ➔ गाँव",
    changeLocation: "स्थान बदलें",
    locationConfirmed: "सक्रिय गाँव स्थान",

    // Hero Weather
    feelsLike: "महसूस होता है",
    updatedLive: "सीधा अपडेट",
    rainSystemActive: "वर्षा प्रणाली सक्रिय है",
    stableWeatherWindow: "शांत एवं अनुकूल मौसम",
    relativeHumidity: "सापेक्ष आर्द्रता (नमी)",
    rainProbability: "बारिश की संभावना",
    windVelocity: "हवा की गति",
    surfacePressure: "सतही वायुमंडलीय दबाव",

    // Monsoon Onset & Break Card
    monsoonCardBadge: "मानसून बुद्धिमत्ता",
    monsoonCardScale: "ब्लॉक / गाँव स्तर",
    monsoonCardTitle: "मानसून आगमन समय-सीमा एवं रुकावट (ड्राई स्पेल) जोखिम",
    monsoonOnsetWindow: "मानसून आगमन अवधि",
    monsoonBreakRisk: "सूखा / मानसून रुकावट जोखिम",
    breakProbability: "रुकावट की संभावना",
    consecutiveWetDays: "लगातार वर्षा के दिन",
    sowingStrategyTitle: "बुवाई रणनीति सलाह",
    scientificIndicatorsTitle: "वैज्ञानिक आगमन संकेतक (मौसम विभाग IMD एवं इसरो MOSDAC मानक)",

    // 8-Direction Compass
    compassTitle: "8-दिशा मौसम रडार",
    compassSub: "हवा के रुख एवं क्षेत्रीय उपग्रह मॉडल से आकलित 8 दिशाओं में बारिश की संभावना। किसी भी दिशा पर क्लिक करें।",
    rainLikelihood: "बारिश की संभावना",
    rainCell: "वर्षा बादल दूरी",
    vector: "दिशा गति",
    eta: "पहुंचने का समय",
    bearing: "डिग्री",

    // Cloud Movement
    cloudMovementTitle: "बादलों की गति व दिशा",
    origin: "प्रारंभ दिशा",
    trajectory: "प्रवाह दिशा",
    upwind: "हवा की ओर",
    downwind: "हवा के बहाव में",
    cloudDensity: "बादलों का घनत्व",

    // Confidence Meter
    confidenceTitle: "गाँव मौसम सत्यता स्कोर",
    certainty: "सत्यता निश्चितता",
    confidenceDesc: "स्थानीय IoT सेंसर, पास के किसानों की रिपोर्ट और मौसम मॉडल के मिलान से निकाला गया संयुक्त स्कोर।",
    sensorsOnline: "सक्रिय सेंसर",
    microStations: "माइक्रो-स्टेशन",
    farmerReportsActive: "सक्रिय रिपोर्ट",
    statusVerified: "सत्यापित (VERIFIED)",
    statusConflict: "विरोधाभासी (CONFLICT)",
    statusUnverified: "अपुष्ट (UNVERIFIED)",
    statusModerate: "मध्यम",

    // AI Farming Advisory
    advisoryTitle: "एआई किसान कृषि सलाह इंजन",
    advisorySubtitle: "किसानों को सिंचाई, छिड़काव और फसल सुरक्षा के लिए सटीक समय की जानकारी देना।",
    riskLevel: "जोखिम",
    irrigationStrategy: "सिंचाई प्रबंधन सलाह",
    sprayingWindow: "कीटनाशक छिड़काव खिड़की",
    harvestingStorage: "कटाई एवं भंडारण सुरक्षा",
    nutrientManagement: "उर्वरक एवं पोषक तत्व प्रबंधन",
    voiceReadout: "आवाज में सुनें",
    speaking: "बोल रहा है...",
    advisoryDisclaimer: "ओपन-मेटियो स्थानीय आंकड़ों एवं आईसीएआर (ICAR) कृषि मानकों द्वारा प्रमाणित।",
    honestLabel: "नियम-आधारित आईसीएआर (ICAR) कृषि सलाह, विशेषज्ञ निर्देश नहीं।",

    // Feed & Observations
    feedTitle: "गाँव किसान मौसम रिपोर्ट फ़ीड",
    feedSub: "स्थानीय किसानों और समुदाय द्वारा दर्ज की गई रिपोर्ट, जिनकी सेंसर से पुष्टि की जाती है।",
    addReport: "रिपोर्ट जोड़ें",
    reportedBy: "द्वारा रिपोर्ट",
    inspectEvidence: "सबूत की जाँच करें",
    confidence: "सत्यता स्कोर",
    noObservations: "आज अभी तक कोई नई किसान रिपोर्ट दर्ज नहीं है।",

    // Report Weather Modal
    modalTitle: "गाँव का मौसम दर्ज करें",
    voiceInputBadge: "बहुभाषी एवं आवाज-सक्षम",
    voicePrompt: "किसान आवाज इनपुट (आवाज का परीक्षण करने के लिए क्लिक करें)",
    voiceSample1: "दक्षिण-पश्चिम से घने काले बादल आ रहे हैं और मौसम में बहुत उमस है।",
    voiceSample2: "15 मिनट पहले मूसलाधार बारिश शुरू हुई है, खेतों में पानी भरने लगा है।",
    step1SelectEvent: "1. आप क्या मौसम देख रहे हैं?",
    intensityLabel: "तीव्रता",
    sinceWhenLabel: "कब से?",
    namePlaceholder: "आपका नाम / खेत का स्थान (उदा. जसविंदर सिंह, उत्तरी खेत)",
    descPlaceholder: "अतिरिक्त विवरण (उदा. तालाब के पास तेज बारिश, खेत में पानी भर रहा है)",
    btnSubmitReport: "गाँव मौसम रिपोर्ट सबमिट करें",
    submitting: "सत्यापन के लिए भेजा जा रहा है...",
    reportSuccess: "रिपोर्ट सफलतापूर्वक सबमिट हो गई! अब इसकी पुष्टि की जा रही है।",

    // Verification Lab
    verificationTitle: "मौसम सत्यापन इंजन",
    verificationSub: "मुख्य नवाचार: किसान रिपोर्ट को बिना सोचे-समझे सच मानने के बजाय 3 स्वतंत्र स्रोतों से जांचना।",
    demoPreset: "डेमो परिदृश्य चुनें:",
    selectObsToExamine: "जाँच के लिए रिपोर्ट चुनें:",
    evaluatedObs: "जांची जा रही किसान रिपोर्ट",
    concordanceScore: "सहमति स्कोर",
    actionImplication: "कृषि कार्रवाई निर्देश",
    evidenceMatrixTitle: "स्वतंत्र डेटा स्रोतों का मिलान मैट्रिक्स",
    colSource: "डेटा स्रोत स्तर",
    colTelemetry: "मापा गया डेटा",
    colConcordance: "सहमति",
    colWeight: "मॉडल वेटेज",
    colDetail: "विस्तृत विवरण",
    colClass: "श्रेणी",
    agrees: "सहमत है ✓",
    conflicts: "विरोधाभास ✗",

    // Closed Loop
    learningLoopTitle: "क्लोज्ड-लूप लर्निंग एवं बायस सुधार",
    learningLoopSub: "पूर्वानुमान → सुनें → तुलना करें → सत्यापित करें → सुधारें → समझाएं → सीखें",
    maeLabel: "औसत त्रुटि (MAE)",
    calibrationLabel: "मॉडल कैलिब्रेशन स्कोर",
    activeModelLabel: "सक्रिय गाँव मॉडल",
    recentEvalTitle: "हालिया पूर्वानुमान बनाम वास्तविक मौसम मूल्यांकन",
    colEvalWindow: "मूल्यांकन अवधि",
    colPredictedProb: "अनुमानित संभावना",
    colActualEvent: "वास्तविक बारिश",
    colError: "त्रुटि अंतर",
    colBiasCorrection: "लागू किया गया सुधार",
    colStatus: "सत्यापन",
    researchCitationsTitle: "अनुसंधान आधार एवं वैज्ञानिक संदर्भ",

    // Alerts Screen & Card
    alertsTitle: "प्रारंभिक चेतावनी एवं सतर्कता प्रणाली",
    alertsSub: "मौसम संबंधी चेतावनियां एवं जरूरी सुरक्षा उपाय -",
    actionRequired: "कार्रवाई निर्देश",
    immediateAction: "तत्काल कार्रवाई",
    triggerMetric: "ट्रिगर मीट्रिक",
    noAlerts: "इस गाँव के लिए कोई गंभीर मौसम चेतावनी सक्रिय नहीं है।",
    demoInjectAlert: "डेमो: चेतावनी इंजेक्ट करें",
    demoClearAlert: "डेमो चेतावनी हटाएं",


    // History Screen
    historyTitle: "ऐतिहासिक मौसम एवं CHIRPS आधार रेखा",
    historySub: "हाल के दिनों की बारिश की तुलना उपग्रह के बहु-वर्षीय सामान्य आंकड़ों से।",
    chirpsNormal: "उपग्रह जलवायु सामान्य (CHIRPS v2.0)",
    avgMonthlyRain: "औसत मासिक वर्षा",
    sevenDayTrend: "7-दिवसीय वर्षा एवं तापमान का रुझान",
    dry: "सूखा",
    statusLabel: "स्थिति",
    citationLabel: "संदर्भ",

    // Common labels
    connecting: "गाँव के मौसम संबंधी आंकड़ों से कनेक्ट हो रहा है...",
    villageMapTitle: "गाँव स्थानिक माइक्रो-ग्रिड",
    villageMapSub: "गाँव के केंद्र, स्थानीय IoT सेंसर नोड्स और आने वाले मौसम की मैपिंग।",
    liveBadge: "लाइव",
    simulatedBadge: "सिम्युलेटेड",
    pending: "प्रतीक्षारत (PENDING)",
    verified: "सत्यापित (VERIFIED)",
    conflict: "विरोधाभासी (CONFLICT)",
    unverified: "अपुष्ट (UNVERIFIED)",
    yes: "हाँ",
    noRain: "बारिश नहीं",
    light: "हल्की",
    moderate: "मध्यम",
    heavy: "तेज़",
    justNow: "अभी-अभी",
    minsAgo15: "15 मिनट पहले",
    minsAgo30: "30 मिनट पहले",
    hourAgo1: "1 घंटा पहले",

    // Crops
    cropWheat: "गेहूं (Wheat)",
    cropPaddy: "धान (Paddy)",
    cropSugarcane: "गन्ना (Sugarcane)",
    cropCotton: "कपास (Cotton)",
    cropMustard: "सरसों (Mustard)",
    cropMaize: "मक्का (Maize)",
    cropSoybean: "सोयाबीन (Soybean)",
    cropChilli: "मिर्च (Chilli)",
    cropTobacco: "तंबाकू (Tobacco)",
    cropPulses: "दालें (Pulses)",

    // Weather Conditions
    condClear: "साफ़ आसमान",
    condMainlyClear: "मुख्यतः साफ़",
    condPartlyCloudy: "आंशिक बादल",
    condOvercast: "घने बादल",
    condRainShowers: "बारिश की बौछारें",
    condHeavyRain: "भारी बारिश",
    condThunderstorm: "गरज-चमक के साथ बारिश",
    condHail: "ओलावृष्टि (Hail)",
    condStrongWind: "तेज हवा / आंधी",
    condCloudy: "बादल छाए हैं",
  },

  pa: {
    // Header & Nav
    brandTitle: "ਗ੍ਰਾਮਵੈਦਰ ਏ.ਆਈ",
    brandSubtitle: "ਪਿੰਡ ਪੱਧਰੀ ਮੌਸਮ ਬੁੱਧੀਮਤਾ",
    navMonsoon: "ਮਾਨਸੂਨ",
    monsoonScreenTitle: "ਮਾਨਸੂਨ ਆਮਦ ਅਤੇ ਡ੍ਰਾਈ ਸਪੈੱਲ ਭਵਿੱਖਬਾਣੀ ਪ੍ਰਣਾਲੀ",
    monsoonScreenSub: "ਅਤਿ-ਸਥਾਨਕ ਬਲਾਕ/ਪਿੰਡ ਪੱਧਰੀ ਬੁੱਧੀਮਤਾ",
    cardOnsetWindow: "ਮਾਨਸੂਨ ਆਮਦ ਸਮਾਂ",
    climatologicalNormal: "ਜਲਵਾਯੂ ਆਮ ਮਿਤੀ",
    cardBreakRisk: "ਸੋਕਾ ਅਤੇ ਮੀਂਹ ਰੁਕਣ ਦਾ ਖ਼ਤਰਾ",
    breakRiskNext7d: "ਅਗਲੇ 7 ਦਿਨਾਂ ਵਿੱਚ ਸੁੱਕੇ ਦਾ ਖ਼ਤਰਾ",
    rainOutlook7d: "7-ਦਿਨਾਂ ਮੀਂਹ ਪੂਰਵ ਅਨੁਮਾਨ",
    drySpellIndexLast7d: "ਡ੍ਰਾਈ ਸਪੈੱਲ ਸੂਚਕ (ਪਿਛਲੇ 7 ਦਿਨ)",
    cardConfidence: "ਅੰਦਾਜ਼ਨ ਵਿਸ਼ਵਾਸ ਸਕੋਰ",
    cardAdvisory: "ਖੇਤੀਬਾੜੀ ਫ਼ੈਸਲਾ ਸਲਾਹ",
    sowingStrategy: "ਬਿਜਾਈ ਰਣਨੀਤੀ",
    irrigationSchedule: "ਸਿੰਚਾਈ ਸਮਾਂ-ਸਾਰਣੀ",
    monsoonFooter: "ਡੇਟਾ ਸਰੋਤ: ਓਪਨ-ਮੇਟੀਓ (ਲਾਈਵ) · ਮੌਸਮ ਵਿਭਾਗ IMD ਆਈਸੋਕ੍ਰੋਨ (ਅੰਦਾਜ਼ਨ) · ਵਿਸ਼ਵਾਸ ਸਕੋਰ ਅਨੁਮਾਨ ਹੈ।",
    navDashboard: "ਡੈਸ਼ਬੋਰਡ",
    navVerification: "ਤਸਦੀਕ ਲੈਬ",
    navAdvisory: "ਖੇਤੀ ਸਲਾਹ",
    navAlerts: "ਚੇਤਾਵਨੀਆਂ",
    btnReportWeather: "ਮੌਸਮ ਦਰਜ ਕਰੋ",
    demoPresetLabel: "ਡੈਮੋ ਮੋਡ:",
    demoNormal: "ਆਮ (ਲਾਈਵ)",
    demoAgreement: "ਸੀਨ A: ਸਹਿਮਤੀ (ਤਸਦੀਕਸ਼ੁਦਾ)",
    demoConflict: "ਸੀਨ B: ਟਕਰਾਅ (ਅਨਿਸ਼ਚਿਤ)",
    bannerSihId: "SIH26086",
    bannerTitle: "ਪਿੰਡ ਪੱਧਰੀ ਮਾਨਸੂਨ ਆਮਦ ਅਤੇ ਡ੍ਰਾਈ ਸਪੈੱਲ ਭਵਿੱਖਬਾਣੀ ਪ੍ਰਣਾਲੀ",
    bannerTeam: "• ਟੀਮ ਟੈੱਕ-ਡਾਇਨਾਮਿਕਸ",
    bannerTagline: "“ਮੌਸਮ ਐਪਸ ਅਨੁਮਾਨ ਲਗਾਉਂਦੇ ਹਨ। ਗ੍ਰਾਮਵੈਦਰ ਏ.ਆਈ ਤਸਦੀਕ ਕਰਦੀ ਹੈ।”",
    villageElevation: "ਉਚਾਈ",
    villageDistrict: "ਜ਼ਿਲ੍ਹਾ",
    villageBlock: "ਬਲਾਕ",
    primaryCrops: "ਮੁੱਖ ਫ਼ਸਲਾਂ",
    chamberState: "ਰਾਜ",
    chamberBlock: "ਬਲਾਕ",
    chamberVillage: "ਪਿੰਡ",
    chamber1Label: "ਚੈਂਬਰ 1: ਰਾਜ",
    chamber2Label: "ਚੈਂਬਰ 2: ਬਲਾਕ",
    chamber3Label: "ਚੈਂਬਰ 3: ਪਿੰਡ",
    selectState: "ਰਾਜ ਚੁਣੋ",
    selectBlock: "ਬਲਾਕ ਚੁਣੋ",
    selectVillage: "ਪਿੰਡ ਚੁਣੋ",
    threeChamberTitle: "3-ਪੱਧਰੀ ਸਥਾਨ ਚੋਣ",
    threeChamberSubtitle: "ਰਾਜ ➔ ਬਲਾਕ ➔ ਪਿੰਡ",
    changeLocation: "ਸਥਾਨ ਬਦਲੋ",
    locationConfirmed: "ਸਰਗਰਮ ਪਿੰਡ ਸਥਾਨ",

    // Hero Weather
    feelsLike: "ਮਹਿਸੂਸ ਹੁੰਦਾ ਹੈ",
    updatedLive: "ਸਿੱਧਾ ਅਪਡੇਟ",
    rainSystemActive: "ਮੀਂਹ ਪ੍ਰਣਾਲੀ ਸਰਗਰਮ ਹੈ",
    stableWeatherWindow: "ਸ਼ਾਂਤ ਤੇ ਸਾਫ਼ ਮੌਸਮ",
    relativeHumidity: "ਨਮੀ (Humidity)",
    rainProbability: "ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ",
    windVelocity: "ਹਵਾ ਦੀ ਰਫ਼ਤਾਰ",
    surfacePressure: "ਹਵਾ ਦਾ ਦਬਾਅ",

    // Monsoon Onset & Break Card
    monsoonCardBadge: "ਮਾਨਸੂਨ ਬੁੱਧੀਮਤਾ",
    monsoonCardScale: "ਬਲਾਕ / ਪਿੰਡ ਪੱਧਰ",
    monsoonCardTitle: "ਮਾਨਸੂਨ ਆਮਦ ਅਤੇ ਡ੍ਰਾਈ ਸਪੈੱਲ (ਸੋਕਾ) ਜੋਖਮ ਦ੍ਰਿਸ਼ਟੀਕੋਣ",
    monsoonOnsetWindow: "ਮਾਨਸੂਨ ਆਮਦ ਸਮਾਂ",
    monsoonBreakRisk: "ਮੀਂਹ ਰੁਕਣ / ਸੁੱਕੇ ਦਾ ਖ਼ਤਰਾ",
    breakProbability: "ਸੁੱਕੇ ਦੀ ਸੰਭਾਵਨਾ",
    consecutiveWetDays: "ਲਗਾਤਾਰ ਮੀਂਹ ਦੇ ਦਿਨ",
    sowingStrategyTitle: "ਬਿਜਾਈ ਰਣਨੀਤੀ ਸਲਾਹ",
    scientificIndicatorsTitle: "ਵਿਗਿਆਨਕ ਸੂਚਕ (ਮੌਸਮ ਵਿਭਾਗ IMD ਅਤੇ ਇਸਰੋ MOSDAC ਮਾਪਦੰਡ)",

    // 8-Direction Compass
    compassTitle: "8-ਦਿਸ਼ਾਵਾਂ ਮੌਸਮ ਰਡਾਰ",
    compassSub: "ਹਵਾ ਦੇ ਰੁਖ ਅਤੇ ਸੈਟੇਲਾਈਟ ਮਾਡਲ ਅਨੁਸਾਰ 8 ਦਿਸ਼ਾਵਾਂ ਵਿੱਚ ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ। ਦਿਸ਼ਾ 'ਤੇ ਕਲਿੱਕ ਕਰੋ।",
    rainLikelihood: "ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ",
    rainCell: "ਮੀਂਹ ਦੇ ਬੱਦਲਾਂ ਦੀ ਦੂਰੀ",
    vector: "ਦਿਸ਼ਾ ਵਹਾਅ",
    eta: "ਪਹੁੰਚਣ ਦਾ ਸਮਾਂ",
    bearing: "ਡਿਗਰੀ",

    // Cloud Movement
    cloudMovementTitle: "ਬੱਦਲਾਂ ਦੀ ਗਤੀ ਅਤੇ ਦਿਸ਼ਾ",
    origin: "ਸ਼ੁਰੂਆਤੀ ਦਿਸ਼ਾ",
    trajectory: "ਵਹਾਅ ਦਿਸ਼ਾ",
    upwind: "ਹਵਾ ਵੱਲ",
    downwind: "ਹਵਾ ਦੇ ਰੁਖ",
    cloudDensity: "ਬੱਦਲਾਂ ਦੀ ਘਣਤਾ",

    // Confidence Meter
    confidenceTitle: "ਪਿੰਡ ਮੌਸਮ ਭਰੋਸੇਯੋਗਤਾ ਸਕੋਰ",
    certainty: "ਸੱਚਾਈ ਸਕੋਰ",
    confidenceDesc: "ਸਥਾਨਕ ਸੈਂਸਰ, ਕਿਸਾਨਾਂ ਦੀ ਰਿਪੋਰਟ ਅਤੇ ਸੈਟੇਲਾਈਟ ਮਾਡਲਾਂ ਦੇ ਮੇਲ ਨਾਲ ਤਿਆਰ ਸਕੋਰ।",
    sensorsOnline: "ਚਾਲੂ ਸੈਂਸਰ",
    microStations: "ਮਾਈਕ੍ਰੋ-ਸਟੇਸ਼ਨ",
    farmerReportsActive: "ਸਰਗਰਮ ਰਿਪੋਰਟਾਂ",
    statusVerified: "ਤਸਦੀਕਸ਼ੁਦਾ (VERIFIED)",
    statusConflict: "ਟਕਰਾਅ (CONFLICT)",
    statusUnverified: "ਅਪੁਸ਼ਟ (UNVERIFIED)",
    statusModerate: "ਦਰਮਿਆਨਾ",

    // AI Farming Advisory
    advisoryTitle: "ਏ.ਆਈ ਕਿਸਾਨ ਖੇਤੀ ਸਲਾਹ",
    advisorySubtitle: "ਕਿਸਾਨਾਂ ਨੂੰ ਸਿੰਚਾਈ, ਛਿੜਕਾਅ ਅਤੇ ਫ਼ਸਲ ਸੁਰੱਖਿਆ ਲਈ ਸਹੀ ਸਮੇਂ ਦੀ ਜਾਣਕਾਰੀ ਦੇਣਾ।",
    riskLevel: "ਜੋਖਮ",
    irrigationStrategy: "ਸਿੰਚਾਈ ਪ੍ਰਬੰਧਨ",
    sprayingWindow: "ਕੀਟਨਾਸ਼ਕ ਛਿੜਕਾਅ ਸਮਾਂ",
    harvestingStorage: "ਵਾਢੀ ਅਤੇ ਸਾਂਭ-ਸੰਭਾਲ",
    nutrientManagement: "ਖਾਦ ਅਤੇ ਪੋਸ਼ਕ ਤੱਤ",
    voiceReadout: "ਆਵਾਜ਼ ਵਿੱਚ ਸੁਣੋ",
    speaking: "ਬੋਲ ਰਿਹਾ ਹੈ...",
    advisoryDisclaimer: "ਓਪਨ-ਮੈਟੀਓ ਅਤੇ ਪੀ.ਏ.ਯੂ (PAU) ਖੇਤੀ ਮਾਪਦੰਡਾਂ ਅਨੁਸਾਰ ਤਸਦੀਕਸ਼ੁਦਾ।",
    honestLabel: "ਨਿਯਮ-ਅਧਾਰਿਤ ਆਈ.ਸੀ.ਏ.ਆਰ (ICAR) ਖੇਤੀ ਸਲਾਹ, ਮਾਹਰ ਹਦਾਇਤ ਨਹੀਂ।",

    // Feed & Observations
    feedTitle: "ਪਿੰਡ ਕਿਸਾਨ ਮੌਸਮ ਰਿਪੋਰਟ ਫ਼ੀਡ",
    feedSub: "ਕਿਸਾਨਾਂ ਦੁਆਰਾ ਦਰਜ ਕੀਤੀਆਂ ਰਿਪੋਰਟਾਂ, ਜਿਨ੍ਹਾਂ ਦੀ ਸੈਂਸਰਾਂ ਰਾਹੀਂ ਤਸਦੀਕ ਕੀਤੀ ਜਾਂਦੀ ਹੈ।",
    addReport: "ਰਿਪੋਰਟ ਦਰਜ ਕਰੋ",
    reportedBy: "ਵੱਲੋਂ ਰਿਪੋਰਟ",
    inspectEvidence: "ਸਬੂਤਾਂ ਦੀ ਜਾਂਚ ਕਰੋ",
    confidence: "ਭਰੋਸੇਯੋਗਤਾ",
    noObservations: "ਅੱਜ ਅਜੇ ਤੱਕ ਕੋਈ ਨਵੀਂ ਰਿਪੋਰਟ ਦਰਜ ਨਹੀਂ ਹੋਈ।",

    // Report Weather Modal
    modalTitle: "ਪਿੰਡ ਦਾ ਮੌਸਮ ਦਰਜ ਕਰੋ",
    voiceInputBadge: "ਬਹੁ-ਭਾਸ਼ਾਈ ਅਤੇ ਆਵਾਜ਼-ਸਮਰੱਥ",
    voicePrompt: "ਕਿਸਾਨ ਆਵਾਜ਼ ਇਨਪੁਟ (ਟੈਸਟ ਕਰਨ ਲਈ ਕਲਿੱਕ ਕਰੋ)",
    voiceSample1: "ਦੱਖਣ-ਪੱਛਮ ਵੱਲੋਂ ਕਾਲੇ ਬੱਦਲ ਆ ਰਹੇ ਹਨ ਅਤੇ ਬਹੁਤ ਹੁੰਮਸ ਹੈ।",
    voiceSample2: "15 ਮਿੰਟ ਪਹਿਲਾਂ ਭਾਰੀ ਮੀਂਹ ਸ਼ੁਰੂ ਹੋਇਆ ਹੈ, ਖੇਤਾਂ ਵਿੱਚ ਪਾਣੀ ਭਰਨ ਲੱਗਾ ਹੈ।",
    step1SelectEvent: "1. ਤੁਸੀਂ ਕਿਹੋ ਜਿਹਾ ਮੌਸਮ ਦੇਖ ਰਹੇ ਹੋ?",
    intensityLabel: "ਤੀਬਰਤਾ",
    sinceWhenLabel: "ਕਦੋਂ ਤੋਂ?",
    namePlaceholder: "ਤੁਹਾਡਾ ਨਾਮ / ਖੇਤ (ਜਿਵੇਂ ਬਲਵਿੰਦਰ ਸਿੰਘ, ਉੱਤਰੀ ਖੇਤ)",
    descPlaceholder: "ਵਾਧੂ ਵੇਰਵਾ (ਜਿਵੇਂ ਖੇਤ ਵਿੱਚ ਪਾਣੀ ਭਰ ਰਿਹਾ ਹੈ)",
    btnSubmitReport: "ਰਿਪੋਰਟ ਜਮ੍ਹਾਂ ਕਰੋ",
    submitting: "ਤਸਦੀਕ ਲਈ ਭੇਜਿਆ ਜਾ ਰਿਹਾ ਹੈ...",
    reportSuccess: "ਰਿਪੋਰਟ ਸਫਲਤਾਪੂਰਵਕ ਜਮ੍ਹਾਂ ਹੋ ਗਈ!",

    // Verification Lab
    verificationTitle: "ਮੌਸਮ ਤਸਦੀਕ ਇੰਜਣ",
    verificationSub: "ਮੁੱਖ ਨਵੀਨਤਾ: ਕਿਸਾਨ ਰਿਪੋਰਟ ਨੂੰ ਅੰਨ੍ਹੇਵਾਹ ਸੱਚ ਮੰਨਣ ਦੀ ਬਜਾਏ 3 ਸੁਤੰਤਰ ਸਰੋਤਾਂ ਨਾਲ ਮਿਲਾਉਣਾ।",
    demoPreset: "ਡੈਮੋ ਮੋਡ ਚੁਣੋ:",
    selectObsToExamine: "ਜਾਂਚ ਲਈ ਰਿਪੋਰਟ ਚੁਣੋ:",
    evaluatedObs: "ਜਾਂਚੀ ਜਾ ਰਹੀ ਰਿਪੋਰਟ",
    concordanceScore: "ਸਹਿਮਤੀ ਸਕੋਰ",
    actionImplication: "ਖੇਤੀ ਕਾਰਵਾਈ ਨਿਰਦੇਸ਼",
    evidenceMatrixTitle: "ਸੁਤੰਤਰ ਸਰੋਤਾਂ ਦਾ ਮੇਲ ਮੈਟ੍ਰਿਕਸ",
    colSource: "ਡਾਟਾ ਸਰੋਤ",
    colTelemetry: "ਮਾਪਿਆ ਗਿਆ ਡਾਟਾ",
    colConcordance: "ਸਹਿਮਤੀ",
    colWeight: "ਮਾਡਲ ਵੇਟੇਜ",
    colDetail: "ਵੇਰਵਾ",
    colClass: "ਸ਼੍ਰੇਣੀ",
    agrees: "ਸਹਿਮਤ ਹੈ ✓",
    conflicts: "ਟਕਰਾਅ ✗",

    // Closed Loop
    learningLoopTitle: "ਕਲੋਜ਼ਡ-ਲੂਪ ਲਰਨਿੰਗ ਅਤੇ ਸੁਧਾਰ",
    learningLoopSub: "ਭਵਿੱਖਬਾਣੀ → ਸੁਣੋ → ਤੁਲਨਾ ਕਰੋ → ਤਸਦੀਕ ਕਰੋ → ਸੁਧਾਰੋ → ਸਮਝਾਓ → ਸਿੱਖੋ",
    maeLabel: "ਔਸਤ ਗਲਤੀ (MAE)",
    calibrationLabel: "ਕੈਲੀਬ੍ਰੇਸ਼ਨ ਸਕੋਰ",
    activeModelLabel: "ਸਰਗਰਮ ਪਿੰਡ ਮਾਡਲ",
    recentEvalTitle: "ਹਾਲੀਆ ਭਵਿੱਖਬਾਣੀ ਬਨਾਮ ਅਸਲ ਮੌਸਮ ਮੁਲਾਂਕਣ",
    colEvalWindow: "ਮੁਲਾਂਕਣ ਸਮਾਂ",
    colPredictedProb: "ਅਨੁਮਾਨਿਤ ਸੰਭਾਵਨਾ",
    colActualEvent: "ਅਸਲ ਮੀਂਹ",
    colError: "ਗਲਤੀ ਅੰਤਰ",
    colBiasCorrection: "ਲਾਗੂ ਕੀਤਾ ਸੁਧਾਰ",
    colStatus: "ਤਸਦੀਕ",
    researchCitationsTitle: "ਵਿਗਿਆਨਕ ਹਵਾਲੇ ਅਤੇ ਸਰੋਤ",

    // Alerts Screen & Card
    alertsTitle: "ਅਗਾਊਂ ਚੇਤਾਵਨੀ ਪ੍ਰਣਾਲੀ",
    alertsSub: "ਮੌਸਮ ਸੰਬੰਧੀ ਚੇਤਾਵਨੀਆਂ ਅਤੇ ਜ਼ਰੂਰੀ ਕਦਮ -",
    actionRequired: "ਕਾਰਵਾਈ ਨਿਰਦੇਸ਼",
    immediateAction: "ਤੁਰੰਤ ਕਾਰਵਾਈ",
    triggerMetric: "ਟ੍ਰਿਗਰ ਮਾਪਦੰਡ",
    noAlerts: "ਇਸ ਪਿੰਡ ਲਈ ਕੋਈ ਗੰਭੀਰ ਮੌਸਮ ਚੇਤਾਵਨੀ ਨਹੀਂ ਹੈ।",
    demoInjectAlert: "ਡੈਮੋ: ਚੇਤਾਵਨੀ ਲਾਗੂ ਕਰੋ",
    demoClearAlert: "ਡੈਮੋ ਚੇਤਾਵਨੀ ਹਟਾਓ",

    // History Screen
    historyTitle: "ਇਤਿਹਾਸਕ ਮੌਸਮ ਅਤੇ CHIRPS ਬੈਂਚਮਾਰਕ",
    historySub: "ਹਾਲੀਆ ਮੀਂਹ ਦੀ ਤੁਲਨਾ ਬਹੁ-ਵਰ੍ਹਿਆਂ ਦੇ ਸੈਟੇਲਾਈਟ ਅੰਕੜਿਆਂ ਨਾਲ।",
    chirpsNormal: "ਸੈਟੇਲਾਈਟ ਜਲਵਾਯੂ ਆਮ (CHIRPS v2.0)",
    avgMonthlyRain: "ਔਸਤ ਮਹੀਨਾਵਾਰ ਮੀਂਹ",
    sevenDayTrend: "7-ਦਿਨਾਂ ਮੀਂਹ ਅਤੇ ਤਾਪਮਾਨ ਦਾ ਰੁਝਾਨ",
    dry: "ਸੁੱਕਾ",
    statusLabel: "ਸਥਿਤੀ",
    citationLabel: "ਹਵਾਲਾ",

    // Common labels
    connecting: "ਪਿੰਡ ਦੇ ਮੌਸਮ ਡਾਟਾ ਨਾਲ ਜੁੜ ਰਿਹਾ ਹੈ...",
    villageMapTitle: "ਪਿੰਡ ਸਥਾਨਕ ਮਾਈਕ੍ਰੋ-ਗ੍ਰਿਡ",
    villageMapSub: "ਪਿੰਡ ਕੇਂਦਰ, ਸੈਂਸਰ ਨੋਡਾਂ ਅਤੇ ਆਉਣ ਵਾਲੇ ਮੌਸਮ ਦੀ ਮੈਪਿੰਗ।",
    liveBadge: "ਲਾਈਵ",
    simulatedBadge: "ਸਿਮੂਲੇਟਿਡ",
    pending: "ਪੈਂਡਿੰਗ (PENDING)",
    verified: "ਤਸਦੀਕਸ਼ੁਦਾ (VERIFIED)",
    conflict: "ਟਕਰਾਅ (CONFLICT)",
    unverified: "ਅਪੁਸ਼ਟ (UNVERIFIED)",
    yes: "ਹਾਂ",
    noRain: "ਕੋਈ ਮੀਂਹ ਨਹੀਂ",
    light: "ਹਲਕੀ",
    moderate: "ਦਰਮਿਆਨੀ",
    heavy: "ਭਾਰੀ",
    justNow: "ਹੁਣੇ ਹੀ",
    minsAgo15: "15 ਮਿੰਟ ਪਹਿਲਾਂ",
    minsAgo30: "30 ਮਿੰਟ ਪਹਿਲਾਂ",
    hourAgo1: "1 ਘੰਟਾ ਪਹਿਲਾਂ",

    // Crops
    cropWheat: "ਕਣਕ (Wheat)",
    cropPaddy: "ਝੋਨਾ (Paddy)",
    cropSugarcane: "ਗੰਨਾ (Sugarcane)",
    cropCotton: "ਨਰਮਾ/ਕਪਾਹ (Cotton)",
    cropMustard: "ਸਰ੍ਹੋਂ (Mustard)",
    cropMaize: "ਮੱਕੀ (Maize)",
    cropSoybean: "ਸੋਇਆਬੀਨ (Soybean)",
    cropChilli: "ਮਿਰਚ (Chilli)",
    cropTobacco: "ਤੰਬਾਕੂ (Tobacco)",
    cropPulses: "ਦਾਲਾਂ (Pulses)",

    // Weather Conditions
    condClear: "ਸਾਫ਼ ਅਸਮਾਨ",
    condMainlyClear: "ਮੁੱਖ ਤੌਰ 'ਤੇ ਸਾਫ਼",
    condPartlyCloudy: "ਅੰਸ਼ਕ ਬੱਦਲਵਾਈ",
    condOvercast: "ਸੰਘਣੇ ਬੱਦਲ",
    condRainShowers: "ਮੀਂਹ ਦੀਆਂ ਫੁਹਾਰਾਂ",
    condHeavyRain: "ਭਾਰੀ ਮੀਂਹ",
    condThunderstorm: "ਗਰਜ-ਚਮਕ ਨਾਲ ਮੀਂਹ",
    condHail: "ਗੜੇਮਾਰੀ (Hail)",
    condStrongWind: "ਤੇਜ਼ ਹਵਾ / ਝੱਖੜ",
    condCloudy: "ਬੱਦਲ ਛਾਏ ਹਨ",
  }
};

export function getTranslation(key, lang = 'en') {
  const currentLang = TRANSLATIONS[lang] || TRANSLATIONS['en'];
  return currentLang[key] || TRANSLATIONS['en'][key] || key;
}

export const CROP_LABELS = {
  hi: {
    Wheat: 'गेहूं (Wheat)',
    Paddy: 'धान (Paddy)',
    Sugarcane: 'गन्ना (Sugarcane)',
    Cotton: 'कपास (Cotton)',
    Mustard: 'सरसों (Mustard)',
    Maize: 'मक्का (Maize)',
    Soybean: 'सोयाबीन (Soybean)',
    Chilli: 'मिर्च (Chilli)',
    Tobacco: 'तंबाकू (Tobacco)',
    Pulses: 'दालें (Pulses)',
  },
  pa: {
    Wheat: 'ਕਣਕ (Wheat)',
    Paddy: 'ਝੋਨਾ (Paddy)',
    Sugarcane: 'ਗੰਨਾ (Sugarcane)',
    Cotton: 'ਕਪਾਹ (Cotton)',
    Mustard: 'ਸਰ੍ਹੋਂ (Mustard)',
    Maize: 'ਮੱਕੀ (Maize)',
    Soybean: 'ਸੋਇਆਬੀਨ (Soybean)',
    Chilli: 'ਮਿਰਚ (Chilli)',
    Tobacco: 'ਤੰਬਾਕੂ (Tobacco)',
    Pulses: 'ਦਾਲਾਂ (Pulses)',
  }
};

export function getCropLabel(crop, lang = 'en') {
  if (lang === 'en') return crop;
  return CROP_LABELS[lang]?.[crop] || crop;
}

export const CONDITION_LABELS = {
  hi: {
    'Clear Sky': 'साफ़ आसमान',
    'Mainly Clear': 'मुख्यतः साफ़',
    'Partly Cloudy': 'आंशिक बादल',
    'Cloudy': 'बादल छाए हैं',
    'Overcast': 'घने बादल',
    'Rain Showers': 'बारिश की बौछारें',
    'Heavy Rain': 'भारी बारिश',
    'Raining': 'बारिश हो रही है',
    'Thunderstorm': 'गरज-चमक के साथ बारिश',
    'Hail': 'ओलावृष्टि (Hail)',
    'Hail Storm': 'ओलावृष्टि (Hail)',
    'Strong Wind': 'तेज हवा / आंधी',
  },
  pa: {
    'Clear Sky': 'ਸਾਫ਼ ਅਸਮਾਨ',
    'Mainly Clear': 'ਮੁੱਖ ਤੌਰ \'ਤੇ ਸਾਫ਼',
    'Partly Cloudy': 'ਅੰਸ਼ਕ ਬੱਦਲਵਾਈ',
    'Cloudy': 'ਬੱਦਲ ਛਾਏ ਹਨ',
    'Overcast': 'ਸੰਘਣੇ ਬੱਦਲ',
    'Rain Showers': 'ਮੀਂਹ ਦੀਆਂ ਫੁਹਾਰਾਂ',
    'Heavy Rain': 'ਭਾਰੀ ਮੀਂਹ',
    'Raining': 'ਮੀਂਹ ਪੈ ਰਿਹਾ ਹੈ',
    'Thunderstorm': 'ਗਰਜ-ਚਮਕ ਨਾਲ ਮੀਂਹ',
    'Hail': 'ਗੜੇਮਾਰੀ (Hail)',
    'Hail Storm': 'ਗੜੇਮਾਰੀ (Hail)',
    'Strong Wind': 'ਤੇਜ਼ ਹਵਾ / ਝੱਖੜ',
  }
};

export function getConditionLabel(cond, lang = 'en') {
  if (lang === 'en' || !cond) return cond;
  return CONDITION_LABELS[lang]?.[cond] || cond;
}

export const STATUS_LABELS = {
  hi: {
    'VERIFIED': 'सत्यापित (VERIFIED)',
    'CONFLICT': 'विरोधाभासी (CONFLICT)',
    'PENDING': 'प्रतीक्षारत (PENDING)',
    'UNVERIFIED': 'अपुष्ट (UNVERIFIED)',
    'MODERATE': 'मध्यम (MODERATE)',
    'CRITICAL': 'गंभीर (CRITICAL)',
    'WARNING': 'चेतावनी (WARNING)',
    'INFO': 'सूचना (INFO)',
    'LOW': 'निम्न (LOW)',
    'HIGH': 'उच्च (HIGH)',
  },
  pa: {
    'VERIFIED': 'ਤਸਦੀਕਸ਼ੁਦਾ (VERIFIED)',
    'CONFLICT': 'ਟਕਰਾਅ (CONFLICT)',
    'PENDING': 'ਪੈਂਡਿੰਗ (PENDING)',
    'UNVERIFIED': 'ਅਪੁਸ਼ਟ (UNVERIFIED)',
    'MODERATE': 'ਦਰਮਿਆਨਾ (MODERATE)',
    'CRITICAL': 'ਗੰਭੀਰ (CRITICAL)',
    'WARNING': 'ਚੇਤਾਵਨੀ (WARNING)',
    'INFO': 'ਸੂਚਨਾ (INFO)',
    'LOW': 'ਘੱਟ (LOW)',
    'HIGH': 'ਜ਼ਿਆਦਾ (HIGH)',
  }
};

export function getStatusLabel(status, lang = 'en') {
  if (lang === 'en' || !status) return status;
  return STATUS_LABELS[lang]?.[status] || status;
}

export const TIME_LABELS = {
  hi: {
    'Just now': 'अभी-अभी',
    '15 mins ago': '15 मिनट पहले',
    '30 mins ago': '30 मिनट पहले',
    '1 hour ago': '1 घंटा पहले',
  },
  pa: {
    'Just now': 'ਹੁਣੇ ਹੀ',
    '15 mins ago': '15 ਮਿੰਟ ਪਹਿਲਾਂ',
    '30 mins ago': '30 ਮਿੰਟ ਪਹਿਲਾਂ',
    '1 hour ago': '1 ਘੰਟਾ ਪਹਿਲਾਂ',
  }
};

export function getTimeLabel(timeDesc, lang = 'en') {
  if (lang === 'en' || !timeDesc) return timeDesc;
  return TIME_LABELS[lang]?.[timeDesc] || timeDesc;
}

export const INTENSITY_LABELS = {
  hi: {
    'Light': 'हल्की',
    'Moderate': 'मध्यम',
    'Heavy': 'तेज़',
  },
  pa: {
    'Light': 'ਹਲਕੀ',
    'Moderate': 'ਦਰਮਿਆਨੀ',
    'Heavy': 'ਭਾਰੀ',
  }
};

export function getIntensityLabel(intensity, lang = 'en') {
  if (lang === 'en' || !intensity) return intensity;
  return INTENSITY_LABELS[lang]?.[intensity] || intensity;
}

/**
 * Smart translation for dynamic messages (advisories, alert actions, verification explanations)
 */
export function translateDynamicText(text, lang = 'en') {
  if (!text || lang === 'en') return text;

  // Alerts translations
  if (lang === 'hi') {
    if (text.includes('Halt field irrigation, clear farm drainage')) {
      return 'खेत में सिंचाई तुरंत रोकें, जल निकासी के नालों को साफ़ करें और कटी हुई फसल को वाटरप्रूफ तिरपाल से सुरक्षित करें।';
    }
    if (text.includes('Severe Rain & Waterlogging Advisory')) {
      return 'भारी बारिश एवं जलभराव चेतावनी';
    }
    if (text.includes('Heavy rainfall alert')) {
      return text.replace('Heavy rainfall alert', 'भारी बारिश की चेतावनी')
                 .replace('likelihood', 'संभावना')
                 .replace('Expected precipitation', 'अनुमानित वर्षा');
    }
    if (text.includes('Provide mechanical staking for tall crops')) {
      return 'लंबी फसलों (गन्ना, केला, मक्का) को सहारा दें। ऊंचाई पर छिड़काव बंद करें।';
    }
    if (text.includes('Strong Wind Gust Warning')) {
      return 'तेज हवा एवं आंधी की चेतावनी';
    }
    if (text.includes('Sustained wind speeds reaching')) {
      return 'गाँव के बाहरी क्षेत्र में तेज हवाओं की गति दर्ज की गई है।';
    }
    if (text.includes('Extreme Heat Stress Alert')) {
      return 'अत्यधिक गर्मी व लू का अलर्ट';
    }
    if (text.includes('Inspect standing crops for wilting')) {
      return 'खड़ी फसलों की मुरझाने से रक्षा करें। पशुओं के लिए पर्याप्त पीने का पानी और छायादार स्थान सुनिश्चित करें।';
    }
    if (text.includes('Favorable Village Weather')) {
      return 'अनुकूल एवं शांत गाँव मौसम';
    }
    if (text.includes('Atmospheric conditions are stable')) {
      return 'वायुमंडलीय परिस्थितियां स्थिर हैं। गाँव के लिए कोई गंभीर मौसम चेतावनी नहीं है।';
    }
    if (text.includes('Optimal window for routine agricultural maintenance')) {
      return 'नियमित कृषि कार्यों एवं खेत की तैयारी के लिए सबसे उत्तम समय है।';
    }

    // Verification summaries
    if (text.includes('High agreement across NWP model')) {
      return 'मौसम मॉडल और सेंसर नेटवर्क में पूर्ण सहमति है जो बारिश की पुष्टि करती है। मॉडल बारिश की स्थिति को सही मानता है।';
    }
    if (text.includes('External model and IoT sensors indicate dry conditions')) {
      return 'बाहरी मॉडल और IoT सेंसर सूखा मौसम दर्शा रहे हैं। मानवीय रिपोर्ट की दोबारा पुष्टि की जा रही है; मॉडल ने बारिश की चेतावनी रोक दी है।';
    }
    if (text.includes('Farmer advisory: Prioritize immediate field drainage')) {
      return 'किसान सलाह: खेत से तुरंत पानी निकालने को प्राथमिकता दें और सिंचाई रोकें।';
    }
    if (text.includes('Farmer advisory: Safe to proceed with field operations')) {
      return 'किसान सलाह: खेत के कार्य सामान्य रूप से जारी रख सकते हैं; बारिश की रिपोर्ट पुष्ट नहीं हुई।';
    }
    if (text.includes('Evaluating source concordance...')) {
      return 'डेटा स्रोतों की आपसी सहमति की जाँच की जा रही है...';
    }
    if (text.includes('Awaiting evaluation.')) {
      return 'मूल्यांकन की प्रतीक्षा है।';
    }
    if (text.includes('Evaluating soil moisture')) {
      return 'मिट्टी की नमी और वाष्पीकरण का विश्लेषण किया जा रहा है...';
    }
    if (text.includes('Calculating wind velocity drift risk')) {
      return 'हवा के बहाव और दवा उड़ने के जोखिम की गणना हो रही है...';
    }
    if (text.includes('Monitoring precipitation risk during harvest period')) {
      return 'कटाई के समय बारिश के जोखिम पर नज़र रखी जा रही है...';
    }
    if (text.includes('Assessing runoff and leaching thresholds')) {
      return 'उर्वरक बहाव और पोषक तत्वों के नुकसान का आकलन किया जा रहा है...';
    }
  }

  if (lang === 'pa') {
    if (text.includes('Halt field irrigation, clear farm drainage')) {
      return 'ਖੇਤ ਵਿੱਚ ਸਿੰਚਾਈ ਰੋਕੋ, ਪਾਣੀ ਨਿਕਾਸੀ ਦੇ ਨਾਲਿਆਂ ਨੂੰ ਸਾਫ਼ ਕਰੋ ਅਤੇ ਵੱਢੀ ਹੋਈ ਫ਼ਸਲ ਨੂੰ ਤਰਪਾਲ ਨਾਲ ਢੱਕੋ।';
    }
    if (text.includes('Severe Rain & Waterlogging Advisory')) {
      return 'ਭਾਰੀ ਮੀਂਹ ਅਤੇ ਜਲ-ਭਰਾਅ ਚੇਤਾਵਨੀ';
    }
    if (text.includes('Provide mechanical staking for tall crops')) {
      return 'ਲੰਬੀਆਂ ਫ਼ਸਲਾਂ (ਗੰਨਾ, ਮੱਕੀ ਆਦਿ) ਨੂੰ ਸਹਾਰਾ ਦਿਓ। ਕੀਟਨਾਸ਼ਕ ਦਾ ਛਿੜਕਾਅ ਰੋਕੋ।';
    }
    if (text.includes('Strong Wind Gust Warning')) {
      return 'ਤੇਜ਼ ਹਵਾ ਅਤੇ ਝੱਖੜ ਦੀ ਚੇਤਾਵਨੀ';
    }
    if (text.includes('Extreme Heat Stress Alert')) {
      return 'ਅਤਿ ਗਰਮੀ ਦੀ ਚੇਤਾਵਨੀ';
    }
    if (text.includes('Favorable Village Weather')) {
      return 'ਅਨੁਕੂਲ ਪਿੰਡ ਮੌਸਮ';
    }
    if (text.includes('Atmospheric conditions are stable')) {
      return 'ਮੌਸਮ ਸ਼ਾਂਤ ਅਤੇ ਸਥਿਰ ਹੈ। ਕੋਈ ਖ਼ਤਰੇ ਵਾਲੀ ਚੇਤਾਵਨੀ ਨਹੀਂ ਹੈ।';
    }
    if (text.includes('Optimal window for routine agricultural maintenance')) {
      return 'ਰੋਜ਼ਾਨਾ ਖੇਤੀ ਕੰਮਾਂ ਅਤੇ ਖੇਤ ਦੀ ਤਿਆਰੀ ਲਈ ਬਿਲਕੁਲ ਸਹੀ ਸਮਾਂ ਹੈ।';
    }
    if (text.includes('High agreement across NWP model')) {
      return 'ਮੌਸਮ ਮਾਡਲ ਅਤੇ ਸੈਂਸਰਾਂ ਵਿੱਚ ਪੂਰੀ ਸਹਿਮਤੀ ਹੈ ਜੋ ਮੀਂਹ ਦੀ ਪੁਸ਼ਟੀ ਕਰਦੀ ਹੈ।';
    }
    if (text.includes('External model and IoT sensors indicate dry conditions')) {
      return 'ਮਾਡਲ ਅਤੇ ਸੈਂਸਰ ਸੁੱਕਾ ਮੌਸਮ ਦਰਸਾ ਰਹੇ ਹਨ। ਕਿਸਾਨ ਰਿਪੋਰਟ ਦੀ ਮੁੜ ਜਾਂਚ ਹੋ ਰਹੀ ਹੈ।';
    }
    if (text.includes('Farmer advisory: Prioritize immediate field drainage')) {
      return 'ਕਿਸਾਨ ਸਲਾਹ: ਖੇਤ ਵਿੱਚੋਂ ਪਾਣੀ ਕੱਢਣ ਨੂੰ ਤਰਜੀਹ ਦਿਓ ਅਤੇ ਸਿੰਚਾਈ ਬੰਦ ਕਰੋ।';
    }
    if (text.includes('Farmer advisory: Safe to proceed with field operations')) {
      return 'ਕਿਸਾਨ ਸਲਾਹ: ਖੇਤ ਦੇ ਕੰਮ ਆਮ ਵਾਂਗ ਜਾਰੀ ਰੱਖੇ ਜਾ ਸਕਦੇ ਹਨ।';
    }
  }

  return text;
}

export const VILLAGE_LOCALIZED = {
  hi: {
    // States
    'Punjab': 'पंजाब',
    'Maharashtra': 'महाराष्ट्र',
    'Gujarat': 'गुजरात',
    'Karnataka': 'कर्नाटक',
    'Uttar Pradesh': 'उत्तर प्रदेश',
    'Madhya Pradesh': 'मध्य प्रदेश',
    'Andhra Pradesh': 'आंध्र प्रदेश',
    'Haryana': 'हरियाणा',

    // Districts & Blocks
    'Ludhiana': 'लुधियाना',
    'Khanna': 'खन्ना',
    'Samrala': 'समराला',
    'Payal': 'पायल',
    'Pune': 'पुणे',
    'Baramati': 'बारामती',
    'Indapur': 'इंदापुर',
    'Daund': 'दौंड',
    'Anand': 'आनंद',
    'Petlad': 'पेतलाद',
    'Borsad': 'बोरसद',
    'Mandya': 'मांड्या',
    'Maddur': 'मद्दूर',
    'Pandavapura': 'पांडवपुरा',
    'Muzaffarnagar': 'मुज़फ़्फ़रनगर',
    'Baghra': 'बाघरा',
    'Budhana': 'बुढ़ाना',
    'Khatauli': 'खतौली',
    'Narmadapuram': 'नर्मदापुरम',
    'Babai': 'बाबई',
    'Pipariya': 'पिपरिया',
    'Guntur': 'गुंटूर',
    'Tenali': 'तेनाली',
    'Mangalagiri': 'मंगलगिरि',

    // Villages
    'Aluna Palla': 'अलुना पल्ला',
    'Daudhar': 'दौधर',
    'Bondli': 'बोंदली',
    'Malegaon Bk': 'मालेगांव बु.',
    'Shirsuphal': 'शिरसुफल',
    'Bawada': 'बावड़ा',
    'Mogri': 'मोगरी',
    'Hadgood': 'हदगुड़',
    'Koppa': 'कोप्पा',
    'Rasoolpur': 'रसूलपुर',
    'Babai (Makhan Nagar)': 'बाबई (माखन नगर)',
    'Narakodur': 'नरकोदुर',
    'Guntur Rural': 'गुंटूर ग्रामीण',
    'Tenali Rural': 'तेनाली ग्रामीण',
    'Narmadapuram (Hoshangabad)': 'नर्मदापुरम (होशंगाबाद)'
  },
  pa: {
    // States
    'Punjab': 'ਪੰਜਾਬ',
    'Maharashtra': 'ਮਹਾਰਾਸ਼ਟਰ',
    'Gujarat': 'ਗੁਜਰਾਤ',
    'Karnataka': 'ਕਰਨਾਟਕ',
    'Uttar Pradesh': 'ਉੱਤਰ ਪ੍ਰਦੇਸ਼',
    'Madhya Pradesh': 'ਮੱਧ ਪ੍ਰਦੇਸ਼',
    'Andhra Pradesh': 'ਆਂਧਰਾ ਪ੍ਰਦੇਸ਼',
    'Haryana': 'ਹਰਿਆਣਾ',

    // Districts & Blocks
    'Ludhiana': 'ਲੁਧਿਆਣਾ',
    'Khanna': 'ਖੰਨਾ',
    'Samrala': 'ਸਮਰਾਲਾ',
    'Payal': 'ਪਾਇਲ',
    'Pune': 'ਪੁਣੇ',
    'Baramati': 'ਬਾਰਾਮਤੀ',
    'Indapur': 'ਇੰਦਾਪੁਰ',
    'Daund': 'ਦੌਂਡ',
    'Anand': 'ਆਨੰਦ',
    'Petlad': 'ਪੇਤਲਾਦ',
    'Borsad': 'ਬੋਰਸਦ',
    'Mandya': 'ਮਾਂਡਿਆ',
    'Maddur': 'ਮੱਦੂਰ',
    'Pandavapura': 'ਪਾਂਡਵਪੁਰਾ',
    'Muzaffarnagar': 'ਮੁਜ਼ੱਫਰਨਗਰ',
    'Baghra': 'ਬਾਘਰਾ',
    'Budhana': 'ਬੁਢਾਨਾ',
    'Khatauli': 'ਖਤੌਲੀ',
    'Narmadapuram': 'ਨਰਮਦਾਪੁਰਮ',
    'Babai': 'ਬਾਬਈ',
    'Pipariya': 'ਪਿਪਰੀਆ',
    'Guntur': 'ਗੁੰਟੂਰ',
    'Tenali': 'ਤੇਨਾਲੀ',
    'Mangalagiri': 'ਮੰਗਲਗਿਰੀ',

    // Villages
    'Aluna Palla': 'ਅਲੂਣਾ ਪੱਲਾ',
    'Daudhar': 'ਦੌਧਰ',
    'Bondli': 'ਬੋਂਦਲੀ',
    'Malegaon Bk': 'ਮਾਲੇਗਾਓਂ ਬੁ.',
    'Shirsuphal': 'ਸ਼ਿਰਸੁਫਲ',
    'Bawada': 'ਬਾਵੜਾ',
    'Mogri': 'ਮੋਗਰੀ',
    'Hadgood': 'ਹਦਗੁੜ',
    'Koppa': 'ਕੋੱਪਾ',
    'Rasoolpur': 'ਰਸੂਲਪੁਰ',
    'Babai (Makhan Nagar)': 'ਬਾਬਈ (ਮਾਖਨ ਨਗਰ)',
    'Narakodur': 'ਨਾਰਕੋਦੁਰ',
    'Guntur Rural': 'ਗੁੰਟੂਰ ਦਿਹਾਤੀ',
    'Tenali Rural': 'ਤੇਨਾਲੀ ਦਿਹਾਤੀ',
    'Narmadapuram (Hoshangabad)': 'ਨਰਮਦਾਪੁਰਮ (ਹੋਸ਼ੰਗਾਬਾਦ)'
  }
};

export function getVillageLabel(name, lang = 'en') {
  if (lang === 'en' || !name) return name;
  return VILLAGE_LOCALIZED[lang]?.[name] || name;
}
