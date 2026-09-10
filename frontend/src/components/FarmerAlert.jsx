import React from 'react';
import { AlertTriangle, Info } from './icons';
import { useWeather } from '../context/WeatherContext';

export default function FarmerAlert({ alerts }) {
  const { t, translateText } = useWeather();
  if (!alerts || alerts.length === 0) return null;

  const activeAlert = alerts[0]; // Highlight primary active alert
  const severity = activeAlert.severity?.toLowerCase() || 'info';

  const icon = severity === 'critical' ? (
    <AlertTriangle size={24} color="#ef4444" />
  ) : severity === 'warning' ? (
    <AlertTriangle size={24} color="#f59e0b" />
  ) : (
    <Info size={24} color="#10b981" />
  );

  return (
    <div className={`alert-banner ${severity} animate-fade-in`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {icon}
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '2px' }}>
            {activeAlert.title_localized || translateText(activeAlert.title)}
          </h4>
          <p style={{ fontSize: '0.82rem', opacity: 0.9 }}>
            {translateText(activeAlert.message)}
          </p>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', display: 'block' }}>
          {t('actionRequired')}
        </span>
        <span style={{ fontSize: '0.82rem', fontWeight: 500 }}>
          {translateText(activeAlert.action_required)}
        </span>
      </div>
    </div>
  );
}
