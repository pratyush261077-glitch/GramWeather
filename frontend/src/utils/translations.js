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
    validationTitle: "Historical Onset Validation (Khanna Block)",
    validationSubtitle: "Open-Meteo ERA5 Reanalysis Back-Test (2023–2026)",
    meanOnsetErrorLabel: "Mean onset error: ~3 days (back-test, 1 block)",
    validationCaveat: "Single block, 4 years, approximate climatology - needs IMD gridded data at scale.",
    colYear: "Year",
    colDetectedOnset: "Detected Onset",
    colNormal: "Normal",
    colErrorDays: "Error (Days)",
    btnCopyDeck: "Copy Summary for Deck",
    copied: "Copied!",
    validationToggleExpand: "View 4-Yr Backtest Validation (2023–2026) ▼",
    validationToggleCollapse: "Hide Historical Validation ▲",
    lowBandwidthMode: "Low-Bandwidth Mode",
    lowBandwidthDesc: "Caches last telemetry in localStorage; resilient 2G offline fallback",
    cachedBadge: "CACHED",
    simulateNetworkDrop: "Simulate Network Drop",
    mockDispatchLine: "Delivery: App push · SMS (auto-fallback on 2G) · WhatsApp",
    deliveryLabel: "Delivery:",
    appPushLabel: "App push",
    smsFallbackLabel: "SMS (auto-fallback on 2G)",
    whatsappLabel: "WhatsApp",
    prototypeLabel: "Prototype",

    // Monsoon Presets & Details
    monsoonPresetsTitle: "Demo Presets (Jury Preview):",
    presetLive: "Normal (Live)",
    presetApproaching: "Approaching onset (DEMO)",
    presetActive: "Active monsoon (DEMO)",
    presetBreakRisk: "Break risk (DEMO)",
    monsoonBreakAlertActive: "BREAK RISK ALERT ACTIVE: 7-day rain is 6 mm (High Break Risk). Dispatched to Alerts tab & Dashboard.",
    viewInAlerts: "View in Alerts Tab →",
    effectiveOnsetDetected: "Effective onset detected on",
    criteriaMet: "(Pai et al. criteria met)",
    onsetCriteriaDesc: "Criteria: 5-day cumulative rain ≥ 40 mm with ≥ 2 days ≥ 2.5 mm",
    breakThresholdDesc: "Break Threshold: <10 mm (High), <15 mm (Mod)",
    next7DaysForecast: "Next 7 Days Forecast (mm/day):",
    confidenceBreakdownTitle: "Confidence Basis Breakdown:",
    heuristicConfidence: "Heuristic Confidence",
    heuristicDisclaimer: "*Heuristic score based on NWP delta; not an empirical probability.",
    phaseLabel: "Phase:",
    nonCalibrated: "Non-calibrated",

    // Advisory Page Specifics
    icarStyleThresholds: "ICAR-STYLE AGRONOMIC THRESHOLDS",
    selectActiveFarmCrop: "Select Active Farm Crop:",
    telemetryOpenMeteo: "Telemetry: Open-Meteo NWP Forecast",
    rain7dLabel: "7d Rain:",
    windLabel: "Wind:",
    nextRainOutlook: "Next Rain Outlook:",
    risk48hRain: "48h Rain Risk:",
    leaching24h: "24h Leaching:",
    ruleIrrigation: "Rule: ≥15 mm (Skip) · 5–15 mm (Halve) · <5 mm (Irrigate)",
    ruleSpraying: "Rule: Wind >12 km/h or Rain <24h → Do NOT spray",
    ruleHarvesting: "Rule: Rain within 48h → Harvest early / cover produce",
    ruleFertilizer: "Rule: Rain within 24h → Hold fertilizer (prevents leaching)",
    honestTransparency: "Honest Transparency:",
    telemetrySourceFooter: "Meteorological parameters sourced from Open-Meteo NWP forecast.",

    // Alerts Page Specifics
    autonomousThresholdEngine: "AUTONOMOUS THRESHOLD EVENT ENGINE",
    mockDispatchNote: "(Mock multi-channel dispatch; no real SMS gateway billed)",
    judgeDemoSimulation: "Judge Demo Simulation",
    sourceLabel: "Source:",
    issuedLabel: "Issued:",
    takePrecautionary: "Take precautionary field measures immediately.",
    navDashboard: "Dashboard",
    navVerification: "Verification Lab",
    navAdvisory: "AI Advisory",
    navAlerts: "Alerts",
    navReport: "Report Weather",
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
    locationPrompt: "Location",
    enterLocationSearch: "Search or enter village name (e.g. Khanna, Baramati, Anand...)",
    searchLocationPlaceholder: "Type village, block, or state...",
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
    autonomousEngine: "AUTONOMOUS THRESHOLD EVENT ENGINE",
    allParametersSafeDesc: "All meteorological parameters (24h rain < 64.5 mm, wind < 40 km/h, temperature < 42°C, and monsoon break risk) are currently within safe agronomic thresholds for",
    heavyRainThreshold: "Rain ≥ 64.5 mm / 24h",
    strongWindThreshold: "Wind ≥ 40 km/h",
    heatThreshold: "Max Temp ≥ 42°C",
    breakRiskThreshold: "Monsoon Break: HIGH",
    mockDispatchNote: "(Mock multi-channel dispatch; no real SMS gateway billed)",
    judgeDemoSimulation: "⚡ Judge Demo Simulation",
    parameterTrigger: "Trigger",
    source: "Source",
    issued: "Issued",
    alertsDataFooter: "Data: Open-Meteo NWP Forecast & IMD Threshold Standards (64.5 mm / 24h Heavy Rain, 40 km/h Wind, 42°C Heat).",
    syncingTelemetry: "Syncing atmospheric telemetry...",
    generatingAdvisory: "Generating ICAR decision advisory...",
    consensusMonitoring: "Consensus synthesis active across satellite and local ground telemetry.",
    monitoringGroundConsensus: "Monitoring atmospheric conditions and ground reports for consensus.",

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
    connecting: "Syncing atmospheric telemetry...",
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
    validationTitle: "ऐतिहासिक मानसून आगमन सत्यापन (खन्ना ब्लॉक)",
    validationSubtitle: "ओपन-मेटियो ERA5 रीएनालिसिस बैक-टेस्ट (2023–2026)",
    meanOnsetErrorLabel: "औसत आगमन त्रुटि: ~3 दिन (बैक-टेस्ट, 1 ब्लॉक)",
    validationCaveat: "एकल ब्लॉक, 4 वर्ष, अनुमानित जलवायु विज्ञान - बड़े पैमाने पर IMD ग्रिडेड डेटा आवश्यक है।",
    colYear: "वर्ष",
    colDetectedOnset: "पहचाना गया आगमन",
    colNormal: "सामान्य",
    colErrorDays: "त्रुटि (दिन)",
    btnCopyDeck: "डेक के लिए सारांश कॉपी करें",
    copied: "कॉपी हो गया!",
    validationToggleExpand: "4-वर्षीय बैकटेस्ट सत्यापन देखें (2023–2026) ▼",
    validationToggleCollapse: "ऐतिहासिक सत्यापन छुपाएं ▲",
    lowBandwidthMode: "कम-बैंडविड्थ मोड",
    lowBandwidthDesc: "अंतिम मौसम डेटा को localStorage में सुरक्षित करता है; 2G ऑफ़लाइन बैकअप",
    cachedBadge: "कैश्ड (सहेजा गया)",
    simulateNetworkDrop: "नेटवर्क डिस्कनेक्ट सिमुलेशन",
    mockDispatchLine: "डिलीवरी: ऐप पुश · एसएमएस (2G पर ऑटो-फ़ॉलबैक) · व्हाट्सएप",
    deliveryLabel: "डिलीवरी माध्यम:",
    appPushLabel: "ऐप पुश",
    smsFallbackLabel: "एसएमएस (2G पर ऑटो-फ़ॉलबैक)",
    whatsappLabel: "व्हाट्सएप",
    prototypeLabel: "प्रोटोटाइप",

    // Monsoon Presets & Details
    monsoonPresetsTitle: "डेमो प्रीसेट (जज पूर्वावलोकन):",
    presetLive: "सामान्य (लाइव)",
    presetApproaching: "आगमन निकट (डेमो)",
    presetActive: "सक्रिय मानसून (डेमो)",
    presetBreakRisk: "ब्रेक जोखिम (डेमो)",
    monsoonBreakAlertActive: "मानसून ब्रेक अलर्ट सक्रिय: 7-दिवसीय वर्षा केवल 6 मिमी (उच्च ब्रेक जोखिम)। अलर्ट टैब और डैशबोर्ड पर प्रेषित।",
    viewInAlerts: "अलर्ट टैब में देखें →",
    effectiveOnsetDetected: "प्रभावी मानसून आगमन दर्ज:",
    criteriaMet: "(पाई आदि मानदंड पूर्ण)",
    onsetCriteriaDesc: "मानदंड: 5 दिनों में कुल वर्षा ≥ 40 मिमी और ≥ 2 दिन ≥ 2.5 मिमी",
    breakThresholdDesc: "ब्रेक सीमा: <10 मिमी (उच्च), <15 मिमी (मध्यम)",
    next7DaysForecast: "अगले 7 दिनों का पूर्वानुमान (मिमी/दिन):",
    confidenceBreakdownTitle: "विश्वास स्कोर का आधार:",
    heuristicConfidence: "गणितीय विश्वास स्कोर",
    heuristicDisclaimer: "*गणितीय स्कोर मौसम मॉडल अंतर पर आधारित है; कोई सांख्यिकीय संभावना नहीं।",
    phaseLabel: "चरण:",
    nonCalibrated: "गैर-कैलिब्रेटेड",

    // Advisory Page Specifics
    icarStyleThresholds: "ICAR कृषि सीमा मानदंड",
    selectActiveFarmCrop: "सक्रिय खेत की फसल चुनें:",
    telemetryOpenMeteo: "मौसम डेटा: ओपन-मेटियो NWP पूर्वानुमान",
    rain7dLabel: "7-दिन वर्षा:",
    windLabel: "हवा:",
    nextRainOutlook: "अगली वर्षा का अनुमान:",
    risk48hRain: "48 घंटे वर्षा जोखिम:",
    leaching24h: "24 घंटे उर्वरक बहाव:",
    ruleIrrigation: "नियम: ≥15 मिमी (रोकें) · 5–15 मिमी (आधी करें) · <5 मिमी (सिंचाई करें)",
    ruleSpraying: "नियम: हवा >12 किमी/घंटा या बारिश <24 घंटे → छिड़काव न करें",
    ruleHarvesting: "नियम: 48 घंटे में बारिश → शीघ्र कटाई करें / उपज ढकें",
    ruleFertilizer: "नियम: 24 घंटे में बारिश → खाद रोकें (पोषक तत्व बहने से बचाएं)",
    honestTransparency: "पारदर्शिता:",
    telemetrySourceFooter: "मौसम संबंधी आंकड़े ओपन-मेटियो NWP पूर्वानुमान से प्राप्त।",

    // Alerts Page Specifics
    autonomousThresholdEngine: "स्वायत्त सीमा चेतावनी इंजन",
    mockDispatchNote: "(मॉक मल्टी-चैनल डिलीवरी; कोई वास्तविक एसएमएस गेटवे शुल्क नहीं)",
    judgeDemoSimulation: "जज डेमो सिमुलेशन",
    sourceLabel: "स्रोत:",
    issuedLabel: "जारी:",
    takePrecautionary: "तुरंत एहतियाती कृषि कदम उठाएं।",
    navDashboard: "डैशबोर्ड",
    navVerification: "सत्यापन लैब",
    navAdvisory: "कृषि सलाह",
    navAlerts: "चेतावनी",
    navReport: "मौसम दर्ज करें",
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
    locationPrompt: "स्थान / गाँव",
    enterLocationSearch: "गाँव या ब्लॉक का नाम खोजें या दर्ज करें (उदा. खन्ना, बारामती, आणंद...)",
    searchLocationPlaceholder: "गाँव, ब्लॉक या राज्य का नाम लिखें...",
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
    alertsSub: "सक्रिय मौसम संबंधी अलर्ट एवं तत्काल सुरक्षात्मक उपाय -",
    actionRequired: "आवश्यक कार्रवाई",
    immediateAction: "तत्काल कदम",
    triggerMetric: "ट्रिगर मीट्रिक",
    noAlerts: "इस गाँव के लिए कोई गंभीर मौसम चेतावनी सक्रिय नहीं है।",
    demoInjectAlert: "डेमो: अलर्ट सिमुलेट करें",
    demoClearAlert: "डेमो अलर्ट हटाएं",
    autonomousEngine: "स्वायत्त थ्रेशोल्ड इवेंट इंजन",
    allParametersSafeDesc: "सभी मौसम संबंधी पैरामीटर (24 घंटे की वर्षा < 64.5 मिमी, हवा < 40 किमी/घंटा, तापमान < 42°C, और मानसून ब्रेक जोखिम) वर्तमान में सुरक्षित कृषि सीमा में हैं -",
    heavyRainThreshold: "वर्षा ≥ 64.5 मिमी / 24घंटे",
    strongWindThreshold: "हवा ≥ 40 किमी/घंटा",
    heatThreshold: "अधिकतम तापमान ≥ 42°C",
    breakRiskThreshold: "मानसून ब्रेक: उच्च (HIGH)",
    mockDispatchNote: "(प्रोटोटाइप मल्टी-चैनल डिलीवरी; कोई वास्तविक एसएमएस गेटवे शुल्क नहीं)",
    judgeDemoSimulation: "⚡ जज डेमो सिमुलेशन",
    parameterTrigger: "ट्रिगर",
    source: "स्रोत",
    issued: "जारी किया गया",
    alertsDataFooter: "डेटा: Open-Meteo NWP पूर्वानुमान एवं IMD मानक (64.5 मिमी / 24घं भारी वर्षा, 40 किमी/घंटा हवा, 42°C गर्मी)।",
    syncingTelemetry: "मौसम संबंधी आंकड़े सिंक हो रहे हैं...",
    generatingAdvisory: "ICAR कृषि सलाह तैयार की जा रही है...",
    consensusMonitoring: "उपग्रह और स्थानीय भू-डेटा के बीच सहमति विश्लेषण सक्रिय है।",
    monitoringGroundConsensus: "सहमति के लिए वायुमंडलीय स्थितियों और जमीनी रिपोर्टों की निगरानी की जा रही है।",

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
    connecting: "मौसम संबंधी आंकड़े सिंक हो रहे हैं...",
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
    validationTitle: "ਇਤਿਹਾਸਕ ਮਾਨਸੂਨ ਆਮਦ ਤਸਦੀਕ (ਖੰਨਾ ਬਲਾਕ)",
    validationSubtitle: "ਓਪਨ-ਮੇਟੀਓ ERA5 ਪੁਨਰ-ਵਿਸ਼ਲੇਸ਼ਣ ਬੈਕ-ਟੈਸਟ (2023–2026)",
    meanOnsetErrorLabel: "ਔਸਤ ਆਮਦ ਗ਼ਲਤੀ: ~3 ਦਿਨ (ਬੈਕ-ਟੈਸਟ, 1 ਬਲਾਕ)",
    validationCaveat: "ਸਿੰਗਲ ਬਲਾਕ, 4 ਸਾਲ, ਅੰਦਾਜ਼ਨ ਜਲਵਾਯੂ - ਵੱਡੇ ਪੈਮਾਨੇ 'ਤੇ IMD ਗ੍ਰਿਡਡ ਡੇਟਾ ਦੀ ਲੋੜ ਹੈ।",
    colYear: "ਸਾਲ",
    colDetectedOnset: "ਦਰਜ ਆਮਦ",
    colNormal: "ਆਮ",
    colErrorDays: "ਗ਼ਲਤੀ (ਦਿਨ)",
    btnCopyDeck: "ਡੈੱਕ ਲਈ ਸਾਰ ਕਾਪੀ ਕਰੋ",
    copied: "ਕਾਪੀ ਹੋ ਗਿਆ!",
    validationToggleExpand: "4-ਸਾਲਾ ਬੈਕ-ਟੈਸਟ ਤਸਦੀਕ ਵੇਖੋ (2023–2026) ▼",
    validationToggleCollapse: "ਇਤਿਹਾਸਕ ਤਸਦੀਕ ਛੁਪਾਓ ▲",
    lowBandwidthMode: "ਘੱਟ-ਬੈਂਡਵਿਡਥ ਮੋਡ",
    lowBandwidthDesc: "ਆਖ਼ਰੀ ਮੌਸਮ ਡੇਟਾ localStorage ਵਿੱਚ ਸੁਰੱਖਿਅਤ; 2G ਆਫ਼ਲਾਈਨ ਬੈਕਅੱਪ",
    cachedBadge: "ਕੈਸ਼ਡ (ਸੁਰੱਖਿਅਤ)",
    simulateNetworkDrop: "ਨੈੱਟਵਰਕ ਡਿਸਕਨੈਕਟ ਸਿਮੂਲੇਸ਼ਨ",
    mockDispatchLine: "ਡਿਲੀਵਰੀ: ਐਪ ਪੁਸ਼ · SMS (2G 'ਤੇ ਆਟੋ-ਫਾਲਬੈਕ) · ਵਟਸਐਪ",
    deliveryLabel: "ਡਿਲੀਵਰੀ ਚੈਨਲ:",
    appPushLabel: "ਐਪ ਪੁਸ਼",
    smsFallbackLabel: "SMS (2G 'ਤੇ ਆਟੋ-ਫਾਲਬੈਕ)",
    whatsappLabel: "ਵਟਸਐਪ",
    prototypeLabel: "ਪ੍ਰੋਟੋਟਾਈਪ",

    // Monsoon Presets & Details
    monsoonPresetsTitle: "ਡੈਮੋ ਪ੍ਰੀਸੈੱਟ (ਜੱਜ ਪ੍ਰੀਵਿਊ):",
    presetLive: "ਸਧਾਰਨ (ਲਾਈਵ)",
    presetApproaching: "ਆਮਦ ਨੇੜੇ (ਡੈਮੋ)",
    presetActive: "ਸਰਗਰਮ ਮਾਨਸੂਨ (ਡੈਮੋ)",
    presetBreakRisk: "ਬ੍ਰੇਕ ਖ਼ਤਰਾ (ਡੈਮੋ)",
    monsoonBreakAlertActive: "ਮਾਨਸੂਨ ਬ੍ਰੇਕ ਅਲਰਟ ਸਰਗਰਮ: 7-ਦਿਨਾਂ ਮੀਂਹ ਕੇਵਲ 6 ਮਿਲੀਮੀਟਰ (ਉੱਚ ਬ੍ਰੇਕ ਖ਼ਤਰਾ)। ਅਲਰਟ ਟੈਬ ਅਤੇ ਡੈਸ਼ਬੋਰਡ 'ਤੇ ਭੇਜਿਆ ਗਿਆ।",
    viewInAlerts: "ਅਲਰਟ ਟੈਬ ਵਿੱਚ ਦੇਖੋ →",
    effectiveOnsetDetected: "ਪ੍ਰਭਾਵੀ ਮਾਨਸੂਨ ਆਮਦ ਦਰਜ:",
    criteriaMet: "(ਪਾਈ ਆਦਿ ਮਾਪਦੰਡ ਪੂਰੇ)",
    onsetCriteriaDesc: "ਮਾਪਦੰਡ: 5 ਦਿਨਾਂ ਵਿੱਚ ਕੁੱਲ ਮੀਂਹ ≥ 40 ਮਿਲੀਮੀਟਰ ਅਤੇ ≥ 2 ਦਿਨ ≥ 2.5 ਮਿਲੀਮੀਟਰ",
    breakThresholdDesc: "ਬ੍ਰੇਕ ਸੀਮਾ: <10 ਮਿਲੀਮੀਟਰ (ਉੱਚ), <15 ਮਿਲੀਮੀਟਰ (ਦਰਮਿਆਨਾ)",
    next7DaysForecast: "ਅਗਲੇ 7 ਦਿਨਾਂ ਦਾ ਪੂਰਵ-ਅਨੁਮਾਨ (ਮਿਲੀਮੀਟਰ/ਦਿਨ):",
    confidenceBreakdownTitle: "ਭਰੋਸੇਯੋਗਤਾ ਸਕੋਰ ਦਾ ਆਧਾਰ:",
    heuristicConfidence: "ਹਿਊਰਿਸਟਿਕ ਭਰੋਸੇਯੋਗਤਾ",
    heuristicDisclaimer: "*ਹਿਊਰਿਸਟਿਕ ਸਕੋਰ ਮੌਸਮ ਮਾਡਲ ਅੰਤਰ 'ਤੇ ਅਧਾਰਿਤ ਹੈ; ਕੋਈ ਸੰਭਾਵਨਾ ਨਹੀਂ।",
    phaseLabel: "ਪੜਾਅ:",
    nonCalibrated: "ਗੈਰ-ਕੈਲੀਬ੍ਰੇਟਿਡ",

    // Advisory Page Specifics
    icarStyleThresholds: "ICAR ਖੇਤੀ ਮਾਪਦੰਡ",
    selectActiveFarmCrop: "ਖੇਤ ਦੀ ਫ਼ਸਲ ਚੁਣੋ:",
    telemetryOpenMeteo: "ਮੌਸਮ ਡਾਟਾ: ਓਪਨ-ਮੈਟਿਓ NWP ਪੂਰਵ-ਅਨੁਮਾਨ",
    rain7dLabel: "7-ਦਿਨ ਮੀਂਹ:",
    windLabel: "ਹਵਾ:",
    nextRainOutlook: "ਅਗਲੇ ਮੀਂਹ ਦਾ ਅਨੁਮਾਨ:",
    risk48hRain: "48 ਘੰਟੇ ਮੀਂਹ ਖ਼ਤਰਾ:",
    leaching24h: "24 ਘੰਟੇ ਖਾਦ ਬਹਾਅ:",
    ruleIrrigation: "ਨਿਯਮ: ≥15 ਮਿਲੀਮੀਟਰ (ਰੋਕੋ) · 5–15 ਮਿਲੀਮੀਟਰ (ਅੱਧੀ ਕਰੋ) · <5 ਮਿਲੀਮੀਟਰ (ਸਿੰਚਾਈ ਕਰੋ)",
    ruleSpraying: "ਨਿਯਮ: ਹਵਾ >12 ਕਿਮੀ/ਘੰਟਾ ਜਾਂ ਮੀਂਹ <24 ਘੰਟੇ → ਛਿੜਕਾਅ ਨਾ ਕਰੋ",
    ruleHarvesting: "ਨਿਯਮ: 48 ਘੰਟਿਆਂ ਵਿੱਚ ਮੀਂਹ → ਜਲਦੀ ਵਾਢੀ ਕਰੋ / ਫ਼ਸਲ ਢੱਕੋ",
    ruleFertilizer: "ਨਿਯਮ: 24 ਘੰਟਿਆਂ ਵਿੱਚ ਮੀਂਹ → ਖਾਦ ਰੋਕੋ (ਖੁਰਾਕੀ ਤੱਤ ਰੁੜ੍ਹਨ ਤੋਂ ਬਚਾਓ)",
    honestTransparency: "ਪਾਰਦਰਸ਼ਤਾ:",
    telemetrySourceFooter: "ਮੌਸਮ ਡਾਟਾ ਓਪਨ-ਮੈਟਿਓ NWP ਪੂਰਵ-ਅਨੁਮਾਨ ਤੋਂ ਪ੍ਰਾਪਤ।",

    // Alerts Page Specifics
    autonomousThresholdEngine: "ਆਟੋਨੋਮਸ ਥ੍ਰੈਸ਼ਹੋਲਡ ਅਲਰਟ ਇੰਜਣ",
    mockDispatchNote: "(ਮੌਕ ਮਲਟੀ-ਚੈਨਲ ਡਿਸਪੈਚ; ਕੋਈ ਅਸਲ SMS ਗੇਟਵੇ ਬਿਲ ਨਹੀਂ)",
    judgeDemoSimulation: "ਜੱਜ ਡੈਮੋ ਸਿਮੂਲੇਸ਼ਨ",
    sourceLabel: "ਸਰੋਤ:",
    issuedLabel: "ਜਾਰੀ:",
    takePrecautionary: "ਤੁਰੰਤ ਖੇਤ ਵਿੱਚ ਸਾਵਧਾਨੀ ਦੇ ਕਦਮ ਚੁੱਕੋ।",
    navDashboard: "ਡੈਸ਼ਬੋਰਡ",
    navVerification: "ਤਸਦੀਕ ਲੈਬ",
    navAdvisory: "ਖੇਤੀ ਸਲਾਹ",
    navAlerts: "ਚੇਤਾਵਨੀਆਂ",
    navReport: "ਮੌਸਮ ਦਰਜ ਕਰੋ",
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
    locationPrompt: "ਸਥਾਨ / ਪਿੰਡ",
    enterLocationSearch: "ਪਿੰਡ ਜਾਂ ਬਲਾਕ ਦਾ ਨਾਮ ਖੋਜੋ ਜਾਂ ਦਰਜ ਕਰੋ (ਜਿਵੇਂ ਖੰਨਾ, ਬਾਰਾਮਤੀ, ਆਨੰਦ...)",
    searchLocationPlaceholder: "ਪਿੰਡ, ਬਲਾਕ ਜਾਂ ਰਾਜ ਦਾ ਨਾਮ ਲਿਖੋ...",
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
    alertsSub: "ਸਰਗਰਮ ਮੌਸਮੀ ਅਲਰਟ ਅਤੇ ਜ਼ਰੂਰੀ ਬਚਾਅ ਉਪਾਅ -",
    actionRequired: "ਲੋੜੀਂਦੀ ਕਾਰਵਾਈ",
    immediateAction: "ਤੁਰੰਤ ਕਦਮ",
    triggerMetric: "ਟ੍ਰਿਗਰ ਮੀਟ੍ਰਿਕ",
    noAlerts: "ਇਸ ਪਿੰਡ ਲਈ ਕੋਈ ਗੰਭੀਰ ਮੌਸਮ ਚੇਤਾਵਨੀ ਸਰਗਰਮ ਨਹੀਂ ਹੈ।",
    demoInjectAlert: "ਡੈਮੋ: ਅਲਰਟ ਸਿਮੂਲੇਟ ਕਰੋ",
    demoClearAlert: "ਡੈਮੋ ਅਲਰਟ ਹਟਾਓ",
    autonomousEngine: "ਸਵੈ-ਚਾਲਿਤ ਥ੍ਰੈਸ਼ਹੋਲਡ ਈਵੈਂਟ ਇੰਜਣ",
    allParametersSafeDesc: "ਸਾਰੇ ਮੌਸਮੀ ਪੈਰਾਮੀਟਰ (24 ਘੰਟੇ ਮੀਂਹ < 64.5 ਮਿਲੀਮੀਟਰ, ਹਵਾ < 40 ਕਿਲੋਮੀਟਰ/ਘੰਟਾ, ਤਾਪਮਾਨ < 42°C, ਅਤੇ ਮਾਨਸੂਨ ਬ੍ਰੇਕ ਖ਼ਤਰਾ) ਫ਼ਿਲਹਾਲ ਸੁਰੱਖਿਅਤ ਖੇਤੀ ਸੀਮਾ ਵਿੱਚ ਹਨ -",
    heavyRainThreshold: "ਮੀਂਹ ≥ 64.5 ਮਿਲੀਮੀਟਰ / 24 ਘੰਟੇ",
    strongWindThreshold: "ਹਵਾ ≥ 40 ਕਿਲੋਮੀਟਰ/ਘੰਟਾ",
    heatThreshold: "ਵੱਧ ਤੋਂ ਵੱਧ ਤਾਪਮਾਨ ≥ 42°C",
    breakRiskThreshold: "ਮਾਨਸੂਨ ਬ੍ਰੇਕ: ਉੱਚ (HIGH)",
    mockDispatchNote: "(ਪ੍ਰੋਟੋਟਾਈਪ ਮਲਟੀ-ਚੈਨਲ ਡਿਲੀਵਰੀ; ਕੋਈ ਅਸਲ ਐਸਐਮਐਸ ਗੇਟਵੇ ਖ਼ਰਚਾ ਨਹੀਂ)",
    judgeDemoSimulation: "⚡ ਜੱਜ ਡੈਮੋ ਸਿਮੂਲੇਸ਼ਨ",
    parameterTrigger: "ਟ੍ਰਿਗਰ",
    source: "ਸਰੋਤ",
    issued: "ਜਾਰੀ ਕੀਤਾ ਗਿਆ",
    alertsDataFooter: "ਡਾਟਾ: Open-Meteo NWP ਪੂਰਵ-ਅਨੁਮਾਨ ਅਤੇ IMD ਮਾਪਦੰਡ (64.5 ਮਿਲੀਮੀਟਰ / 24 ਘੰਟੇ ਭਾਰੀ ਮੀਂਹ, 40 ਕਿਲੋਮੀਟਰ/ਘੰਟਾ ਹਵਾ, 42°C ਗਰਮੀ)।",
    syncingTelemetry: "ਮੌਸਮ ਸੰਬੰਧੀ ਅੰਕੜੇ ਸਿੰਕ ਹੋ ਰਹੇ ਹਨ...",
    generatingAdvisory: "ICAR ਖੇਤੀ ਸਲਾਹ ਤਿਆਰ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...",
    consensusMonitoring: "ਸੈਟੇਲਾਈਟ ਅਤੇ ਸਥਾਨਕ ਜ਼ਮੀਨੀ ਡਾਟਾ ਵਿਚਕਾਰ ਸਹਿਮਤੀ ਵਿਸ਼ਲੇਸ਼ਣ ਸਰਗਰਮ ਹੈ।",
    monitoringGroundConsensus: "ਸਹਿਮਤੀ ਲਈ ਵਾਯੂਮੰਡਲੀ ਹਾਲਤਾਂ ਅਤੇ ਜ਼ਮੀਨੀ ਰਿਪੋਰਟਾਂ ਦੀ ਨਿਗਰਾਨੀ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ।",

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
    connecting: "ਮੌਸਮ ਸੰਬੰਧੀ ਅੰਕੜੇ ਸਿੰਕ ਹੋ ਰਹੇ ਹਨ...",
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
    'DECLARED': 'आगमन घोषित (DECLARED)',
    'IN PROGRESS': 'प्रगति पर (IN PROGRESS)',
    'IN_PROGRESS': 'प्रगति पर (IN PROGRESS)',
    'APPROACHING': 'आगमन निकट (APPROACHING)',
    'ACTIVE': 'सक्रिय (ACTIVE)',
    'ACTIVE_MONSOON': 'सक्रिय मानसून (ACTIVE)',
    'PRE_MONSOON': 'प्री-मानसून (PRE-MONSOON)',
    'BREAK_SPELL': 'ब्रेक स्पेल (BREAK SPELL)',
    'DELAYED': 'विलंबित (DELAYED)',
    'SAFE': 'सुरक्षित (SAFE)',
    'CAUTION': 'सावधानी (CAUTION)',
    'DANGER': 'खतरा (DANGER)',
    'NORMAL': 'सामान्य (NORMAL)',
    'Likely': 'संभावित',
    'Low': 'कम',
    'Safe Window': 'सुरक्षित समय',
    'High Risk': 'उच्च जोखिम',
    'HEAVY RAIN': 'भारी बारिश (HEAVY RAIN)',
    'STRONG WIND': 'तेज हवा (STRONG WIND)',
    'HEAT': 'अत्यधिक गर्मी (HEAT)',
    'BREAK RISK': 'मानसून ब्रेक (BREAK RISK)',
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
    'DECLARED': 'ਆਮਦ ਐਲਾਨੀ (DECLARED)',
    'IN PROGRESS': 'ਪ੍ਰਗਤੀ ਅਧੀਨ (IN PROGRESS)',
    'IN_PROGRESS': 'ਪ੍ਰਗਤੀ ਅਧੀਨ (IN PROGRESS)',
    'APPROACHING': 'ਆਮਦ ਨੇੜੇ (APPROACHING)',
    'ACTIVE': 'ਸਰਗਰਮ (ACTIVE)',
    'ACTIVE_MONSOON': 'ਸਰਗਰਮ ਮਾਨਸੂਨ (ACTIVE)',
    'PRE_MONSOON': 'ਪ੍ਰੀ-ਮਾਨਸੂਨ (PRE-MONSOON)',
    'BREAK_SPELL': 'ਬ੍ਰੇਕ ਸਪੈੱਲ (BREAK SPELL)',
    'DELAYED': 'ਦੇਰੀ ਨਾਲ (DELAYED)',
    'SAFE': 'ਸੁਰੱਖਿਅਤ (SAFE)',
    'CAUTION': 'ਸਾਵਧਾਨੀ (CAUTION)',
    'DANGER': 'ਖ਼ਤਰਾ (DANGER)',
    'NORMAL': 'ਸਧਾਰਨ (NORMAL)',
    'Likely': 'ਸੰਭਾਵਿਤ',
    'Low': 'ਘੱਟ',
    'Safe Window': 'ਸੁਰੱਖਿਅਤ ਸਮਾਂ',
    'High Risk': 'ਉੱਚ ਖ਼ਤਰਾ',
    'HEAVY RAIN': 'ਭਾਰੀ ਮੀਂਹ (HEAVY RAIN)',
    'STRONG WIND': 'ਤੇਜ਼ ਹਵਾ (STRONG WIND)',
    'HEAT': 'ਅਤਿ ਗਰਮੀ (HEAT)',
    'BREAK RISK': 'ਮਾਨਸੂਨ ਬ੍ਰੇਕ (BREAK RISK)',
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

    // Alerts Actions, Messages & Trigger Parameters (Hindi)
    if (text.includes('Avoid irrigation, protect harvested produce')) {
      return 'सिंचाई रोकें, कटी हुई फसल को सुरक्षित करें।';
    }
    if (text.includes('Secure vulnerable crops and structures')) {
      return 'कमजोर फसलों और संरचनाओं को सुरक्षित करें।';
    }
    if (text.includes('High temperature, check crop water needs')) {
      return 'अत्यधिक तापमान, फसल की पानी की जरूरत जांचें।';
    }
    if (text.includes('Monsoon break likely, plan irrigation backup')) {
      return 'मानसून ब्रेक की संभावना, सिंचाई का वैकल्पिक प्रबंध करें।';
    }
    if (text.includes('Severe Heavy Rain Warning')) {
      return 'अति भारी वर्षा चेतावनी (डेमो सिमुलेशन)';
    }
    if (text.includes('Monsoon Break Spell Warning')) {
      return 'मानसून ब्रेक ड्राई स्पेल चेतावनी (डेमो सिमुलेशन)';
    }
    if (text.includes('Forecast rainfall is 72.8 mm')) {
      return 'अगले 24 घंटों में 72.8 मिमी वर्षा का अनुमान है, जो मौसम विभाग IMD की भारी बारिश सीमा (64.5 मिमी) से अधिक है।';
    }
    if (text.includes('NWP multi-day ensemble projects extended dry spell')) {
      return 'मौसम मॉडल के अनुसार अगले 7 दिनों में सूखा मौसम (<10 मिमी वर्षा) रहने का अनुमान है।';
    }
    if (text.includes('Forecast Rain: 72.8 mm')) {
      return 'पूर्वानुमान वर्षा: 72.8 मिमी / 24 घंटे (≥ 64.5 मिमी)';
    }
    if (text.includes('Monsoon Break Risk: HIGH')) {
      return 'मानसून ब्रेक जोखिम: उच्च (<10 मिमी / 7 दिन)';
    }
    if (text.includes('Take precautionary field measures immediately')) {
      return 'तुरंत एहतियाती कृषि कदम उठाएं।';
    }

    // ICAR Rules Decisions (Hindi)
    if (text.includes('Skip irrigation; rain expected. Recheck after rain')) {
      return 'सिंचाई रोकें; वर्षा की संभावना है। वर्षा के बाद पुनः निरीक्षण करें।';
    }
    if (text.includes('Reduce irrigation by half and recheck soil moisture')) {
      return 'सिंचाई आधी कर दें और मिट्टी की नमी की पुनः जांच करें।';
    }
    if (text.includes('Irrigate as per crop stage; soil likely drying')) {
      return 'फसल अवस्था अनुसार सिंचाई करें; मिट्टी सूख रही है।';
    }
    if (text.includes('Do NOT spray (wind drift)')) {
      return 'छिड़काव न करें (हवा से दवा उड़ने का खतरा)।';
    }
    if (text.includes('Do NOT spray; rain will wash off')) {
      return 'छिड़काव न करें; बारिश से दवा धुल जाएगी।';
    }
    if (text.includes('Safe window: next 24-36h')) {
      return 'सुरक्षित समय: अगले 24-36 घंटे छिड़काव हेतु अनुकूल।';
    }
    if (text.includes('Harvest early / cover produce')) {
      return 'शीघ्र कटाई करें / कटी उपज को तिरपाल से ढकें।';
    }
    if (text.includes('Favorable for harvest')) {
      return 'कटाई एवं सुखाने हेतु अनुकूल मौसम।';
    }
    if (text.includes('Hold fertilizer; rain will leach nutrients')) {
      return 'उर्वरक प्रयोग रोकें; बारिश से पोषक तत्व बह जाएंगे।';
    }
    if (text.includes('Top-dress on schedule')) {
      return 'निर्धारित समय पर यूरिया/खाद की टॉप-ड्रेसिंग करें।';
    }
    if (text.includes('Rule-based ICAR advisory, not expert instruction')) {
      return 'नियम-आधारित ICAR सलाह, विशेषज्ञ निर्देश नहीं।';
    }

    // Next Rain Indicators (Hindi)
    if (text.includes('Rain likely within 24h')) {
      return '24 घंटे में बारिश की संभावना';
    }
    if (text.includes('Rain expected within 48h')) {
      return '48 घंटे में बारिश संभावित';
    }
    if (text.includes('None in next 48h')) {
      return 'अगले 48 घंटे में बारिश नहीं';
    }

    // Monsoon Presets Advisory (Hindi)
    if (text.includes('Onset approaching with substantial pre-monsoon showers')) {
      return 'मानसून आगमन निकट है और पर्याप्त प्री-मानसून वर्षा (~45 मिमी) संभावित है। खेत की मेड़बंदी पूरी करें और समय पर बुवाई के लिए प्रमाणित बीज प्राप्त करें।';
    }
    if (text.includes('Reduce or pause irrigation as pre-monsoon wetting begins')) {
      return 'सिंचाई कम करें या रोकें क्योंकि गाँव के सूक्ष्म-क्षेत्र में प्री-मानसून वर्षा शुरू हो रही है।';
    }
    if (text.includes('Monsoon declared active. Soil moisture profile optimal')) {
      return 'मानसून सक्रिय घोषित। मिट्टी की नमी बुवाई के लिए अनुकूल है। ब्लॉक की समय-सारणी अनुसार खरीफ फसलों की मानक बुवाई करें।';
    }
    if (text.includes('Maintain regular irrigation intervals as needed; supplement with tube-well')) {
      return 'आवश्यकतानुसार नियमित सिंचाई अंतराल बनाए रखें; मध्यम शुष्क अवधि में ट्यूबवेल से पूरक सिंचाई करें।';
    }
    if (text.includes('Monsoon active but extended dry break spell')) {
      return 'मानसून सक्रिय है परंतु लंबा ड्राई स्पेल (<10 मिमी वर्षा / 7 दिन) दर्ज हुआ है। नई रोपाई रोकें और खेत की नमी बचाएं।';
    }
    if (text.includes('Hold sowing until cumulative rain reaches at least 40 mm')) {
      return 'बुवाई तब तक रोकें जब तक 5 दिनों में कुल वर्षा 40 मिमी तक न पहुंच जाए। बीज डालने से पहले दैनिक वर्षा पर नज़र रखें।';
    }
    if (text.includes('Continue irrigation as needed. Supplement with available water storage')) {
      return 'आवश्यकतानुसार सिंचाई जारी रखें। शुष्क मौसम में उपलब्ध जल भंडारण का उपयोग करें।';
    }

    // Confidence Basis Items (Hindi)
    if (text.includes('Detected onset within ±7 days of climatological normal')) {
      return 'जलवायु सामान्य तिथि के ±7 दिनों के भीतर मानसून आगमन (+20)';
    }
    if (text.includes('NWP forecast agreement with seasonal timing')) {
      return 'मौसमी समय के साथ मौसम मॉडल का सामंजस्य (+20)';
    }
    if (text.includes('Pre-monsoon trough advancing northwestward')) {
      return 'प्री-मानसून ट्रफ उत्तर-पश्चिम की ओर बढ़ रहा है (+25)';
    }
    if (text.includes('Convective precipitation cluster within 150 km radius')) {
      return '150 किमी के दायरे में बादलों का समूह वर्षा दर्ज कर रहा है (+25)';
    }
    if (text.includes('Multi-model ensemble signals onset within 7-day window')) {
      return 'मल्टी-मॉडल पूर्वानुमान अगले 7 दिनों में आगमन का संकेत दे रहा है (+22)';
    }
    if (text.includes('Pai et al. threshold met: 5-day rain cumulative > 40 mm')) {
      return 'पाई आदि मानक पूर्ण: 5 दिनों में कुल वर्षा > 40 मिमी (+35)';
    }
    if (text.includes('Westerlies depth established up to 500 hPa')) {
      return '500 hPa तक मानसूनी पश्चिमी हवाओं की गहराई स्थापित (+30)';
    }
    if (text.includes('Surface relative humidity sustained above 70%')) {
      return 'सतह पर सापेक्ष आर्द्रता 70% से अधिक बनी हुई है (+20)';
    }
    if (text.includes('Monsoon trough shifted north toward Himalayan foothills')) {
      return 'मानसून ट्रफ उत्तर में हिमालय की तलहटी की ओर खिसक गया है (+35)';
    }
    if (text.includes('7-day rainfall forecast collapses below 10 mm threshold')) {
      return 'अगले 7 दिनों का वर्षा पूर्वानुमान 10 मिमी सीमा से नीचे गिर गया (+35)';
    }
    if (text.includes('Mid-tropospheric anticyclone encroaching Northwest India')) {
      return 'मध्य-क्षोभमंडलीय एंटीसाइक्लोन उत्तर-पश्चिम भारत पर सक्रिय (+18)';
    }

    // Agronomic Crop Guidance Notes (Hindi)
    if (text.includes('Crown Root Initiation (CRI at 21 days)')) {
      return 'ताज जड़ फुटाव (21 दिन पर CRI) और कल्ले फूटने की अवस्था में नमी अत्यंत जरूरी है। समतल खेतों में जलभराव से बचें।';
    }
    if (text.includes('Target broadleaf weedicide (2,4-D)')) {
      return 'चौड़ी पत्ती वाले खरपतवारनाशी (2,4-D) या पीला रतुआ फफूंदनाशक (प्रोपिकोनाजोल) का प्रयोग करें। पत्तियां सूखी होनी चाहिए।';
    }
    if (text.includes('Ensure grain moisture is below 12%')) {
      return 'भंडारण से पहले सुनिश्चित करें कि दानों में नमी 12% से कम हो ताकि घुन व फफूंद से बचाव हो सके।';
    }
    if (text.includes('Apply 2nd split of Urea (65 kg/acre)')) {
      return 'सिंचाई से पहले यूरिया की दूसरी किस्त (65 किग्रा/एकड़) डालें। नम मिट्टी में नाइट्रोजन का अवशोषण सबसे अच्छा होता है।';
    }
    if (text.includes('Maintain 2–5 cm standing water during active vegetative')) {
      return 'कल्ले फूटने के समय खेत में 2–5 सेमी पानी बनाए रखें। कटाई से पहले अतिरिक्त पानी निकाल दें।';
    }
    if (text.includes('Target stem borer or blast treatment')) {
      return 'तना छेदक या ब्लास्ट रोग के उपचार हेतु छिड़काव करें; दवा चिपकने हेतु कम से कम 4–6 घंटे बारिश न हो।';
    }
    if (text.includes('Drain field 10–14 days prior to harvest')) {
      return 'कटाई से 10–14 दिन पहले खेत से पानी निकाल दें। सूखती धान की पूलों को ओस और नमी से बचाएं।';
    }
    if (text.includes('Apply nitrogen in 3 equal splits')) {
      return 'नाइट्रोजन को 3 बराबर किस्तों में डालें: बुवाई पर, कल्ले फूटने पर और बालियां निकलने पर। बहते पानी में न डालें।';
    }
    if (text.includes('Maize is highly sensitive to waterlogging')) {
      return 'मक्का जलभराव के प्रति अत्यंत संवेदनशील है। जल निकासी की नालियां साफ़ रखें; नर मंजरी आने पर नालियों में सिंचाई करें।';
    }
    if (text.includes('Direct spray into leaf whorls for Fall Armyworm')) {
      return 'फॉल आर्मीवर्म (FAW) की रोकथाम के लिए शांत हवा (<12 किमी/घंटा) में पोंगे के अंदर सीधा छिड़काव करें।';
    }
    if (text.includes('Harvest cobs when outer husk turns dry parchment brown')) {
      return 'जब बाहरी छिलका सूखकर भूरा हो जाए तब भुट्टे तोड़ें। एफ्लाटॉक्सिन से बचाव हेतु <14% नमी तक धूप में सुखाएं।';
    }
    if (text.includes('Side-dress Urea (40 kg/acre) at knee-high stage')) {
      return 'घुटने की ऊंचाई (V6) पर कतारों के साथ यूरिया (40 किग्रा/एकड़) डालें और पौधे गिरने से बचाने हेतु मिट्टी चढ़ाएं।';
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

    // Alerts Actions, Messages & Trigger Parameters (Punjabi)
    if (text.includes('Avoid irrigation, protect harvested produce')) {
      return 'ਸਿੰਚਾਈ ਰੋਕੋ, ਵੱਢੀ ਹੋਈ ਫ਼ਸਲ ਨੂੰ ਸੁਰੱਖਿਅਤ ਕਰੋ।';
    }
    if (text.includes('Secure vulnerable crops and structures')) {
      return 'ਕਮਜ਼ੋਰ ਫ਼ਸਲਾਂ ਅਤੇ ਢਾਂਚਿਆਂ ਨੂੰ ਸਹਾਰਾ ਦਿਓ।';
    }
    if (text.includes('High temperature, check crop water needs')) {
      return 'ਅਤਿਅੰਤ ਗਰਮੀ, ਫ਼ਸਲ ਲਈ ਪਾਣੀ ਦੀ ਲੋੜ ਜਾਂਚੋ।';
    }
    if (text.includes('Monsoon break likely, plan irrigation backup')) {
      return 'ਮਾਨਸੂਨ ਬ੍ਰੇਕ ਦਾ ਖ਼ਤਰਾ, ਸਿੰਚਾਈ ਦਾ ਬੈਕਅੱਪ ਤਿਆਰ ਰੱਖੋ।';
    }
    if (text.includes('Severe Heavy Rain Warning')) {
      return 'ਬਹੁਤ ਭਾਰੀ ਮੀਂਹ ਦੀ ਚੇਤਾਵਨੀ (ਡੈਮੋ ਸਿਮੂਲੇਸ਼ਨ)';
    }
    if (text.includes('Monsoon Break Spell Warning')) {
      return 'ਮਾਨਸੂਨ ਬ੍ਰੇਕ ਚੇਤਾਵਨੀ (ਡੈਮੋ ਸਿਮੂਲੇਸ਼ਨ)';
    }
    if (text.includes('Forecast rainfall is 72.8 mm')) {
      return 'ਅਗਲੇ 24 ਘੰਟਿਆਂ ਵਿੱਚ 72.8 ਮਿਲੀਮੀਟਰ ਮੀਂਹ ਦਾ ਅਨੁਮਾਨ ਹੈ, ਜੋ ਮੌਸਮ ਵਿਭਾਗ ਦੀ ਭਾਰੀ ਮੀਂਹ ਸੀਮਾ (64.5 ਮਿਲੀਮੀਟਰ) ਤੋਂ ਵੱਧ ਹੈ।';
    }
    if (text.includes('NWP multi-day ensemble projects extended dry spell')) {
      return 'ਮੌਸਮ ਮਾਡਲ ਅਨੁਸਾਰ ਅਗਲੇ 7 ਦਿਨਾਂ ਵਿੱਚ ਲੰਮਾ ਸੁੱਕਾ ਵਕਫ਼ਾ (<10 ਮਿਲੀਮੀਟਰ ਮੀਂਹ) ਰਹਿਣ ਦਾ ਅਨੁਮਾਨ ਹੈ।';
    }
    if (text.includes('Forecast Rain: 72.8 mm')) {
      return 'ਪੂਰਵ-ਅਨੁਮਾਨ ਮੀਂਹ: 72.8 ਮਿਲੀਮੀਟਰ / 24 ਘੰਟੇ (≥ 64.5 ਮਿਲੀਮੀਟਰ)';
    }
    if (text.includes('Monsoon Break Risk: HIGH')) {
      return 'ਮਾਨਸੂਨ ਬ੍ਰੇਕ ਖ਼ਤਰਾ: ਉੱਚ (<10 ਮਿਲੀਮੀਟਰ / 7 ਦਿਨ)';
    }
    if (text.includes('Take precautionary field measures immediately')) {
      return 'ਤੁਰੰਤ ਖੇਤ ਵਿੱਚ ਸਾਵਧਾਨੀ ਦੇ ਕਦਮ ਚੁੱਕੋ।';
    }

    // ICAR Rules Decisions (Punjabi)
    if (text.includes('Skip irrigation; rain expected. Recheck after rain')) {
      return 'ਸਿੰਚਾਈ ਰੋਕੋ; ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ ਹੈ। ਮੀਂਹ ਤੋਂ ਬਾਅਦ ਮੁੜ ਜਾਂਚ ਕਰੋ।';
    }
    if (text.includes('Reduce irrigation by half and recheck soil moisture')) {
      return 'ਸਿੰਚਾਈ ਅੱਧੀ ਕਰ ਦਿਓ ਅਤੇ ਜ਼ਮੀਨ ਦੀ ਨਮੀ ਦੁਬਾਰਾ ਪਰਖੋ।';
    }
    if (text.includes('Irrigate as per crop stage; soil likely drying')) {
      return 'ਫ਼ਸਲ ਦੇ ਪੜਾਅ ਮੁਤਾਬਕ ਸਿੰਚਾਈ ਕਰੋ; ਜ਼ਮੀਨ ਸੁੱਕ ਰਹੀ ਹੈ।';
    }
    if (text.includes('Do NOT spray (wind drift)')) {
      return 'ਛਿੜਕਾਅ ਨਾ ਕਰੋ (ਤੇਜ਼ ਹਵਾ ਨਾਲ ਦਵਾਈ ਉੱਡਣ ਦਾ ਖ਼ਤਰਾ)।';
    }
    if (text.includes('Do NOT spray; rain will wash off')) {
      return 'ਛਿੜਕਾਅ ਨਾ ਕਰੋ; ਮੀਂਹ ਨਾਲ ਦਵਾਈ ਵਹਿ ਜਾਵੇਗੀ।';
    }
    if (text.includes('Safe window: next 24-36h')) {
      return 'ਸੁਰੱਖਿਅਤ ਸਮਾਂ: ਅਗਲੇ 24-36 ਘੰਟੇ ਛਿੜਕਾਅ ਲਈ ਢੁਕਵੇਂ ਹਨ।';
    }
    if (text.includes('Harvest early / cover produce')) {
      return 'ਜਲਦੀ ਵਾਢੀ ਕਰੋ / ਕੱਟੀ ਫ਼ਸਲ ਨੂੰ ਤਰਪਾਲ ਨਾਲ ਢੱਕੋ।';
    }
    if (text.includes('Favorable for harvest')) {
      return 'ਵਾਢੀ ਅਤੇ ਸੁਕਾਉਣ ਲਈ ਅਨੁਕੂਲ ਮੌਸਮ।';
    }
    if (text.includes('Hold fertilizer; rain will leach nutrients')) {
      return 'ਖਾਦ ਪਾਉਣੀ ਰੋਕੋ; ਮੀਂਹ ਨਾਲ ਖੁਰਾਕੀ ਤੱਤ ਜ਼ਮੀਨ ਵਿੱਚ ਰੁੜ੍ਹ ਜਾਣਗੇ।';
    }
    if (text.includes('Top-dress on schedule')) {
      return 'ਸਮਾਂ-ਸਾਰਣੀ ਅਨੁਸਾਰ ਯੂਰੀਆ/ਖਾਦ ਦੀ ਟਾਪ-ਡਰੈੱਸਿੰਗ ਕਰੋ।';
    }
    if (text.includes('Rule-based ICAR advisory, not expert instruction')) {
      return 'ਨਿਯਮ-ਅਧਾਰਿਤ ICAR ਸਲਾਹ, ਮਾਹਿਰ ਹਦਾਇਤ ਨਹੀਂ।';
    }

    // Next Rain Indicators (Punjabi)
    if (text.includes('Rain likely within 24h')) {
      return '24 ਘੰਟਿਆਂ ਵਿੱਚ ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ';
    }
    if (text.includes('Rain expected within 48h')) {
      return '48 ਘੰਟਿਆਂ ਵਿੱਚ ਮੀਂਹ ਸੰਭਾਵਿਤ';
    }
    if (text.includes('None in next 48h')) {
      return 'ਅਗਲੇ 48 ਘੰਟਿਆਂ ਵਿੱਚ ਮੀਂਹ ਨਹੀਂ';
    }

    // Monsoon Presets Advisory (Punjabi)
    if (text.includes('Onset approaching with substantial pre-monsoon showers')) {
      return 'ਮਾਨਸੂਨ ਆਮਦ ਨੇੜੇ ਹੈ ਅਤੇ ਚੰਗਾ ਪ੍ਰੀ-ਮਾਨਸੂਨ ਮੀਂਹ (~45 ਮਿਲੀਮੀਟਰ) ਪੈਣ ਦੀ ਸੰਭਾਵਨਾ ਹੈ। ਵੱਟਬੰਦੀ ਪੂਰੀ ਕਰੋ ਅਤੇ ਸਮੇਂ ਸਿਰ ਬਿਜਾਈ ਲਈ ਪ੍ਰਮਾਣਿਤ ਬੀਜ ਦਾ ਪ੍ਰਬੰਧ ਕਰੋ।';
    }
    if (text.includes('Reduce or pause irrigation as pre-monsoon wetting begins')) {
      return 'ਸਿੰਚਾਈ ਘਟਾਓ ਜਾਂ ਰੋਕੋ ਕਿਉਂਕਿ ਪਿੰਡ ਦੇ ਖੇਤਰ ਵਿੱਚ ਪ੍ਰੀ-ਮਾਨਸੂਨ ਨਮੀ ਸ਼ੁਰੂ ਹੋ ਚੁੱਕੀ ਹੈ।';
    }
    if (text.includes('Monsoon declared active. Soil moisture profile optimal')) {
      return 'ਮਾਨਸੂਨ ਸਰਗਰਮ ਐਲਾਨਿਆ ਗਿਆ। ਜ਼ਮੀਨ ਵਿੱਚ ਨਮੀ ਅਨੁਕੂਲ ਹੈ। ਬਲਾਕ ਸ਼ਡਿਊਲ ਅਨੁਸਾਰ ਸਾਉਣੀ ਫ਼ਸਲਾਂ ਦੀ ਬਿਜਾਈ ਅੱਗੇ ਵਧਾਓ।';
    }
    if (text.includes('Maintain regular irrigation intervals as needed; supplement with tube-well')) {
      return 'ਲੋੜ ਅਨੁਸਾਰ ਨਿਯਮਿਤ ਸਿੰਚਾਈ ਜਾਰੀ ਰੱਖੋ; ਸੁੱਕੇ ਵਕਫ਼ਿਆਂ ਦੌਰਾਨ ਟਿਊਬਵੈੱਲ ਦਾ ਸਹਾਰਾ ਲਓ।';
    }
    if (text.includes('Monsoon active but extended dry break spell')) {
      return 'ਮਾਨਸੂਨ ਸਰਗਰਮ ਹੈ ਪਰ ਲੰਮਾ ਸੁੱਕਾ ਵਕਫ਼ਾ (<10 ਮਿਲੀਮੀਟਰ ਮੀਂਹ / 7 ਦਿਨ) ਦੇਖਿਆ ਗਿਆ। ਨਵੀਂ ਪਨੀਰੀ ਲਾਉਣੀ ਰੋਕੋ ਅਤੇ ਨਮੀ ਬਚਾਓ।';
    }
    if (text.includes('Hold sowing until cumulative rain reaches at least 40 mm')) {
      return 'ਬਿਜਾਈ ਉਦੋਂ ਤੱਕ ਰੋਕੋ ਜਦੋਂ ਤੱਕ 5 ਦਿਨਾਂ ਵਿੱਚ ਕੁੱਲ ਮੀਂਹ 40 ਮਿਲੀਮੀਟਰ ਨਾ ਹੋ ਜਾਵੇ। ਬੀਜ ਪਾਉਣ ਤੋਂ ਪਹਿਲਾਂ ਰੋਜ਼ਾਨਾ ਮੀਂਹ \'ਤੇ ਨਜ਼ਰ ਰੱਖੋ।';
    }
    if (text.includes('Continue irrigation as needed. Supplement with available water storage')) {
      return 'ਲੋੜ ਅਨੁਸਾਰ ਸਿੰਚਾਈ ਜਾਰੀ ਰੱਖੋ। ਸੁੱਕੇ ਵਕਫ਼ਿਆਂ ਦੌਰਾਨ ਉਪਲਬਧ ਪਾਣੀ ਦੇ ਭੰਡਾਰ ਦੀ ਵਰਤੋਂ ਕਰੋ।';
    }

    // Confidence Basis Items (Punjabi)
    if (text.includes('Detected onset within ±7 days of climatological normal')) {
      return 'ਜਲਵਾਯੂ ਆਮ ਮਿਤੀ ਦੇ ±7 ਦਿਨਾਂ ਦੇ ਅੰਦਰ ਮਾਨਸੂਨ ਆਮਦ (+20)';
    }
    if (text.includes('NWP forecast agreement with seasonal timing')) {
      return 'ਮੌਸਮੀ ਸਮੇਂ ਨਾਲ ਮੌਸਮ ਮਾਡਲ ਦੀ ਸਹਿਮਤੀ (+20)';
    }
    if (text.includes('Pre-monsoon trough advancing northwestward')) {
      return 'ਪ੍ਰੀ-ਮਾਨਸੂਨ ਟਰੱਫ ਉੱਤਰ-ਪੱਛਮ ਵੱਲ ਵੱਧ ਰਿਹਾ ਹੈ (+25)';
    }
    if (text.includes('Convective precipitation cluster within 150 km radius')) {
      return '150 ਕਿਮੀ ਦੇ ਘੇਰੇ ਵਿੱਚ ਬੱਦਲਾਂ ਦਾ ਸਮੂਹ ਮੀਂਹ ਪਾ ਰਿਹਾ ਹੈ (+25)';
    }
    if (text.includes('Multi-model ensemble signals onset within 7-day window')) {
      return 'ਮਲਟੀ-ਮਾਡਲ ਪੂਰਵ-ਅਨੁਮਾਨ ਅਗਲੇ 7 ਦਿਨਾਂ ਵਿੱਚ ਆਮਦ ਦਾ ਸੰਕੇਤ ਦੇ ਰਿਹਾ ਹੈ (+22)';
    }
    if (text.includes('Pai et al. threshold met: 5-day rain cumulative > 40 mm')) {
      return 'ਪਾਈ ਆਦਿ ਮਾਪਦੰਡ ਪੂਰੇ: 5 ਦਿਨਾਂ ਵਿੱਚ ਕੁੱਲ ਮੀਂਹ > 40 ਮਿਲੀਮੀਟਰ (+35)';
    }
    if (text.includes('Westerlies depth established up to 500 hPa')) {
      return '500 hPa ਤੱਕ ਮਾਨਸੂਨੀ ਪੱਛਮੀ ਹਵਾਵਾਂ ਦਾ ਵਹਾਅ ਸਥਾਪਿਤ (+30)';
    }
    if (text.includes('Surface relative humidity sustained above 70%')) {
      return 'ਜ਼ਮੀਨ \'ਤੇ ਨਮੀ ਦੀ ਮਾਤਰਾ ਲਗਾਤਾਰ 70% ਤੋਂ ਵੱਧ (+20)';
    }
    if (text.includes('Monsoon trough shifted north toward Himalayan foothills')) {
      return 'ਮਾਨਸੂਨ ਟਰੱਫ ਉੱਤਰ ਵੱਲ ਹਿਮਾਲੀਅਨ ਤਲਹਟੀ ਵੱਲ ਖਿਸਕ ਗਿਆ ਹੈ (+35)';
    }
    if (text.includes('7-day rainfall forecast collapses below 10 mm threshold')) {
      return 'ਅਗਲੇ 7 ਦਿਨਾਂ ਦਾ ਮੀਂਹ ਪੂਰਵ-ਅਨੁਮਾਨ 10 ਮਿਲੀਮੀਟਰ ਤੋਂ ਘੱਟ ਗਿਆ ਹੈ (+35)';
    }
    if (text.includes('Mid-tropospheric anticyclone encroaching Northwest India')) {
      return 'ਮੱਧ-ਵਾਯੂਮੰਡਲੀ ਐਂਟੀਸਾਈਕਲੋਨ ਉੱਤਰ-ਪੱਛਮ ਭਾਰਤ \'ਤੇ ਸਰਗਰਮ (+18)';
    }

    // Agronomic Crop Guidance Notes (Punjabi)
    if (text.includes('Crown Root Initiation (CRI at 21 days)')) {
      return 'ਜੜ੍ਹ ਫੁੱਟਣ (21 ਦਿਨਾਂ \'ਤੇ CRI) ਅਤੇ ਫੋਟ ਕਰਨ ਵੇਲੇ ਨਮੀ ਬਹੁਤ ਜ਼ਰੂਰੀ ਹੈ। ਖੇਤਾਂ ਵਿੱਚ ਪਾਣੀ ਖੜ੍ਹਾ ਨਾ ਹੋਣ ਦਿਓ।';
    }
    if (text.includes('Target broadleaf weedicide (2,4-D)')) {
      return 'ਚੌੜੇ ਪੱਤੇ ਵਾਲੇ ਨਦੀਨਨਾਸ਼ਕ ਜਾਂ ਪੀਲੀ ਕੁੰਗੀ ਲਈ ਉੱਲੀਨਾਸ਼ਕ ਦਾ ਛਿੜਕਾਅ ਕਰੋ। ਪੱਤੇ ਸੁੱਕੇ ਹੋਣੇ ਚਾਹੀਦੇ ਹਨ।';
    }
    if (text.includes('Ensure grain moisture is below 12%')) {
      return 'ਭੰਡਾਰਨ ਤੋਂ ਪਹਿਲਾਂ ਦਾਣਿਆਂ ਵਿੱਚ ਨਮੀ 12% ਤੋਂ ਘੱਟ ਹੋਣੀ ਯਕੀਨੀ ਬਣਾਓ ਤਾਂ ਜੋ ਸੁੰਡੀ ਅਤੇ ਉੱਲੀ ਤੋਂ ਬਚਾਅ ਰਹੇ।';
    }
    if (text.includes('Apply 2nd split of Urea (65 kg/acre)')) {
      return 'ਸਿੰਚਾਈ ਤੋਂ ਪਹਿਲਾਂ ਯੂਰੀਆ ਦੀ ਦੂਜੀ ਕਿਸ਼ਤ (65 ਕਿਲੋ/ਏਕੜ) ਪਾਓ। ਸਿੱਲ੍ਹੀ ਜ਼ਮੀਨ ਵਿੱਚ ਨਾਈਟ੍ਰੋਜਨ ਵਧੀਆ ਅਸਰ ਕਰਦੀ ਹੈ।';
    }
    if (text.includes('Maintain 2–5 cm standing water during active vegetative')) {
      return 'ਫ਼ਸਲ ਦੇ ਵਾਧੇ ਸਮੇਂ ਖੇਤ ਵਿੱਚ 2–5 ਸੈਂਟੀਮੀਟਰ ਪਾਣੀ ਬਣਾ ਕੇ ਰੱਖੋ। ਵਾਢੀ ਤੋਂ ਪਹਿਲਾਂ ਵਾਧੂ ਪਾਣੀ ਕੱਢ ਦਿਓ।';
    }
    if (text.includes('Target stem borer or blast treatment')) {
      return 'ਤਣਾ ਛੇਦਕ ਜਾਂ ਝੁਲਸ ਰੋਗ ਦੇ ਇਲਾਜ ਲਈ ਛਿੜਕਾਅ ਕਰੋ; ਦਵਾਈ ਚਿਪਕਣ ਲਈ ਘੱਟੋ-ਘੱਟ 4–6 ਘੰਟੇ ਮੀਂਹ ਨਾ ਪਵੇ।';
    }
    if (text.includes('Drain field 10–14 days prior to harvest')) {
      return 'ਵਾਢੀ ਤੋਂ 10–14 ਦਿਨ ਪਹਿਲਾਂ ਖੇਤ ਸੁਕਾਓ। ਧੁੱਪੇ ਸੁੱਕ ਰਹੀ ਝੋਨੇ ਦੀ ਫ਼ਸਲ ਨੂੰ ਤਰੇਲ ਅਤੇ ਸਿੱਲ੍ਹ ਤੋਂ ਬਚਾਓ।';
    }
    if (text.includes('Apply nitrogen in 3 equal splits')) {
      return 'ਯੂਰੀਆ 3 ਬਰਾਬਰ ਕਿਸ਼ਤਾਂ ਵਿੱਚ ਪਾਓ: ਬਿਜਾਈ ਵੇਲੇ, ਫੋਟ ਵੇਲੇ ਅਤੇ ਗੋਭ ਵੇਲੇ। ਵਗਦੇ ਪਾਣੀ ਵਿੱਚ ਖਾਦ ਨਾ ਪਾਓ।';
    }
    if (text.includes('Maize is highly sensitive to waterlogging')) {
      return 'ਮੱਕੀ ਪਾਣੀ ਖੜ੍ਹਨ ਪ੍ਰਤੀ ਬਹੁਤ ਸੰਵੇਦਨਸ਼ੀਲ ਹੈ। ਨਿਕਾਸੀ ਨਾਲੀਆਂ ਸਾਫ਼ ਰੱਖੋ; ਛੱਲੀ ਬਣਨ ਵੇਲੇ ਸਿਆੜਾਂ ਵਿੱਚ ਸਿੰਚਾਈ ਕਰੋ।';
    }
    if (text.includes('Direct spray into leaf whorls for Fall Armyworm')) {
      return 'ਫਾਲ ਆਰਮੀਵਰਮ ਦੀ ਰੋਕਥਾਮ ਲਈ ਸ਼ਾਂਤ ਹਵਾ (<12 ਕਿਮੀ/ਘੰਟਾ) ਵਿੱਚ ਪੌਦੇ ਦੇ ਗੋਭੇ ਅੰਦਰ ਸਿੱਧਾ ਛਿੜਕਾਅ ਕਰੋ।';
    }
    if (text.includes('Harvest cobs when outer husk turns dry parchment brown')) {
      return 'ਜਦੋਂ ਬਾਹਰਲਾ ਛਿਲਕਾ ਸੁੱਕ ਕੇ ਭੂਰਾ ਹੋ ਜਾਵੇ ਤਾਂ ਛੱਲੀਆਂ ਤੋੜੋ। ਉੱਲੀ ਤੋਂ ਬਚਾਅ ਲਈ ਛੱਲੀਆਂ ਨੂੰ ਧੁੱਪੇ ਸੁਕਾਓ।';
    }
    if (text.includes('Side-dress Urea (40 kg/acre) at knee-high stage')) {
      return 'ਗੋਡੇ-ਗੋਡੇ ਫ਼ਸਲ ਹੋਣ (V6) \'ਤੇ ਕਤਾਰਾਂ ਵਿੱਚ ਯੂਰੀਆ (40 ਕਿਲੋ/ਏਕੜ) ਪਾਓ ਅਤੇ ਡਿੱਗਣ ਤੋਂ ਬਚਾਉਣ ਲਈ ਮਿੱਟੀ ਚੜ੍ਹਾਓ।';
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
