import React from 'react';
import { RefreshCw, CheckCircle2, ShieldCheck, Sprout } from './icons';
import TransparencyBadge from './TransparencyBadge';
import { useWeather } from '../context/WeatherContext';

export default function LearningLoop({ learningData }) {
  const { t, getStatusLabel, translateText } = useWeather();
  if (!learningData) return null;

  const logs = learningData.logs || [];

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Title */}
      <div className="card-title-row">
        <div>
          <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RefreshCw size={20} color="#10b981" /> {t('learningLoopTitle')}
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            {t('learningLoopSub')}
          </p>
        </div>
        <TransparencyBadge source="Validated Outcome Loop" isSimulated={false} />
      </div>

      {/* Accuracy & Calibration Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        <div className="metric-pill">
          <span className="metric-label">{t('maeLabel')}</span>
          <span className="metric-val" style={{ color: '#34d399', fontSize: '1.2rem' }}>
            {learningData.mean_absolute_error_rain_prob} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(Rain Prob)</span>
          </span>
        </div>

        <div className="metric-pill">
          <span className="metric-label">{t('calibrationLabel')}</span>
          <span className="metric-val" style={{ color: '#38bdf8', fontSize: '1.2rem' }}>
            {learningData.calibration_score} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/ 1.0</span>
          </span>
        </div>

        <div className="metric-pill">
          <span className="metric-label">{t('activeModelLabel')}</span>
          <span className="metric-val" style={{ color: '#fff', fontSize: '0.95rem' }}>
            {learningData.model_version}
          </span>
        </div>
      </div>

      {/* Historical Forecast Verification Table */}
      <div>
        <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>
          {t('recentEvalTitle')}
        </h4>
        <table className="evidence-table">
          <thead>
            <tr>
              <th>{t('colEvalWindow')}</th>
              <th>{t('colPredictedProb')}</th>
              <th>{t('colActualEvent')}</th>
              <th>{t('colError')}</th>
              <th>{t('colBiasCorrection')}</th>
              <th>{t('colStatus')}</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((item, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: 600, color: '#fff' }}>{item.event_date}</td>
                <td>{item.predicted_rain_prob}%</td>
                <td>
                  {item.actual_rain_occurred ? (
                    <span style={{ color: '#38bdf8', fontWeight: 700 }}>{t('yes')} ({item.actual_rainfall_mm} mm)</span>
                  ) : (
                    <span style={{ color: '#94a3b8' }}>{t('noRain')}</span>
                  )}
                </td>
                <td style={{ color: item.prediction_error < 0.1 ? '#34d399' : '#f59e0b' }}>
                  {item.prediction_error}
                </td>
                <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {translateText(item.bias_correction_applied)}
                </td>
                <td>
                  <span className="badge badge-verified" style={{ fontSize: '0.68rem' }}>
                    <CheckCircle2 size={12} /> {getStatusLabel(item.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
