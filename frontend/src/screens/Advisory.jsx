import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { Sprout, Droplets, Wind, Sun, Info, MapPin } from '../components/icons';
import TransparencyBadge from '../components/TransparencyBadge';

export default function Advisory() {
  const {
    selectedVillage,
    advisory,
    weatherData,
    selectedCrop,
    setSelectedCrop,
    setIsLocationModalOpen,
    t,
    getCropLabel,
    getVillageLabel,
    getStatusLabel,
    translateText
  } = useWeather();

  const villageName = selectedVillage?.name || 'Khanna';
  const blockName = selectedVillage?.block || selectedVillage?.district || 'Khanna';
  const stateName = selectedVillage?.state || 'Punjab';

  // Primary crops: ensure Wheat, Paddy, Maize are always available
  const baseCrops = ['Wheat', 'Paddy', 'Maize'];
  const villageCrops = selectedVillage?.primary_crops || [];
  const crops = Array.from(new Set([...baseCrops, ...villageCrops]));

  // Current crop context
  const currentCrop = selectedCrop || 'Wheat';

  // Fallback telemetry extracted from weatherData or defaults if advisory in-flight
  const forecast7dRain = advisory?.telemetry?.forecast_7d_rain_mm ??
    (advisory?.irrigation?.forecast_7d_rain_mm ?? (weatherData?.precipitation > 0 ? 10.5 : 3.0));
  const windSpeed = advisory?.telemetry?.wind_speed_kmh ??
    (weatherData?.wind_speed || 8.5);
  const rainWithin24h = advisory?.telemetry?.rain_within_24h ??
    ((weatherData?.precipitation >= 1.0) || ((weatherData?.rain_probability || 0) >= 45));
  const rainWithin48h = advisory?.telemetry?.rain_within_48h ??
    (rainWithin24h || ((weatherData?.rain_probability || 0) >= 40));
  const nextRainDesc = advisory?.telemetry?.next_rain ??
    (rainWithin24h ? 'Rain likely within 24h' : (rainWithin48h ? 'Rain expected within 48h' : 'None in next 48h'));

  // 1. Irrigation Strategy Decision (ICAR rule)
  let irrigationDecision = "Irrigate as per crop stage; soil likely drying.";
  let irrigationSeverity = "NORMAL";
  if (forecast7dRain >= 15.0) {
    irrigationDecision = "Skip irrigation; rain expected. Recheck after rain.";
    irrigationSeverity = "WARNING";
  } else if (forecast7dRain >= 5.0) {
    irrigationDecision = "Reduce irrigation by half and recheck soil moisture.";
    irrigationSeverity = "CAUTION";
  }

  // 2. Spraying Safety Window Decision (ICAR rule)
  let sprayingDecision = "Safe window: next 24-36h.";
  let sprayingSeverity = "SAFE";
  if (windSpeed > 12.0) {
    sprayingDecision = "Do NOT spray (wind drift).";
    sprayingSeverity = "DANGER";
  } else if (rainWithin24h) {
    sprayingDecision = "Do NOT spray; rain will wash off.";
    sprayingSeverity = "DANGER";
  }

  // 3. Harvesting & Storage Decision (ICAR rule)
  let harvestingDecision = "Favorable for harvest.";
  let harvestingSeverity = "SAFE";
  if (rainWithin48h) {
    harvestingDecision = "Harvest early / cover produce.";
    harvestingSeverity = "WARNING";
  }

  // 4. Nutrient Management Decision (ICAR rule)
  let fertilizerDecision = "Top-dress on schedule.";
  let fertilizerSeverity = "SAFE";
  if (rainWithin24h) {
    fertilizerDecision = "Hold fertilizer; rain will leach nutrients.";
    fertilizerSeverity = "WARNING";
  }

  // Crop-specific agronomic guidance details
  const cropAgronomics = {
    Wheat: {
      irrigation: "Crown Root Initiation (CRI at 21 days) and tillering are critical moisture stages. Avoid waterlogging in flat fields.",
      spraying: "Target broadleaf weedicide (2,4-D) or stripe rust fungicide (Propiconazole). Leaf surfaces must be dry.",
      harvesting: "Ensure grain moisture is below 12% before storage to prevent storage grain weevil and fungal decay.",
      fertilizer: "Apply 2nd split of Urea (65 kg/acre) before irrigation. Nitrogen uptake is maximized in moist, settled soil."
    },
    Paddy: {
      irrigation: "Maintain 2–5 cm standing water during active vegetative tillering. Drain excess water before harvesting.",
      spraying: "Target stem borer or blast treatment; ensure at least 4–6 hours rain-free window for foliar adherence.",
      harvesting: "Drain field 10–14 days prior to harvest. Protect sun-drying paddy sheaves from dew and surface moisture.",
      fertilizer: "Apply nitrogen in 3 equal splits: basal, active tillering, and panicle initiation. Avoid application in running water."
    },
    Maize: {
      irrigation: "Maize is highly sensitive to waterlogging. Ensure drainage furrows are cleared; irrigate along furrows at tasseling.",
      spraying: "Direct spray into leaf whorls for Fall Armyworm (FAW) control during calm wind conditions (<12 km/h).",
      harvesting: "Harvest cobs when outer husk turns dry parchment brown. Sun-dry cobs to <14% moisture to prevent aflatoxin.",
      fertilizer: "Side-dress Urea (40 kg/acre) at knee-high stage (V6) along rows followed by earthing up to prevent lodging."
    }
  };

  const cropNotes = cropAgronomics[currentCrop] || cropAgronomics.Wheat;

  const getSeverityStyle = (sev) => {
    switch (sev) {
      case 'DANGER':
        return { bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.4)', color: '#f87171' };
      case 'WARNING':
        return { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.4)', color: '#fbbf24' };
      case 'CAUTION':
        return { bg: 'rgba(56, 189, 248, 0.15)', border: 'rgba(56, 189, 248, 0.4)', color: '#7dd3fc' };
      case 'SAFE':
      default:
        return { bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.4)', color: '#34d399' };
    }
  };

  return (
    <div className="dashboard-content animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 3-Chamber Location Header Bar */}
      <div className="village-header-bar" style={{ borderRadius: 'var(--radius-md)', marginBottom: '4px' }}>
        <div className="village-info-title">
          <div className="chamber-breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', flexWrap: 'wrap' }}>
            <span className="chamber-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 600 }}>
              1. {t('chamberState')}: <strong>{getVillageLabel(stateName)}</strong>
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>›</span>
            <span className="chamber-badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 600 }}>
              2. {t('chamberBlock')}: <strong>{getVillageLabel(blockName)}</strong>
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>›</span>
            <span className="chamber-badge" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 700 }}>
              3. {t('chamberVillage')}: <strong>{getVillageLabel(villageName)}</strong>
            </span>
          </div>

          <h1 className="village-name">{getVillageLabel(villageName)}</h1>
          <span className="village-meta">
            {getVillageLabel(blockName)} {t('villageBlock')}, {getVillageLabel(selectedVillage?.district || blockName)} {t('villageDistrict')}, {getVillageLabel(stateName)} • {t('villageElevation')}: {selectedVillage?.elevation || 260}m
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
          >
            <MapPin size={13} color="#10b981" /> {t('changeLocation')}
          </button>
        </div>
      </div>

      {/* Screen Title & Transparency Bar */}
      <div className="card-title-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '3px 10px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', marginBottom: '6px' }}>
            <Sprout size={14} color="#34d399" />
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#34d399', letterSpacing: '0.04em' }}>
              {t('icarStyleThresholds') || 'ICAR-STYLE AGRONOMIC THRESHOLDS'}
            </span>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', margin: 0 }}>
            {t('advisoryTitle')}
          </h2>
        </div>
        <TransparencyBadge source="ICAR Guidelines + Open-Meteo Telemetry" isSimulated={false} />
      </div>

      {/* Prominent Honest Label Banner */}
      <div
        style={{
          padding: '10px 16px',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(245, 158, 11, 0.12)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Info size={16} color="#fbbf24" />
          <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#fef3c7', letterSpacing: '0.01em' }}>
            {translateText(advisory?.honest_label) || t('honestLabel') || "Rule-based ICAR advisory, not expert instruction."}
          </span>
        </div>
        <span style={{ fontSize: '0.74rem', color: '#fde68a' }}>
          {t('telemetryOpenMeteo') || 'Telemetry: Open-Meteo NWP Forecast'}
        </span>
      </div>

      {/* Crop Selector Tabs (Wheat, Paddy, Maize) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', fontWeight: 700 }}>
          {t('selectActiveFarmCrop') || 'Select Active Farm Crop:'}
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {crops.map((c) => {
            const isSelected = currentCrop.toLowerCase() === c.toLowerCase();
            const icon = c.toLowerCase().includes('wheat') ? '🌾' : (c.toLowerCase().includes('paddy') ? '🌱' : (c.toLowerCase().includes('maize') ? '🌽' : '🌿'));
            return (
              <button
                key={c}
                onClick={() => setSelectedCrop(c)}
                style={{
                  padding: '10px 18px',
                  minHeight: '44px',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: isSelected ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(5, 150, 105, 0.2) 100%)' : 'rgba(255, 255, 255, 0.04)',
                  border: isSelected ? '1.5px solid #10b981' : '1px solid var(--border-subtle)',
                  color: isSelected ? '#34d399' : '#cbd5e1',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 0 14px rgba(16, 185, 129, 0.25)' : 'none'
                }}
              >
                <span>{icon}</span>
                <span>{getCropLabel(c)}</span>
                {isSelected && (
                  <span style={{ fontSize: '0.68rem', padding: '1px 6px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.25)', color: '#a7f3d0' }}>
                    {getStatusLabel('ACTIVE')}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 4 ICAR Advisory Cards Grid */}
      <div className="advisory-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
        
        {/* CARD 1: IRRIGATION STRATEGY */}
        <div className="glass-panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontWeight: 700, fontSize: '0.92rem' }}>
                <Droplets size={18} color="#38bdf8" />
                <span>{t('irrigationStrategy')}</span>
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                {t('rain7dLabel') || '7d Rain:'} {forecast7dRain} mm
              </span>
            </div>

            {/* Main Decision Highlight */}
            <div
              style={{
                padding: '12px 14px',
                borderRadius: '8px',
                background: getSeverityStyle(irrigationSeverity).bg,
                border: `1px solid ${getSeverityStyle(irrigationSeverity).border}`,
                color: getSeverityStyle(irrigationSeverity).color,
                fontSize: '0.98rem',
                fontWeight: 800,
                lineHeight: 1.4,
                marginBottom: '12px'
              }}
            >
              {translateText(advisory?.irrigation?.decision || irrigationDecision)}
            </div>

            {/* Agronomic Detail */}
            <p style={{ margin: 0, fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.5 }}>
              {translateText(cropNotes.irrigation)}
            </p>
          </div>

          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
            {t('ruleIrrigation') || 'Rule: ≥15 mm (Skip) · 5–15 mm (Halve) · <5 mm (Irrigate)'}
          </div>
        </div>

        {/* CARD 2: SPRAYING SAFETY WINDOW */}
        <div className="glass-panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontWeight: 700, fontSize: '0.92rem' }}>
                <Wind size={18} color="#f59e0b" />
                <span>{t('sprayingWindow')}</span>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: windSpeed > 12 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.15)', color: windSpeed > 12 ? '#f87171' : '#34d399', border: `1px solid ${windSpeed > 12 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.3)'}` }}>
                  {t('windLabel') || 'Wind:'} {windSpeed} km/h
                </span>
              </div>
            </div>

            {/* Main Decision Highlight */}
            <div
              style={{
                padding: '12px 14px',
                borderRadius: '8px',
                background: getSeverityStyle(sprayingSeverity).bg,
                border: `1px solid ${getSeverityStyle(sprayingSeverity).border}`,
                color: getSeverityStyle(sprayingSeverity).color,
                fontSize: '0.98rem',
                fontWeight: 800,
                lineHeight: 1.4,
                marginBottom: '10px'
              }}
            >
              {translateText(advisory?.spraying?.decision || sprayingDecision)}
            </div>

            {/* Next Rain Indicator */}
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '8px' }}>
              {t('nextRainOutlook') || 'Next Rain Outlook:'} <strong style={{ color: rainWithin24h ? '#f87171' : '#fff' }}>{translateText(nextRainDesc)}</strong>
            </div>

            {/* Agronomic Detail */}
            <p style={{ margin: 0, fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.5 }}>
              {translateText(cropNotes.spraying)}
            </p>
          </div>

          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
            {t('ruleSpraying') || 'Rule: Wind >12 km/h or Rain <24h → Do NOT spray'}
          </div>
        </div>

        {/* CARD 3: HARVESTING & STORAGE */}
        <div className="glass-panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', fontWeight: 700, fontSize: '0.92rem' }}>
                <Sun size={18} color="#fbbf24" />
                <span>{t('harvestingStorage')}</span>
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: rainWithin48h ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.15)', color: rainWithin48h ? '#fbbf24' : '#34d399', border: `1px solid ${rainWithin48h ? 'rgba(245, 158, 11, 0.4)' : 'rgba(16, 185, 129, 0.3)'}` }}>
                {t('risk48hRain') || '48h Rain Risk:'} {getStatusLabel(rainWithin48h ? 'Likely' : 'Low')}
              </span>
            </div>

            {/* Main Decision Highlight */}
            <div
              style={{
                padding: '12px 14px',
                borderRadius: '8px',
                background: getSeverityStyle(harvestingSeverity).bg,
                border: `1px solid ${getSeverityStyle(harvestingSeverity).border}`,
                color: getSeverityStyle(harvestingSeverity).color,
                fontSize: '0.98rem',
                fontWeight: 800,
                lineHeight: 1.4,
                marginBottom: '12px'
              }}
            >
              {translateText(advisory?.harvesting?.decision || harvestingDecision)}
            </div>

            {/* Agronomic Detail */}
            <p style={{ margin: 0, fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.5 }}>
              {translateText(cropNotes.harvesting)}
            </p>
          </div>

          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
            {t('ruleHarvesting') || 'Rule: Rain within 48h → Harvest early / cover produce'}
          </div>
        </div>

        {/* CARD 4: NUTRIENT MANAGEMENT & TOP-DRESSING */}
        <div className="glass-panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontWeight: 700, fontSize: '0.92rem' }}>
                <Sprout size={18} color="#34d399" />
                <span>{t('nutrientManagement')}</span>
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: rainWithin24h ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.15)', color: rainWithin24h ? '#f87171' : '#34d399', border: `1px solid ${rainWithin24h ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.3)'}` }}>
                {t('leaching24h') || '24h Leaching:'} {getStatusLabel(rainWithin24h ? 'High Risk' : 'Safe Window')}
              </span>
            </div>

            {/* Main Decision Highlight */}
            <div
              style={{
                padding: '12px 14px',
                borderRadius: '8px',
                background: getSeverityStyle(fertilizerSeverity).bg,
                border: `1px solid ${getSeverityStyle(fertilizerSeverity).border}`,
                color: getSeverityStyle(fertilizerSeverity).color,
                fontSize: '0.98rem',
                fontWeight: 800,
                lineHeight: 1.4,
                marginBottom: '12px'
              }}
            >
              {translateText(advisory?.fertilizer?.decision || fertilizerDecision)}
            </div>

            {/* Agronomic Detail */}
            <p style={{ margin: 0, fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.5 }}>
              {translateText(cropNotes.fertilizer)}
            </p>
          </div>

          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
            {t('ruleFertilizer') || 'Rule: Rain within 24h → Hold fertilizer (prevents leaching)'}
          </div>
        </div>

      </div>

      {/* Honest Label Footer */}
      <footer
        style={{
          marginTop: '6px',
          padding: '14px 18px',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(0, 0, 0, 0.35)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          textAlign: 'center',
          fontSize: '0.78rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
        }}
      >
        <span style={{ color: '#fbbf24', fontWeight: 600 }}>{t('honestTransparency') || 'Honest Transparency:'}</span> {translateText(advisory?.honest_label) || t('honestLabel') || "Rule-based ICAR advisory, not expert instruction."} · {t('telemetrySourceFooter') || 'Meteorological parameters sourced from Open-Meteo NWP forecast.'}
      </footer>
    </div>
  );
}
