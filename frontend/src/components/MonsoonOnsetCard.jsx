import React from 'react';
import { CloudRain, AlertTriangle, CheckCircle2, Sprout, Wind } from './icons';
import TransparencyBadge from './TransparencyBadge';
import { useWeather } from '../context/WeatherContext';

export default function MonsoonOnsetCard({ monsoonOutlook }) {
  const { t, getStatusLabel, translateText } = useWeather();
  if (!monsoonOutlook) return null;

  const phase = monsoonOutlook.monsoon_phase;
  const onsetWindow = monsoonOutlook.onset_window;
  const onsetProb = monsoonOutlook.onset_probability;
  const breakRisk = monsoonOutlook.break_risk_pct;
  const breakLevel = monsoonOutlook.break_risk_level;
  const indicators = monsoonOutlook.indicators || [];

  const isBreakHigh = breakRisk > 50;

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid rgba(56, 189, 248, 0.25)', background: 'linear-gradient(135deg, rgba(15, 32, 28, 0.9) 0%, rgba(10, 24, 34, 0.85) 100%)' }}>
      {/* Card Header with SIH Problem Statement ID */}
      <div className="card-title-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge" style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', border: '1px solid #0284c7' }}>
              {t('monsoonCardBadge')}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t('monsoonCardScale')}</span>
          </div>
          <h3 style={{ fontSize: '1.2rem', color: '#fff', marginTop: '6px', fontWeight: 800 }}>
            {t('monsoonCardTitle')}
          </h3>
        </div>
        <TransparencyBadge source="IMD Pai et al. (2014) Criteria" isSimulated={false} />
      </div>

      {/* Dual Timescale: Onset Window & Break Spell Risk */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px' }}>
        {/* Onset Window Box */}
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              {t('monsoonOnsetWindow')}
            </span>
            <span className="badge badge-live" style={{ fontSize: '0.7rem' }}>{phase}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-display)' }}>
              {onsetWindow}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              ({onsetProb}% {t('rainProbability')})
            </span>
          </div>

          {/* Progress bar */}
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${onsetProb}%`, height: '100%', background: 'linear-gradient(90deg, #10b981 0%, #38bdf8 100%)', borderRadius: '3px' }} />
          </div>
        </div>

        {/* Break Risk Box */}
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: isBreakHigh ? '1px solid rgba(239, 68, 68, 0.35)' : '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              {t('monsoonBreakRisk')}
            </span>
            <span className={`badge ${isBreakHigh ? 'badge-conflict' : 'badge-verified'}`} style={{ fontSize: '0.7rem' }}>
              {getStatusLabel(breakLevel)}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: isBreakHigh ? '#f87171' : '#34d399', fontFamily: 'var(--font-display)' }}>
              {breakRisk}%
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {t('breakProbability')}
            </span>
          </div>

          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            {t('consecutiveWetDays')}: <strong style={{ color: '#fff' }}>{monsoonOutlook.consecutive_wet_days}</strong>
          </span>
        </div>
      </div>

      {/* Sowing & Farm Decision Guidance */}
      <div
        style={{
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <Sprout size={24} color="#10b981" />
        <div style={{ fontSize: '0.82rem', color: '#e2e8f0', lineHeight: 1.4 }}>
          <strong style={{ color: '#34d399' }}>{t('sowingStrategyTitle')}:</strong> {translateText(monsoonOutlook.farming_sowing_advice)}
        </div>
      </div>

      {/* Atmospheric Science Criteria (IMD Pai et al. 2014 & ISRO MOSDAC) */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>
          {t('scientificIndicatorsTitle')}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {indicators.map((ind, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8' }}>{ind.name}</span>
                <span
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: ind.status === 'MET' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)',
                    color: ind.status === 'MET' ? '#34d399' : '#fbbf24',
                  }}
                >
                  {ind.status}
                </span>
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>{ind.measured_value}</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{ind.scientific_basis}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

