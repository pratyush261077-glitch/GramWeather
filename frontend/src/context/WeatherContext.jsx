import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { fetchVillages, fetchVillageWeather } from '../services/weatherAPI';
import { fetchVillageObservations, submitFarmerObservation } from '../services/observationAPI';
import { fetchFarmingAdvisory, fetchFarmerAlerts, injectDemoAlert, clearDemoAlerts } from '../services/advisoryAPI';
import { runVerification } from '../services/verificationAPI';
import {
  getTranslation,
  getCropLabel,
  getConditionLabel,
  getStatusLabel,
  getTimeLabel,
  getIntensityLabel,
  getVillageLabel,
  translateDynamicText
} from '../utils/translations';

const WeatherContext = createContext(null);

export function WeatherProvider({ children }) {
  const [villages, setVillages] = useState([]);
  const [selectedVillageId, setSelectedVillageId] = useState('khanna');
  const [weatherData, setWeatherData] = useState(null);
  const [observations, setObservations] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [advisory, setAdvisory] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [language, setLanguage] = useState('en');
  const [demoScenario, setDemoScenario] = useState('normal'); // 'normal', 'agreement_rain', 'conflict_dry'
  const [isLoading, setIsLoading] = useState(true);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [latestVerification, setLatestVerification] = useState(null);

  // Low-Bandwidth Mode & localStorage Caching State
  const [isLowBandwidthMode, setIsLowBandwidthModeState] = useState(() => {
    try {
      return localStorage.getItem('gw_low_bandwidth_mode') === 'true';
    } catch {
      return false;
    }
  });
  const [simulateNetworkDrop, setSimulateNetworkDrop] = useState(false);
  const [isDataCached, setIsDataCached] = useState(false);
  const [lastCacheTime, setLastCacheTime] = useState(() => {
    try {
      return localStorage.getItem('gw_cache_timestamp') || null;
    } catch {
      return null;
    }
  });

  const setIsLowBandwidthMode = useCallback((val) => {
    setIsLowBandwidthModeState(val);
    try {
      localStorage.setItem('gw_low_bandwidth_mode', val ? 'true' : 'false');
    } catch (e) {
      console.warn('Failed to persist low bandwidth mode:', e);
    }
  }, []);

  // 1. Initial Villages Load
  useEffect(() => {
    async function initVillages() {
      try {
        const list = await fetchVillages();
        if (list && list.length > 0) {
          setVillages(list);
          setSelectedVillageId(list[0].id);
          if (list[0].primary_crops && list[0].primary_crops.length > 0) {
            setSelectedCrop(list[0].primary_crops[0]);
          }
        }
      } catch (err) {
        console.error('Error fetching villages:', err);
      }
    }
    initVillages();
  }, []);

  // 2. Load weather, observations, alerts, advisory whenever village or scenario changes
  const loadVillageIntelligence = useCallback(async (vId, scenario, crop, lang, offlineOverride = false) => {
    if (!vId) return;
    setIsLoading(true);

    const cacheKeyW = `gw_weather_${vId}`;
    const cacheKeyObs = `gw_obs_${vId}`;
    const cacheKeyAlert = `gw_alerts_${vId}`;
    const cacheKeyAdv = `gw_adv_${vId}_${crop}`;

    // If simulated offline or forced network failure:
    if (offlineOverride) {
      try {
        const cWeather = localStorage.getItem(cacheKeyW);
        const cObs = localStorage.getItem(cacheKeyObs);
        const cAlert = localStorage.getItem(cacheKeyAlert);
        const cAdv = localStorage.getItem(cacheKeyAdv);

        if (cWeather) {
          setWeatherData(JSON.parse(cWeather));
          setIsDataCached(true);
        }
        if (cObs) setObservations(JSON.parse(cObs));
        if (cAlert) setAlerts(JSON.parse(cAlert));
        if (cAdv) setAdvisory(JSON.parse(cAdv));
      } catch (err) {
        console.error('Error reading localStorage cache:', err);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    try {
      const [wRes, obsRes, alertRes, advRes] = await Promise.allSettled([
        fetchVillageWeather(vId, scenario),
        fetchVillageObservations(vId),
        fetchFarmerAlerts(vId, lang),
        fetchFarmingAdvisory(vId, crop, lang),
      ]);

      // Weather data handling with localStorage caching
      if (wRes.status === 'fulfilled' && wRes.value) {
        setWeatherData(wRes.value);
        setIsDataCached(false);
        try {
          localStorage.setItem(cacheKeyW, JSON.stringify(wRes.value));
          const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          localStorage.setItem('gw_cache_timestamp', nowStr);
          setLastCacheTime(nowStr);
        } catch (e) {
          console.warn('Cache write error:', e);
        }
      } else {
        // Network failed for weather! Fallback to cache
        try {
          const cWeather = localStorage.getItem(cacheKeyW);
          if (cWeather) {
            setWeatherData(JSON.parse(cWeather));
            setIsDataCached(true);
          }
        } catch (e) {
          console.error('Cache fallback error:', e);
        }
      }

      if (obsRes.status === 'fulfilled' && obsRes.value) {
        setObservations(obsRes.value);
        try { localStorage.setItem(cacheKeyObs, JSON.stringify(obsRes.value)); } catch {}
      } else {
        try {
          const cObs = localStorage.getItem(cacheKeyObs);
          if (cObs) setObservations(JSON.parse(cObs));
        } catch {}
      }

      if (alertRes.status === 'fulfilled' && alertRes.value) {
        setAlerts(alertRes.value);
        try { localStorage.setItem(cacheKeyAlert, JSON.stringify(alertRes.value)); } catch {}
      } else {
        try {
          const cAlert = localStorage.getItem(cacheKeyAlert);
          if (cAlert) setAlerts(JSON.parse(cAlert));
        } catch {}
      }

      if (advRes.status === 'fulfilled' && advRes.value) {
        setAdvisory(advRes.value);
        try { localStorage.setItem(cacheKeyAdv, JSON.stringify(advRes.value)); } catch {}
      } else {
        try {
          const cAdv = localStorage.getItem(cacheKeyAdv);
          if (cAdv) setAdvisory(JSON.parse(cAdv));
        } catch {}
      }
    } catch (err) {
      console.error('Error in loadVillageIntelligence, falling back to localStorage:', err);
      try {
        const cWeather = localStorage.getItem(cacheKeyW);
        if (cWeather) {
          setWeatherData(JSON.parse(cWeather));
          setIsDataCached(true);
        }
      } catch {}
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVillageIntelligence(selectedVillageId, demoScenario, selectedCrop, language, simulateNetworkDrop);
  }, [selectedVillageId, demoScenario, selectedCrop, language, simulateNetworkDrop, loadVillageIntelligence]);

  // Handle Village Switch
  const handleSelectVillage = (id) => {
    setSelectedVillageId(id);
    const v = villages.find((item) => item.id === id);
    if (v && v.primary_crops && v.primary_crops.length > 0) {
      setSelectedCrop(v.primary_crops[0]);
    }
  };

  // Submit Farmer Observation
  const handleReportWeather = async (payload) => {
    try {
      const res = await submitFarmerObservation({
        ...payload,
        village_id: selectedVillageId,
      });
      // Refresh observations
      const updated = await fetchVillageObservations(selectedVillageId);
      setObservations(updated);
      return res;
    } catch (err) {
      console.error('Submission error:', err);
      throw err;
    }
  };

  // Run Verification on an observation
  const handleVerify = async (observation, scenarioOverride) => {
    try {
      const result = await runVerification(
        observation,
        scenarioOverride || demoScenario
      );
      setLatestVerification(result);
      // Refresh observations to reflect updated status
      const updated = await fetchVillageObservations(selectedVillageId);
      setObservations(updated);
      return result;
    } catch (err) {
      console.error('Verification error:', err);
      throw err;
    }
  };

  // Demo alert injection and clear handlers
  const handleInjectDemoAlert = async (alertType = 'HEAVY RAIN') => {
    try {
      await injectDemoAlert(selectedVillageId, alertType);
      const updated = await fetchFarmerAlerts(selectedVillageId, language);
      setAlerts(updated);
      return updated;
    } catch (err) {
      console.error('Error injecting demo alert, applying local synthetic state:', err);
      const nowIso = new Date().toISOString();
      const synthetic = alertType === 'BREAK RISK' ? {
        id: `ALT_DEMO_BREAK_${Date.now()}`,
        village_id: selectedVillageId,
        type: "BREAK RISK",
        severity: "WARNING",
        title: "Monsoon Break Spell Warning (Demo Injection)",
        message: "NWP multi-day ensemble projects extended dry spell (<10 mm rain over next 7 days).",
        action_required: "Monsoon break likely, plan irrigation backup.",
        parameter_trigger: "Monsoon Break Risk: HIGH (<10 mm / 7d)",
        source_label: "GramWeather Monsoon Break Model (Pai et al. 2014)",
        timestamp: nowIso,
        is_injected: true,
        is_active: true
      } : {
        id: `ALT_DEMO_RAIN_${Date.now()}`,
        village_id: selectedVillageId,
        type: "HEAVY RAIN",
        severity: "CRITICAL",
        title: "Severe Heavy Rain Warning (Demo Injection)",
        message: "Forecast rainfall is 72.8 mm in next 24h, exceeding the IMD heavy rain threshold (64.5 mm).",
        action_required: "Avoid irrigation, protect harvested produce.",
        parameter_trigger: "Forecast Rain: 72.8 mm / 24h (≥ 64.5 mm)",
        source_label: "Open-Meteo NWP Forecast (Demo Synthetic Event)",
        timestamp: nowIso,
        is_injected: true,
        is_active: true
      };
      setAlerts(prev => [synthetic, ...(prev || []).filter(a => !a.is_injected)]);
    }
  };

  const handleClearDemoAlerts = async () => {
    try {
      await clearDemoAlerts(selectedVillageId);
      const updated = await fetchFarmerAlerts(selectedVillageId, language);
      setAlerts(updated);
    } catch (err) {
      console.error('Error clearing demo alerts:', err);
    }
  };

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const selectedVillage = useMemo(() => {
    return (
      villages.find((v) => v.id === selectedVillageId) || {
        id: 'khanna',
        name: 'Khanna',
        block: 'Khanna',
        district: 'Ludhiana',
        state: 'Punjab',
        latitude: 30.7071,
        longitude: 76.2166,
        elevation: 260,
        primary_crops: ['Wheat', 'Paddy', 'Maize'],
      }
    );
  }, [villages, selectedVillageId]);

  const currentState = selectedVillage.state || 'Punjab';
  const currentBlock = selectedVillage.block || selectedVillage.district || 'Khanna';

  // Chamber 1: Available unique States
  const availableStates = useMemo(() => {
    const states = Array.from(new Set(villages.map((v) => v.state))).filter(Boolean);
    return states.length > 0 ? states : ['Punjab'];
  }, [villages]);

  // Chamber 2: Available unique Blocks in selected State
  const availableBlocks = useMemo(() => {
    const blocks = Array.from(
      new Set(
        villages
          .filter((v) => v.state === currentState)
          .map((v) => v.block || v.district)
      )
    ).filter(Boolean);
    return blocks.length > 0 ? blocks : ['Khanna'];
  }, [villages, currentState]);

  // Chamber 3: Available Villages in selected State & Block
  const availableVillages = useMemo(() => {
    const list = villages.filter(
      (v) => v.state === currentState && (v.block || v.district) === currentBlock
    );
    return list.length > 0 ? list : [selectedVillage];
  }, [villages, currentState, currentBlock, selectedVillage]);

  // Cascading Selection Handlers
  const handleSelectState = (newState) => {
    const matchingVillages = villages.filter((v) => v.state === newState);
    if (matchingVillages.length > 0) {
      handleSelectVillage(matchingVillages[0].id);
    }
  };

  const handleSelectBlock = (newBlock) => {
    const matchingVillages = villages.filter(
      (v) => v.state === currentState && (v.block || v.district) === newBlock
    );
    if (matchingVillages.length > 0) {
      handleSelectVillage(matchingVillages[0].id);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        villages,
        selectedVillage,
        selectedVillageId,
        setSelectedVillageId: handleSelectVillage,
        // 3-Chamber Selection API
        currentState,
        currentBlock,
        availableStates,
        availableBlocks,
        availableVillages,
        handleSelectState,
        handleSelectBlock,
        handleSelectVillage,
        isLocationModalOpen,
        setIsLocationModalOpen,
        // Core Data
        weatherData,
        observations,
        alerts,
        advisory,
        selectedCrop,
        setSelectedCrop,
        language,
        setLanguage,
        t: (key) => getTranslation(key, language),
        getCropLabel: (crop) => getCropLabel(crop, language),
        getConditionLabel: (cond) => getConditionLabel(cond, language),
        getStatusLabel: (st) => getStatusLabel(st, language),
        getTimeLabel: (tm) => getTimeLabel(tm, language),
        getIntensityLabel: (it) => getIntensityLabel(it, language),
        getVillageLabel: (name) => getVillageLabel(name, language),
        translateText: (txt) => translateDynamicText(txt, language),
        demoScenario,
        setDemoScenario,
        isLoading,
        isReportModalOpen,
        latestVerification,
        submitReport: handleReportWeather,
        verifyReport: handleVerify,
        injectDemoAlert: handleInjectDemoAlert,
        clearDemoAlerts: handleClearDemoAlerts,
        // Low-Bandwidth & Offline Cache State
        isLowBandwidthMode,
        setIsLowBandwidthMode,
        simulateNetworkDrop,
        setSimulateNetworkDrop,
        isDataCached,
        lastCacheTime,
        refresh: () => loadVillageIntelligence(selectedVillageId, demoScenario, selectedCrop, language, simulateNetworkDrop),
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const ctx = useContext(WeatherContext);
  if (!ctx) throw new Error('useWeather must be used within WeatherProvider');
  return ctx;
}
