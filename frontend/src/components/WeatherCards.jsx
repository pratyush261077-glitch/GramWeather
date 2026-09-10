import React from 'react';
import { Sun, CloudRain, Droplets, Wind, Compass } from './icons';
import TransparencyBadge from './TransparencyBadge';
import { useWeather } from '../context/WeatherContext';

export default function WeatherCards({ currentWeather }) {
  const { t, getConditionLabel } = useWeather();
  if (!currentWeather) {
    return (
      <div className="glass-panel weather-hero-card">
        <p style={{ color: 'var(--text-secondary)' }}>{t('connecting')}</p>
      </div>
    );
  }

  const temp = Math.round(currentWeather.temperature ?? 30);
  const condition = currentWeather.weather_condition || 'Partly Cloudy';
  const humidity = Math.round(currentWeather.relative_humidity ?? 60);
  const rainProb = Math.round(currentWeather.rain_probability ?? 20);
  const windSpeed = Math.round(currentWeather.wind_speed ?? 12);
  const windDir = currentWeather.wind_direction_cardinal || 'SE';
  const pressure = Math.round(currentWeather.surface_pressure ?? 1012);
  const isRainy = rainProb > 50 || currentWeather.precipitation > 0;

  return (
    <div className="glass-panel weather-hero-card animate-fade-in">
      <div className="weather-hero-top">
        <div className="hero-temp-row">
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <span className="temp-large">{temp}</span>
            <span className="temp-unit">°C</span>
          </div>

          <div className="condition-details">
            <div className="condition-title">{getConditionLabel(condition)}</div>
            <div className="condition-sub">
              {t('feelsLike')} {Math.round(currentWeather.apparent_temperature ?? temp)}°C • {t('updatedLive')}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
          <TransparencyBadge source="Open-Meteo API" isSimulated={currentWeather.is_simulated} />
          {isRainy ? (
            <div style={{ color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 600 }}>
              <CloudRain size={16} /> {t('rainSystemActive')}
            </div>
          ) : (
            <div style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 600 }}>
              <Sun size={16} /> {t('stableWeatherWindow')}
            </div>
          )}
        </div>
      </div>

      {/* 4 Metrics Mini Grid */}
      <div className="metrics-grid">
        <div className="metric-pill">
          <div className="metric-label">
            <Droplets size={14} color="#38bdf8" /> {t('relativeHumidity')}
          </div>
          <div className="metric-val">{humidity}%</div>
        </div>

        <div className="metric-pill">
          <div className="metric-label">
            <CloudRain size={14} color="#60a5fa" /> {t('rainProbability')}
          </div>
          <div className="metric-val" style={{ color: rainProb > 50 ? '#38bdf8' : '#fff' }}>
            {rainProb}%
          </div>
        </div>

        <div className="metric-pill">
          <div className="metric-label">
            <Wind size={14} color="#34d399" /> {t('windVelocity')}
          </div>
          <div className="metric-val">
            {windSpeed} <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)' }}>km/h ({windDir})</span>
          </div>
        </div>

        <div className="metric-pill">
          <div className="metric-label">
            <Compass size={14} color="#f59e0b" /> {t('surfacePressure')}
          </div>
          <div className="metric-val">
            {pressure} <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)' }}>hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
}
