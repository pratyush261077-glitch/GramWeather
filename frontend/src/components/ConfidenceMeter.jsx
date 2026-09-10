import React from 'react';
import { ShieldCheck, Eye } from './icons';
import TransparencyBadge from './TransparencyBadge';
import { useWeather } from '../context/WeatherContext';

export default function ConfidenceMeter({ confidenceScore, verificationStatus, sensorsOnlineCount, observationsCount }) {
  const { t } = useWeather();
  const score = Math.round(confidenceScore || 82);
  const status = verificationStatus || (score >= 75 ? 'VERIFIED' : 'MODERATE');

  const badgeClass = status === 'VERIFIED' ? 'badge-verified' : status === 'CONFLICT' ? 'badge-conflict' : 'badge-unverified';
  const displayStatus = status === 'VERIFIED' ? t('statusVerified') : status === 'CONFLICT' ? t('statusConflict') : status === 'UNVERIFIED' ? t('statusUnverified') : t('statusModerate');

  return (
    <div className="glass-panel confidence-card animate-fade-in">
      <div className="card-title-row">
        <div className="card-title">
          <ShieldCheck size={18} color="#10b981" /> {t('confidenceTitle')}
        </div>
        <span className={`badge ${badgeClass}`}>{displayStatus}</span>
      </div>

      <div className="confidence-display">
        <div className="confidence-circle">
          <span className="conf-score">{score}%</span>
          <span className="conf-label">{t('certainty')}</span>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '0.84rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
            {t('confidenceDesc')}
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {t('sensorsOnline')}:{' '}
              <strong style={{ color: '#34d399' }}>{sensorsOnlineCount ?? 2} {t('microStations')}</strong>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {t('farmerReportsActive')}:{' '}
              <strong style={{ color: '#38bdf8' }}>{observationsCount ?? 3}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
