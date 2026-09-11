import React from 'react';
import { Wind, CloudRain } from './icons';
import TransparencyBadge from './TransparencyBadge';
import { useWeather } from '../context/WeatherContext';

function CloudMovement({ cloudMovement, currentWindSpeed, currentCloudCover }) {
  const { t, language } = useWeather();
  const fromDir = cloudMovement?.from_direction || 'NW';
  const toDir = cloudMovement?.to_direction || 'SE';
  const speed = cloudMovement?.speed_kmh || currentWindSpeed || 12;
  const density = cloudMovement?.cloud_density_pct || currentCloudCover || 40;
  
  const summary = language === 'hi'
    ? `बादल ${fromDir} से ${toDir} की दिशा में ${speed} किमी/घंटा की गति से बढ़ रहे हैं।`
    : language === 'pa'
    ? `ਬੱਦਲ ${fromDir} ਤੋਂ ${toDir} ਵੱਲ ${speed} km/h ਦੀ ਰਫ਼ਤਾਰ ਨਾਲ ਵਹਿ ਰਹੇ ਹਨ।`
    : `Clouds drifting from ${fromDir} towards ${toDir} at ${speed} km/h.`;

  return (
    <div className="glass-panel cloud-vector-card animate-fade-in">
      <div className="card-title-row">
        <div className="card-title">
          <CloudRain size={18} color="#38bdf8" /> {t('cloudMovementTitle')}
        </div>
        <TransparencyBadge source="NWP Wind Advection (Model Nowcast)" isSimulated={true} />
      </div>

      <div style={{ fontSize: '0.68rem', color: '#fbbf24', marginTop: '-6px', marginBottom: '14px' }}>
        ℹ️ Illustrative nowcast derived from Open-Meteo wind vectors (not live satellite tracking)
      </div>

      <div className="trajectory-track">
        {/* Origin Node */}
        <div className="trajectory-node">
          <span className="trajectory-node-label">{t('origin')}</span>
          <div className="trajectory-node-badge">{fromDir}</div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{t('upwind')}</span>
        </div>

        {/* Dynamic Vector Line */}
        <div className="trajectory-arrow">
          <div
            style={{
              position: 'absolute',
              top: '-18px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(0,0,0,0.6)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.72rem',
              color: '#38bdf8',
              fontWeight: 700,
            }}
          >
            <Wind size={12} /> {speed} km/h
          </div>
        </div>

        {/* Destination Node */}
        <div className="trajectory-node">
          <span className="trajectory-node-label">{t('trajectory')}</span>
          <div className="trajectory-node-badge" style={{ borderColor: '#38bdf8', color: '#38bdf8' }}>
            {toDir}
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{t('downwind')}</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', flex: 1, marginRight: '16px' }}>
          {summary}
        </p>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>
            {t('cloudDensity')}
          </span>
          <span style={{ fontSize: '1rem', fontWeight: 800, color: '#fff' }}>
            {Math.round(density)}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CloudMovement);
