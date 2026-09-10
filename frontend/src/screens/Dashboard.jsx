import React from 'react';
import { useWeather } from '../context/WeatherContext';
import WeatherCards from '../components/WeatherCards';
import MonsoonOnsetCard from '../components/MonsoonOnsetCard';
import DirectionCompass from '../components/DirectionCompass';
import CloudMovement from '../components/CloudMovement';
import ConfidenceMeter from '../components/ConfidenceMeter';
import AdvisoryCard from '../components/AdvisoryCard';
import FarmerAlert from '../components/FarmerAlert';
import ObservationCard from '../components/ObservationCard';
import { Eye, Send, Sprout, MapPin } from '../components/icons';

export default function Dashboard({ onInspectObservation }) {
  const {
    selectedVillage,
    weatherData,
    observations,
    alerts,
    advisory,
    selectedCrop,
    setSelectedCrop,
    setIsReportModalOpen,
    setIsLocationModalOpen,
    isLoading,
    isLowBandwidthMode,
    setIsLowBandwidthMode,
    simulateNetworkDrop,
    setSimulateNetworkDrop,
    isDataCached,
    lastCacheTime,
    t,
    getCropLabel,
    getVillageLabel
  } = useWeather();

  if (isLoading && !weatherData) {
    return (
      <div style={{ padding: '60px 28px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <div className="pulse-dot live" style={{ width: '16px', height: '16px', marginBottom: '16px' }}></div>
        <h3>{t('syncingTelemetry') || 'Syncing atmospheric telemetry...'}</h3>
      </div>
    );
  }

  const current = weatherData?.current;

  return (
    <div className="dashboard-content animate-fade-in">
      {/* Village Header Sub-bar with 3-Chamber Hierarchy */}
      <div className="village-header-bar" style={{ borderRadius: 'var(--radius-md)', marginBottom: '14px' }}>
        <div className="village-info-title">
          {/* 3 Chambers Trail */}
          <div className="chamber-breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', flexWrap: 'wrap' }}>
            <span className="chamber-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 600 }}>
              1. {t('chamberState')}: <strong>{getVillageLabel(selectedVillage.state)}</strong>
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>›</span>
            <span className="chamber-badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 600 }}>
              2. {t('chamberBlock')}: <strong>{getVillageLabel(selectedVillage.block || selectedVillage.district)}</strong>
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>›</span>
            <span className="chamber-badge" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 700 }}>
              3. {t('chamberVillage')}: <strong>{getVillageLabel(selectedVillage.name)}</strong>
            </span>

            {isDataCached && (
              <span
                style={{
                  background: 'rgba(245, 158, 11, 0.25)',
                  border: '1px solid rgba(245, 158, 11, 0.5)',
                  color: '#fbbf24',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                }}
              >
                📦 {t('cachedBadge') || 'CACHED'}
              </span>
            )}
          </div>

          <h1 className="village-name">{getVillageLabel(selectedVillage.name)}</h1>
          <span className="village-meta">
            {getVillageLabel(selectedVillage.block || selectedVillage.district)} {t('villageBlock')}, {getVillageLabel(selectedVillage.district)} {t('villageDistrict')}, {getVillageLabel(selectedVillage.state)} • {t('villageElevation')}: {selectedVillage.elevation}m
          </span>
        </div>
        <div className="village-tags" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setIsLocationModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              color: '#34d399',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            title={t('threeChamberTitle')}
          >
            <MapPin size={13} color="#10b981" /> {t('changeLocation')}
          </button>
          <span className="badge badge-community">
            {t('primaryCrops')}: {selectedVillage.primary_crops?.map(c => getCropLabel(c)).join(', ')}
          </span>
        </div>
      </div>

      {/* Low-Bandwidth Mode & Offline Cache Controls */}
      <div
        className="glass-panel"
        style={{
          padding: '10px 16px',
          marginBottom: '18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          borderRadius: 'var(--radius-md)',
          background: isLowBandwidthMode ? 'rgba(16, 185, 129, 0.08)' : 'rgba(0, 0, 0, 0.25)',
          border: isLowBandwidthMode ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '1rem' }}>📶</span>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>
              {t('lowBandwidthMode') || 'Low-Bandwidth Mode'}
            </span>
          </div>

          <button
            onClick={() => setIsLowBandwidthMode(!isLowBandwidthMode)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: isLowBandwidthMode ? '#10b981' : 'rgba(255, 255, 255, 0.1)',
              color: isLowBandwidthMode ? '#fff' : 'var(--text-secondary)',
              border: 'none',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.74rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: isLowBandwidthMode ? '#fff' : '#64748b',
              }}
            />
            {isLowBandwidthMode ? 'ON' : 'OFF'}
          </button>

          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            {t('lowBandwidthDesc') || 'Caches last telemetry in localStorage; resilient 2G offline fallback'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {/* Judge/Demo Toggle to simulate network drop */}
          {isLowBandwidthMode && (
            <button
              onClick={() => setSimulateNetworkDrop(!simulateNetworkDrop)}
              style={{
                background: simulateNetworkDrop ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                border: `1px solid ${simulateNetworkDrop ? 'rgba(239, 68, 68, 0.45)' : 'rgba(255, 255, 255, 0.15)'}`,
                color: simulateNetworkDrop ? '#f87171' : '#cbd5e1',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              title="Simulate network failure to see immediate fallback to localStorage cache"
            >
              {simulateNetworkDrop ? '⚡ Network: FAILED (Simulated)' : (t('simulateNetworkDrop') || 'Simulate Network Drop')}
            </button>
          )}

          {/* Cached Badge */}
          {isDataCached && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: 'rgba(245, 158, 11, 0.2)',
                border: '1px solid rgba(245, 158, 11, 0.45)',
                color: '#fbbf24',
                padding: '3px 10px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
              }}
              title={`Rendered from localStorage cache${lastCacheTime ? ` (cached at ${lastCacheTime})` : ''}`}
            >
              📦 {t('cachedBadge') || 'CACHED'}
              {lastCacheTime && <span style={{ fontSize: '0.66rem', opacity: 0.85 }}>({lastCacheTime})</span>}
            </span>
          )}
        </div>
      </div>

      {/* Critical Farmer Alerts Banner */}
      <FarmerAlert alerts={alerts} />

      {/* Main Grid: 2 Columns */}
      <div className="dashboard-grid">
        {/* Left Column: Atmospheric Core & Visual Intelligence */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Question 1: What is happening now? */}
          <WeatherCards currentWeather={current} />

          {/* SIH26086: Monsoon Onset & Break Risk Outlook */}
          <MonsoonOnsetCard monsoonOutlook={weatherData?.monsoon_outlook} />

          {/* 8-Direction Weather Radar */}
          <DirectionCompass
            directionData={weatherData?.direction_weather}
            windDirectionDeg={current?.wind_direction}
            windSpeed={current?.wind_speed}
          />

          {/* Cloud Movement Trajectory Vector */}
          <CloudMovement
            cloudMovement={weatherData?.cloud_movement}
            currentWindSpeed={current?.wind_speed}
            currentCloudCover={current?.cloud_cover}
          />
        </div>

        {/* Right Column: Verification, Intelligence, Action */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Question 2: How confident are we? */}
          <ConfidenceMeter
            confidenceScore={weatherData?.confidence_score}
            verificationStatus={weatherData?.verification_status}
            sensorsOnlineCount={weatherData?.sensors_online_count}
            observationsCount={observations?.length}
          />

          {/* Question 3: What should I do? (AI Advisory) */}
          <AdvisoryCard
            advisory={advisory}
            selectedCrop={selectedCrop}
            onSelectCrop={setSelectedCrop}
            availableCrops={selectedVillage.primary_crops}
          />

          {/* Human Observation Network Feed */}
          <div className="glass-panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="card-title-row">
              <div className="card-title">
                <Eye size={18} color="#10b981" /> {t('feedTitle')}
              </div>
              <button
                className="btn-primary"
                onClick={() => setIsReportModalOpen(true)}
                style={{ padding: '6px 12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Send size={12} /> {t('addReport')}
              </button>
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {t('feedSub')}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '340px', overflowY: 'auto' }}>
              {observations && observations.length > 0 ? (
                observations.map((obs) => (
                  <ObservationCard
                    key={obs.id}
                    observation={obs}
                    onVerify={onInspectObservation}
                  />
                ))
              ) : (
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center', padding: '20px 0' }}>
                  {t('noObservations')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
