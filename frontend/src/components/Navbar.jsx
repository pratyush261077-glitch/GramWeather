import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { useAuth } from '../context/AuthContext';
import { MapPin, Sprout, ShieldCheck, Compass, Send, RefreshCw, AlertTriangle, CloudRain, LogOut } from './icons';
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
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      {/* Top Row: Brand on Left, Utility Controls on Right */}
      <div className="navbar-top-row">
        <div className="brand-section">
          <div className="brand-logo">
            <Sprout size={22} color="#fff" />
          </div>
          <div>
            <div className="brand-title">{t('brandTitle')}</div>
            <div className="brand-subtitle">{t('brandSubtitle')}</div>
          </div>
        </div>

        {/* Controls: 3 Chambers, Demo Scenario, Language, Report Weather, Refresh, User Chip */}
        <div className="nav-controls">
          {/* 3-Chamber Location Selector (State -> Block -> Village) */}
          <LocationChamberSelector />

          {/* Demo Scenario Preset Toggle (Desktop only; on mobile controlled via scenario buttons in screens) */}
          <div className="village-select-wrapper desktop-only" title="Controlled presentation scenario">
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

          {/* Farmer Weather Report Quick Action (Desktop only; on mobile accessible via sticky bottom nav) */}
          <button
            className={`btn-primary btn-report-weather desktop-only ${activeScreen === 'report' ? 'active' : ''}`}
            onClick={() => setActiveScreen('report')}
            title={t('btnReportWeather')}
          >
            <Send size={13} /> {t('btnReportWeather')}
          </button>

          {/* Refresh button */}
          <button
            onClick={refresh}
            className="refresh-btn desktop-only"
            title="Refresh live telemetry"
          >
            <RefreshCw size={13} />
          </button>

          {/* User Chip + Logout Button */}
          {user && (
            <div
              className="user-chip-wrapper"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '3px 8px 3px 10px',
                background: 'rgba(0, 0, 0, 0.45)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: 'var(--radius-full)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: user.role === 'officer' ? '#38bdf8' : '#10b981',
                    boxShadow: user.role === 'officer' ? '0 0 8px #38bdf8' : '0 0 8px #10b981',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#fff',
                    maxWidth: '120px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  title={`${user.name} (${user.email || user.phone || ''})`}
                >
                  {user.name}
                </span>
                <span
                  className="desktop-only"
                  style={{
                    fontSize: '0.62rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: user.role === 'officer' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                    color: user.role === 'officer' ? '#38bdf8' : '#34d399',
                    border: `1px solid ${user.role === 'officer' ? 'rgba(56, 189, 248, 0.4)' : 'rgba(16, 185, 129, 0.4)'}`,
                  }}
                >
                  {user.role === 'officer' ? 'Officer' : 'Farmer'}
                </span>
                <span
                  className="desktop-only"
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                  }}
                >
                  [{user.language || 'en'}]
                </span>
              </div>

              <button
                onClick={logout}
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  color: '#fca5a5',
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.15s ease',
                }}
                title="Log out of session"
              >
                <LogOut size={12} color="#f87171" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Row: Dedicated Navigation Tabs Bar */}
      <div className="navbar-bottom-row">
        <nav className="nav-tabs">
          <button
            className={`nav-tab-btn ${activeScreen === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveScreen('dashboard')}
          >
            <Compass size={14} /> {t('navDashboard')}
          </button>

          <button
            className={`nav-tab-btn ${activeScreen === 'monsoon' ? 'active' : ''}`}
            onClick={() => setActiveScreen('monsoon')}
          >
            <CloudRain size={14} color={activeScreen === 'monsoon' ? '#06241b' : '#34d399'} /> {t('navMonsoon') || 'Monsoon'}
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
      </div>
    </header>
  );
}
