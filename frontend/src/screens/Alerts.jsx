import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { AlertTriangle, Info, CheckCircle2 } from '../components/icons';
import TransparencyBadge from '../components/TransparencyBadge';

export default function Alerts() {
  const { alerts, selectedVillage, t, getStatusLabel, translateText } = useWeather();

  return (
    <div className="dashboard-content animate-fade-in">
      <div className="card-title-row" style={{ marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={22} color="#f59e0b" /> {t('alertsTitle')}
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            {t('alertsSub')} {selectedVillage.name}.
          </p>
        </div>
        <TransparencyBadge source="Threshold Event Engine" isSimulated={false} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {alerts && alerts.length > 0 ? (
          alerts.map((al) => {
            const isCrit = al.severity === 'CRITICAL';
            const isWarn = al.severity === 'WARNING';
            const borderColor = isCrit ? '#ef4444' : isWarn ? '#f59e0b' : '#10b981';

            return (
              <div
                key={al.id}
                className="glass-panel"
                style={{
                  padding: '20px 24px',
                  borderLeft: `5px solid ${borderColor}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  {isCrit ? (
                    <AlertTriangle size={26} color="#ef4444" />
                  ) : isWarn ? (
                    <AlertTriangle size={26} color="#f59e0b" />
                  ) : (
                    <CheckCircle2 size={26} color="#10b981" />
                  )}

                  <div>
                    <span className={`badge ${isCrit ? 'badge-conflict' : isWarn ? 'badge-unverified' : 'badge-verified'}`}>
                      {getStatusLabel(al.severity)}
                    </span>
                    <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: '8px 0 4px 0' }}>
                      {al.title_localized || translateText(al.title)}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {translateText(al.message)}
                    </p>
                    <div style={{ fontSize: '0.8rem', color: '#38bdf8', marginTop: '6px', fontWeight: 600 }}>
                      ⚡ {t('immediateAction')}: {translateText(al.action_required)}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{t('triggerMetric')}</span>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
                    {al.parameter_trigger}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="glass-panel" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            {t('noAlerts')}
          </div>
        )}
      </div>
    </div>
  );
}
