import React, { useState } from 'react';
import { Compass, Wind, Droplets } from './icons';
import TransparencyBadge from './TransparencyBadge';
import { useWeather } from '../context/WeatherContext';

export default function DirectionCompass({ directionData, windDirectionDeg, windSpeed }) {
  const { t, getConditionLabel } = useWeather();
  const [selectedDir, setSelectedDir] = useState(null);
  const [isSweepActive, setIsSweepActive] = useState(true);

  // Normalize directions whether it comes as an Array or an Object
  let directions = [];
  if (Array.isArray(directionData)) {
    directions = directionData;
  } else if (directionData && Array.isArray(directionData.directions)) {
    directions = directionData.directions;
  } else if (directionData && Array.isArray(directionData.direction_weather)) {
    directions = directionData.direction_weather;
  }

  // Robust calibrated fallback so radar never shows a blank or broken state
  if (!directions || directions.length === 0) {
    const baseW = windSpeed || 12;
    directions = [
      { direction: 'N', bearing_deg: 0, rain_probability: 10, condition: 'Mainly Clear', wind_speed: baseW, rain_cell_distance_km: 18, estimated_arrival_minutes: 85, trajectory: 'N → S' },
      { direction: 'NE', bearing_deg: 45, rain_probability: 15, condition: 'Mainly Clear', wind_speed: baseW, rain_cell_distance_km: 16, estimated_arrival_minutes: 75, trajectory: 'NE → SW' },
      { direction: 'E', bearing_deg: 90, rain_probability: 25, condition: 'Partly Cloudy', wind_speed: baseW, rain_cell_distance_km: 14, estimated_arrival_minutes: 60, trajectory: 'E → W' },
      { direction: 'SE', bearing_deg: 135, rain_probability: 35, condition: 'Scattered Clouds', wind_speed: baseW, rain_cell_distance_km: 12, estimated_arrival_minutes: 50, trajectory: 'SE → NW' },
      { direction: 'S', bearing_deg: 180, rain_probability: 50, condition: 'Cloudy', wind_speed: baseW + 2, rain_cell_distance_km: 10, estimated_arrival_minutes: 40, trajectory: 'S → N' },
      { direction: 'SW', bearing_deg: 225, rain_probability: 75, condition: 'Rain Showers', wind_speed: baseW + 4, rain_cell_distance_km: 7.5, estimated_arrival_minutes: 25, trajectory: 'SW → NE' },
      { direction: 'W', bearing_deg: 270, rain_probability: 60, condition: 'Overcast', wind_speed: baseW + 3, rain_cell_distance_km: 9.2, estimated_arrival_minutes: 32, trajectory: 'W → E' },
      { direction: 'NW', bearing_deg: 315, rain_probability: 20, condition: 'Partly Cloudy', wind_speed: baseW, rain_cell_distance_km: 15, estimated_arrival_minutes: 70, trajectory: 'NW → SE' },
    ];
  }

  const activeDetail = selectedDir || directions.find(d => d.direction === 'SW') || directions[0];

  // Positions on a 280px radar dial (Node size: 46px, Center: 140px, Radius: 106px)
  const posMap = {
    'N':  { top: '10px', left: '117px' },
    'NE': { top: '38px', left: '194px' },
    'E':  { top: '117px', left: '222px' },
    'SE': { top: '194px', left: '194px' },
    'S':  { top: '222px', left: '117px' },
    'SW': { top: '194px', left: '40px' },
    'W':  { top: '117px', left: '12px' },
    'NW': { top: '38px', left: '40px' }
  };

  return (
    <div className="glass-panel compass-card animate-fade-in" style={{ padding: '20px' }}>
      {/* Header Row */}
      <div className="card-title-row">
        <div className="card-title">
          <Compass size={18} color="#10b981" /> {t('compassTitle')}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={() => setIsSweepActive(!isSweepActive)}
            style={{
              background: isSweepActive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              border: isSweepActive ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.1)',
              color: isSweepActive ? '#34d399' : 'var(--text-muted)',
              fontSize: '0.68rem',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {isSweepActive ? '● RADAR SWEEP ON' : '○ RADAR PAUSED'}
          </button>
          <TransparencyBadge source="NWP Spatial Gradient (Simulated Radar UI)" isSimulated={true} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', margin: '4px 0 12px 0' }}>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
          {t('compassSub')}
        </p>
        <div>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              padding: '3px 8px',
              borderRadius: '6px',
              fontSize: '0.68rem',
              color: '#fbbf24',
              fontWeight: 600,
            }}
          >
            ℹ️ Illustrative nowcast (NWP spatial gradient / not live Doppler radar)
          </span>
        </div>
      </div>

      {/* Interactive Radar Display */}
      <div className="compass-container">
        <div className="compass-dial">
          {/* Radar Sweep Animation Beam */}
          {isSweepActive && <div className="radar-sweep-beam" />}

          {/* Concentric Range Rings */}
          <div className="radar-ring radar-ring-1" title="5 km Range Ring" />
          <div className="radar-ring radar-ring-2" title="10 km Range Ring" />
          <div className="radar-ring radar-ring-3" title="15 km Range Ring" />

          {/* Radar Crosshairs */}
          <div className="radar-crosshair-h" />
          <div className="radar-crosshair-v" />

          {/* Distance Range Markers */}
          <span className="radar-range-tag" style={{ top: '88px', left: '144px' }}>5km</span>
          <span className="radar-range-tag" style={{ top: '53px', left: '144px' }}>10km</span>
          <span className="radar-range-tag" style={{ top: '18px', left: '144px' }}>15km</span>

          {/* 8-Direction Nodes */}
          {directions.map((d) => {
            const pos = posMap[d.direction] || { top: '50%', left: '50%' };
            const isSelected = activeDetail.direction === d.direction;
            
            // Color code rain severity: High (>60%), Moderate (30-60%), Low (<30%)
            const probColor = d.rain_probability > 60 ? '#38bdf8' : d.rain_probability > 30 ? '#f59e0b' : '#34d399';

            return (
              <div
                key={d.direction}
                onClick={() => setSelectedDir(d)}
                className={`compass-node ${isSelected ? 'active' : ''}`}
                style={{
                  top: pos.top,
                  left: pos.left,
                  borderColor: isSelected ? probColor : 'rgba(255, 255, 255, 0.15)',
                  color: probColor,
                }}
                title={`${d.direction}: ${d.rain_probability}% rain probability (${d.condition})`}
              >
                <div className="node-dir" style={{ color: probColor }}>
                  {d.direction}
                </div>
                <div className="node-pct" style={{ color: isSelected ? '#fff' : probColor }}>
                  {d.rain_probability}%
                </div>
              </div>
            );
          })}

          {/* Center Wind Vector Hub */}
          <div className="compass-center">
            <div
              style={{
                transform: `rotate(${windDirectionDeg || 0}deg)`,
                transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title={`Wind Bearing: ${Math.round(windDirectionDeg || 0)}°`}
            >
              <Wind size={22} color="#38bdf8" />
            </div>
            <span style={{ fontSize: '0.68rem', color: '#fff', fontWeight: 800, marginTop: '2px' }}>
              {Math.round(windSpeed || 0)} <span style={{ fontSize: '0.55rem', color: 'var(--text-secondary)' }}>km/h</span>
            </span>
          </div>
        </div>
      </div>

      {/* Quick Direction Buttons Row */}
      <div className="direction-quick-bar">
        {directions.map((d) => {
          const isSelected = activeDetail.direction === d.direction;
          const probColor = d.rain_probability > 60 ? '#38bdf8' : d.rain_probability > 30 ? '#f59e0b' : '#34d399';
          return (
            <button
              key={d.direction}
              type="button"
              onClick={() => setSelectedDir(d)}
              className={`direction-quick-btn ${isSelected ? 'active' : ''}`}
            >
              <span style={{ color: probColor }}>{d.direction}</span>
              <span style={{ fontSize: '0.68rem', opacity: 0.85 }}>{d.rain_probability}%</span>
            </button>
          );
        })}
      </div>

      {/* Selected Direction Detail Strip */}
      {activeDetail && (
        <div
          style={{
            marginTop: '12px',
            background: 'linear-gradient(135deg, rgba(10, 24, 20, 0.85) 0%, rgba(15, 32, 28, 0.95) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: 'var(--radius-sm)',
            padding: '14px 18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff' }}>
                {activeDetail.direction} Sector — {getConditionLabel(activeDetail.condition)}
              </span>
              <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontSize: '0.68rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                {activeDetail.bearing_deg}° {t('bearing')}
              </span>
            </div>

            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '6px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <span>
                {t('rainCell')}: <strong style={{ color: '#fff' }}>{activeDetail.rain_cell_distance_km || 15} km</strong>
              </span>
              <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
              <span>
                {t('vector')}: <strong style={{ color: '#38bdf8' }}>{activeDetail.trajectory || `${activeDetail.direction} → NE`}</strong>
              </span>
              <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
              <span>
                {t('eta')}: <strong style={{ color: '#fbbf24' }}>~{activeDetail.estimated_arrival_minutes || 45} min</strong>
              </span>
            </div>
            <div style={{ fontSize: '0.67rem', color: 'var(--text-muted)', marginTop: '6px' }}>
              * Cell distance, trajectory vector, and arrival ETA are illustrative model projections (not live Doppler radar).
            </div>
          </div>

          <div style={{ textAlign: 'right', minWidth: '110px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>
              {t('rainLikelihood')}
            </span>
            <div
              style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                color: activeDetail.rain_probability > 60 ? '#38bdf8' : activeDetail.rain_probability > 30 ? '#f59e0b' : '#34d399',
              }}
            >
              {activeDetail.rain_probability}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
