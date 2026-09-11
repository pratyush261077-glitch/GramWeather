import React from 'react';
import { Sun, CloudRain, Cloud, Wind, AlertTriangle } from '../components/icons';

/**
 * Pure function mapping weather conditions, rain probability, and precipitation
 * to the mathematically matching SVG icon and color.
 * Guaranteed: Rain will NEVER show a Sun icon.
 */
export function getWeatherCategory(condition = '', rainProbability = 0, precipitation = 0) {
  const cond = String(condition).toLowerCase().trim();
  const prob = Number(rainProbability) || 0;
  const precip = Number(precipitation) || 0;

  if (
    cond.includes('rain') ||
    cond.includes('drizzle') ||
    cond.includes('shower') ||
    cond.includes('thunder') ||
    precip > 0 ||
    prob >= 50
  ) {
    return 'rain';
  }

  if (cond.includes('hail') || cond.includes('storm')) {
    return 'storm';
  }

  if (cond.includes('wind') || cond.includes('breeze') || cond.includes('gust')) {
    return 'wind';
  }

  if (
    cond.includes('cloud') ||
    cond.includes('overcast') ||
    cond.includes('fog') ||
    cond.includes('haze') ||
    cond.includes('mist') ||
    prob >= 25
  ) {
    return 'cloud';
  }

  return 'clear';
}

export function getWeatherIcon(condition = '', rainProbability = 0, precipitation = 0) {
  const category = getWeatherCategory(condition, rainProbability, precipitation);

  switch (category) {
    case 'rain':
      return CloudRain;
    case 'storm':
      return AlertTriangle;
    case 'wind':
      return Wind;
    case 'cloud':
      return Cloud;
    case 'clear':
    default:
      return Sun;
  }
}

export function getWeatherIconColor(condition = '', rainProbability = 0, precipitation = 0) {
  const category = getWeatherCategory(condition, rainProbability, precipitation);

  switch (category) {
    case 'rain':
      return '#38bdf8'; // Sky blue
    case 'storm':
      return '#f87171'; // Red / Danger
    case 'wind':
      return '#34d399'; // Emerald
    case 'cloud':
      return '#94a3b8'; // Slate grey
    case 'clear':
    default:
      return '#fbbf24'; // Golden sun
  }
}

export function WeatherConditionBadge({ condition, rainProbability = 0, precipitation = 0, size = 16 }) {
  const Icon = getWeatherIcon(condition, rainProbability, precipitation);
  const color = getWeatherIconColor(condition, rainProbability, precipitation);
  const category = getWeatherCategory(condition, rainProbability, precipitation);

  const labelMap = {
    rain: 'Rain System Active',
    storm: 'Severe Weather Warning',
    wind: 'High Wind Pattern',
    cloud: 'Cloud Cover Active',
    clear: 'Stable Clear Window',
  };

  return (
    <div
      style={{
        color,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.82rem',
        fontWeight: 600,
      }}
    >
      <Icon size={size} color={color} />
      <span>{labelMap[category]}</span>
    </div>
  );
}
