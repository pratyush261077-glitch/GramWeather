import React from 'react';
import { Eye, CheckCircle2, AlertTriangle, XCircle } from './icons';
import { useWeather } from '../context/WeatherContext';

export default function ObservationCard({ observation, onVerify }) {
  const { t, getConditionLabel, getIntensityLabel, getStatusLabel, getTimeLabel, translateText } = useWeather();
  const status = observation.status || 'PENDING';
  const isVerified = status === 'VERIFIED';
  const isConflict = status === 'CONFLICT';
  const isPending = status === 'PENDING';

  const badgeClass = isVerified
    ? 'badge-verified'
    : isConflict
    ? 'badge-conflict'
    : isPending
    ? 'badge-unverified'
    : 'badge-unverified';

  const statusIcon = isVerified ? (
    <CheckCircle2 size={13} color="#10b981" />
  ) : isConflict ? (
    <XCircle size={13} color="#ef4444" />
  ) : (
    <AlertTriangle size={13} color="#f59e0b" />
  );

  return (
    <div
      style={{
        background: 'rgba(0,0,0,0.25)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-sm)',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        transition: 'border-color 0.2s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#fff' }}>
            {getConditionLabel(observation.event)} ({getIntensityLabel(observation.intensity)})
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            {t('reportedBy')} {observation.reporter_name} • {getTimeLabel(observation.time_description)}
          </div>
        </div>

        <span className={`badge ${badgeClass}`}>
          {statusIcon} {getStatusLabel(status)}
        </span>
      </div>

      {observation.description && (
        <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontStyle: 'italic', background: 'rgba(255,255,255,0.02)', padding: '6px 10px', borderRadius: '4px' }}>
          "{translateText(observation.description)}"
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          {t('confidence')}: <strong>{Math.round(observation.confidence_score || 50)}%</strong>
        </span>

        {onVerify && (
          <button
            onClick={() => onVerify(observation)}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-active)',
              color: 'var(--accent-emerald)',
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Eye size={12} /> {t('inspectEvidence')}
          </button>
        )}
      </div>
    </div>
  );
}
