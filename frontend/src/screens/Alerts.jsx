import React, { useState } from 'react';
import { useWeather } from '../context/WeatherContext';
import { AlertTriangle, CheckCircle2, CloudRain, Wind, Sun, Sprout, Info, RefreshCw, Zap } from '../components/icons';
import TransparencyBadge from '../components/TransparencyBadge';

export default function Alerts() {
  const {
    alerts,
    selectedVillage,
    injectDemoAlert,
    clearDemoAlerts,
    t,
    getStatusLabel,
    translateText,
    getVillageLabel
  } = useWeather();

  const [loadingAction, setLoadingAction] = useState(false);
  const villageName = selectedVillage?.name || 'Khanna';

  const hasInjectedAlert = Boolean(alerts && alerts.some(a => a.is_injected));

  const handleInject = async () => {
    setLoadingAction(true);
    try {
      if (injectDemoAlert) {
        await injectDemoAlert();
      }
    } catch (err) {
      console.error('Failed to inject demo alert:', err);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleClear = async () => {
    setLoadingAction(true);
    try {
      if (clearDemoAlerts) {
        await clearDemoAlerts();
      }
    } catch (err) {
      console.error('Failed to clear demo alerts:', err);
    } finally {
      setLoadingAction(false);
    }
  };

  const getAlertIcon = (type) => {
    const tLower = (type || '').toLowerCase();
    if (tLower.includes('rain')) return <CloudRain size={24} color="#ef4444" />;
    if (tLower.includes('wind')) return <Wind size={24} color="#f59e0b" />;
    if (tLower.includes('heat')) return <Sun size={24} color="#f59e0b" />;
    if (tLower.includes('break')) return <Sprout size={24} color="#fbbf24" />;
    return <AlertTriangle size={24} color="#ef4444" />;
  };

  const formatTimestamp = (ts) => {
    if (!ts) return 'Just now';
    try {
      const d = new Date(ts);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + d.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } catch {
      return ts;
    }
  };

  return (
    <div className="dashboard-content animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Header & Demo Actions Bar */}
      <div className="card-title-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '3px 10px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', marginBottom: '6px' }}>
            <AlertTriangle size={14} color="#f87171" />
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#f87171', letterSpacing: '0.04em' }}>
              {t('autonomousEngine') || 'AUTONOMOUS THRESHOLD EVENT ENGINE'}
            </span>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', margin: 0 }}>
            {t('alertsTitle')}
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
            {t('alertsSub')} <strong>{getVillageLabel(villageName)}</strong>.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Demo Inject Alert Button */}
          <button
            onClick={handleInject}
            disabled={loadingAction}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              minHeight: '44px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: loadingAction ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
              transition: 'all 0.2s ease',
            }}
            title="Simulate a live Heavy Rain event for judges to preview alert layout"
          >
            <Zap size={14} color="#fff" />
            {loadingAction ? (t('injecting') || 'Injecting...') : t('demoInjectAlert')}
          </button>

          {/* Clear Demo Alert Button */}
          {hasInjectedAlert && (
            <button
              onClick={handleClear}
              disabled={loadingAction}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#f87171',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                padding: '8px 14px',
                minHeight: '44px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: loadingAction ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
              }}
              title="Reset alerts and clear synthetic demo event"
            >
              ✕ {t('demoClearAlert')}
            </button>
          )}

          <TransparencyBadge source="Threshold Engine · IMD & Open-Meteo" isSimulated={hasInjectedAlert} />
        </div>
      </div>

      {/* Threshold Triggers Reference Strip */}
      <div
        className="glass-panel"
        style={{
          padding: '14px 18px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '12px',
          background: 'rgba(0, 0, 0, 0.25)',
          fontSize: '0.76rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1rem' }}>🌧️</span>
          <div>
            <div style={{ color: '#fff', fontWeight: 700 }}>{getStatusLabel('HEAVY RAIN') || 'HEAVY RAIN'}</div>
            <div style={{ color: 'var(--text-secondary)' }}>{t('heavyRainThreshold') || 'Rain ≥ 64.5 mm / 24h'}</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1rem' }}>💨</span>
          <div>
            <div style={{ color: '#fff', fontWeight: 700 }}>{getStatusLabel('STRONG WIND') || 'STRONG WIND'}</div>
            <div style={{ color: 'var(--text-secondary)' }}>{t('strongWindThreshold') || 'Wind ≥ 40 km/h'}</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1rem' }}>☀️</span>
          <div>
            <div style={{ color: '#fff', fontWeight: 700 }}>{getStatusLabel('HEAT') || 'HEAT'}</div>
            <div style={{ color: 'var(--text-secondary)' }}>{t('heatThreshold') || 'Max Temp ≥ 42°C'}</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1rem' }}>🌾</span>
          <div>
            <div style={{ color: '#fff', fontWeight: 700 }}>{getStatusLabel('BREAK RISK') || 'BREAK RISK'}</div>
            <div style={{ color: 'var(--text-secondary)' }}>{t('breakRiskThreshold') || 'Monsoon Break: HIGH'}</div>
          </div>
        </div>
      </div>

      {/* Mock Multi-Channel Dispatch Protocol Strip */}
      <div
        className="glass-panel"
        style={{
          padding: '12px 18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          background: 'rgba(0, 0, 0, 0.35)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '0.84rem' }}>
          <span style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>
            {t('deliveryLabel') || 'Delivery:'}
          </span>

          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#34d399', fontWeight: 600 }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981' }} />
            {t('appPushLabel') || 'App push'}
          </span>

          <span style={{ color: 'var(--text-muted)' }}>·</span>

          {/* SMS visually highlighted as fallback channel */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(245, 158, 11, 0.18)',
              border: '1px solid rgba(245, 158, 11, 0.45)',
              color: '#fbbf24',
              padding: '3px 10px',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.8rem',
              boxShadow: '0 0 10px rgba(245, 158, 11, 0.1)',
            }}
            title="Automatic fallback via telecom GSM SMS when smartphone data / 4G is disrupted"
          >
            <span style={{ fontSize: '0.85rem' }}>📶</span>
            {t('smsFallbackLabel') || 'SMS (auto-fallback on 2G)'}
          </span>

          <span style={{ color: 'var(--text-muted)' }}>·</span>

          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#34d399', fontWeight: 600 }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981' }} />
            {t('whatsappLabel') || 'WhatsApp'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '0.68rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              fontWeight: 800,
              color: '#94a3b8',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              padding: '3px 8px',
              borderRadius: '4px',
            }}
          >
            {t('prototypeLabel') || 'Prototype'}
          </span>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            (Mock multi-channel dispatch; no real SMS gateway billed)
          </span>
        </div>
      </div>

      {/* Alerts Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {alerts && alerts.length > 0 ? (
          alerts.map((al) => {
            const isCrit = (al.severity || '').toUpperCase() === 'CRITICAL';
            const isWarn = (al.severity || '').toUpperCase() === 'WARNING';
            const borderColor = isCrit ? '#ef4444' : isWarn ? '#f59e0b' : '#10b981';

            return (
              <div
                key={al.id}
                className="glass-panel animate-fade-in"
                style={{
                  padding: '22px 24px',
                  borderLeft: `6px solid ${borderColor}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  background: isCrit ? 'rgba(239, 68, 68, 0.05)' : 'rgba(15, 32, 28, 0.65)'
                }}
              >
                {/* Alert Header Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {getAlertIcon(al.type)}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: isCrit ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                          color: isCrit ? '#f87171' : '#fbbf24',
                          border: `1px solid ${isCrit ? 'rgba(239, 68, 68, 0.4)' : 'rgba(245, 158, 11, 0.4)'}`,
                          letterSpacing: '0.04em'
                        }}>
                          {getStatusLabel(al.type) || al.type || 'WEATHER ALERT'}
                        </span>
                        <span className={`badge ${isCrit ? 'badge-conflict' : isWarn ? 'badge-unverified' : 'badge-verified'}`}>
                          {getStatusLabel(al.severity || 'WARNING')}
                        </span>
                        {al.is_injected && (
                          <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.35)' }}>
                            {t('judgeDemoSimulation') || '⚡ Judge Demo Simulation'}
                          </span>
                        )}
                      </div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', margin: '6px 0 2px 0' }}>
                        {al.title_localized || translateText(al.title)}
                      </h3>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <div>{t('source') || 'Source'}: <strong style={{ color: '#cbd5e1' }}>{translateText(al.source_label) || 'Open-Meteo NWP'}</strong></div>
                    <div>{t('issued') || 'Issued'}: {formatTimestamp(al.timestamp)}</div>
                  </div>
                </div>

                {/* Message Body */}
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                  {translateText(al.message)}
                </p>

                {/* One Action Sentence Callout (User Required Specification) */}
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    background: isCrit ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                    border: `1px solid ${isCrit ? 'rgba(239, 68, 68, 0.35)' : 'rgba(245, 158, 11, 0.35)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.9rem' }}>⚡</span>
                    <span style={{ fontSize: '0.92rem', fontWeight: 800, color: isCrit ? '#fecaca' : '#fef3c7' }}>
                      {translateText(al.action_required) || 'Take precautionary field measures immediately.'}
                    </span>
                  </div>

                  {al.parameter_trigger && (
                    <span style={{ fontSize: '0.74rem', color: isCrit ? '#f87171' : '#fbbf24', fontWeight: 600 }}>
                      {t('parameterTrigger') || 'Trigger'}: {translateText(al.parameter_trigger)}
                    </span>
                  )}
                </div>

                {/* Mock Dispatch Line */}
                <div
                  style={{
                    padding: '8px 14px',
                    borderRadius: '6px',
                    background: 'rgba(0, 0, 0, 0.28)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px',
                    fontSize: '0.78rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
                      {t('deliveryLabel') || 'Delivery:'}
                    </span>
                    <span style={{ color: '#34d399', fontWeight: 600 }}>
                      {t('appPushLabel') || 'App push'}
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}>·</span>
                    <span
                      style={{
                        background: 'rgba(245, 158, 11, 0.18)',
                        color: '#fbbf24',
                        border: '1px solid rgba(245, 158, 11, 0.4)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                      }}
                    >
                      {t('smsFallbackLabel') || 'SMS (auto-fallback on 2G)'}
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}>·</span>
                    <span style={{ color: '#34d399', fontWeight: 600 }}>
                      {t('whatsappLabel') || 'WhatsApp'}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: '0.66rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: '#94a3b8',
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '2px 6px',
                      borderRadius: '3px',
                      fontWeight: 700,
                    }}
                  >
                    {t('prototypeLabel') || 'Prototype'}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          /* Empty State when no alerts are active */
          <div
            className="glass-panel"
            style={{
              padding: '40px 24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
              color: 'var(--text-secondary)'
            }}
          >
            <CheckCircle2 size={44} color="#10b981" />
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', margin: '0 0 6px 0' }}>
                {t('noAlerts')}
              </h3>
              <p style={{ margin: 0, fontSize: '0.84rem', color: '#94a3b8', maxWidth: '500px', lineHeight: 1.5 }}>
                {t('allParametersSafeDesc')} <strong>{getVillageLabel(villageName)}</strong>.
              </p>
            </div>
            <button
              onClick={handleInject}
              disabled={loadingAction}
              style={{
                marginTop: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                color: '#34d399',
                padding: '8px 18px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <Zap size={14} /> {t('demoInjectAlert')}
            </button>
          </div>
        )}
      </div>

      {/* Screen Footer */}
      <footer
        style={{
          marginTop: '6px',
          padding: '12px 18px',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(0, 0, 0, 0.35)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          textAlign: 'center',
          fontSize: '0.78rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
        }}
      >
        <span>{t('alertsDataFooter')}</span>
      </footer>
    </div>
  );
}
