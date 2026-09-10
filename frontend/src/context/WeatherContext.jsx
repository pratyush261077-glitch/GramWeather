import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { fetchVillages, fetchVillageWeather } from '../services/weatherAPI';
import { fetchVillageObservations, submitFarmerObservation } from '../services/observationAPI';
import { fetchFarmingAdvisory, fetchFarmerAlerts } from '../services/advisoryAPI';
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
  const loadVillageIntelligence = useCallback(async (vId, scenario, crop, lang) => {
    if (!vId) return;
    setIsLoading(true);
    try {
      const [wRes, obsRes, alertRes, advRes] = await Promise.allSettled([
        fetchVillageWeather(vId, scenario),
        fetchVillageObservations(vId),
        fetchFarmerAlerts(vId, lang),
        fetchFarmingAdvisory(vId, crop, lang),
      ]);

      if (wRes.status === 'fulfilled') setWeatherData(wRes.value);
      if (obsRes.status === 'fulfilled') setObservations(obsRes.value);
      if (alertRes.status === 'fulfilled') setAlerts(alertRes.value);
      if (advRes.status === 'fulfilled') setAdvisory(advRes.value);
    } catch (err) {
      console.error('Error fetching village data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVillageIntelligence(selectedVillageId, demoScenario, selectedCrop, language);
  }, [selectedVillageId, demoScenario, selectedCrop, language, loadVillageIntelligence]);

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
        setIsReportModalOpen,
        latestVerification,
        submitReport: handleReportWeather,
        verifyReport: handleVerify,
        refresh: () => loadVillageIntelligence(selectedVillageId, demoScenario, selectedCrop, language),
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
