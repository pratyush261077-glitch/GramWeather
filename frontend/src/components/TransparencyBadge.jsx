import React from 'react';
import { useWeather } from '../context/WeatherContext';

export default function TransparencyBadge({ source, isSimulated }) {
  const { t } = useWeather();
  if (isSimulated) {
    return (
      <span className="badge badge-simulated" title="Simulated hardware/community data for controlled demo testing">
        <span className="pulse-dot amber"></span>
        {t('simulatedBadge')} {source || 'IoT Hardware'}
      </span>
    );
  }

  return (
    <span className="badge badge-live" title="Live external verified atmospheric data">
      <span className="pulse-dot live"></span>
      {t('liveBadge')} {source || 'Open-Meteo'}
    </span>
  );
}
