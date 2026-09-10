import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { MapPin, Sprout, ShieldCheck, Compass, Send, RefreshCw, AlertTriangle, CloudRain } from './icons';
import LanguageSelector from './LanguageSelector';
import LocationChamberSelector from './LocationChamberSelector';

export default function Navbar({ activeScreen, setActiveScreen }) {
  const {
    villages,
    selectedVillageId,
    setSelectedVillageId,
    demoScenario,
    setDemoScenario,
    setIsReportModalOpen,
    refresh,
    t,
    getVillageLabel
  } = useWeather();

  return (
    <header className="navbar">
      {/* Brand */}
      <div className="brand-section">
        <div className="brand-logo">
          <Sprout size={24} color="#fff" />
        </div>
        <div>
          <div className="brand-title">{t('brandTitle')}</div>
          <div className="brand-subtitle">{t('brandSubtitle')}</div>
        </div>
      </div>

      {/* Screen Navigation Tabs */}
      <nav className="nav-tabs">
        <button
          className={`nav-tab-btn ${activeScreen === 'monsoon' ? 'active' : ''}`}
          onClick={() => setActiveScreen('monsoon')}
        >
          <CloudRain size={14} color="#34d399" /> {t('navMonsoon') || 'Monsoon'}
        </button>

        <button
          className={`nav-tab-btn ${activeScreen === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveScreen('dashboard')}
        >
          <Compass size={14} /> {t('navDashboard')}
        </button>

        <button
          className={`nav-tab-btn ${activeScreen === 'verification' ? 'active' : ''}`}
          onClick={() => setActiveScreen('verification')}
        >
          <ShieldCheck size={14} /> {t('navVerification')}
        </button>

        <button
          className={`nav-tab-btn ${activeScreen === 'advisory' ? 'active' : ''}`}
          onClick={() => setActiveScreen('advisory')}
        >
          <Sprout size={14} /> {t('navAdvisory')}
        </button>

        <button
          className={`nav-tab-btn ${activeScreen === 'alerts' ? 'active' : ''}`}
          onClick={() => setActiveScreen('alerts')}
        >
          <AlertTriangle size={14} /> {t('navAlerts')}
        </button>
      </nav>

      {/* Controls: 3 Chambers, Scenario, Language, Report */}
      <div className="nav-controls">
        {/* 3-Chamber Location Selector (State -> Block -> Village) */}
        <LocationChamberSelector />

        {/* Demo Scenario Preset Toggle */}
        <div className="village-select-wrapper" style={{ padding: '4px 8px' }} title="Controlled presentation scenario">
          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{t('demoPresetLabel')}</span>
          <select
            className="village-select"
            value={demoScenario}
            onChange={(e) => setDemoScenario(e.target.value)}
            style={{ fontSize: '0.78rem', color: demoScenario === 'conflict_dry' ? '#f87171' : demoScenario === 'agreement_rain' ? '#34d399' : '#fff' }}
          >
            <option value="normal">{t('demoNormal')}</option>
            <option value="agreement_rain">{t('demoAgreement')}</option>
            <option value="conflict_dry">{t('demoConflict')}</option>
          </select>
        </div>

        {/* Language Selector */}
        <LanguageSelector />

        {/* Farmer Weather Report Quick Action */}
        <button
          className="btn-primary"
          onClick={() => setIsReportModalOpen(true)}
          style={{ padding: '8px 16px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Send size={14} /> {t('btnReportWeather')}
        </button>

        {/* Refresh button */}
        <button
          onClick={refresh}
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-secondary)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title="Refresh live telemetry"
        >
          <RefreshCw size={14} />
        </button>
      </div>
    </header>
  );
}
