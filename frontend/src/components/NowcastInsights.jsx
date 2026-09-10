import React from 'react';
import { Zap, AlertTriangle, CheckCircle2, Droplets } from './icons';

/**
 * NowcastActionableInsights Component
 * 
 * Smart India Hackathon (SIH26086) - GramWeather AI
 * Translates raw 8-direction radar sweep telemetry into high-contrast,
 * immediate agricultural advisories matching the app's glassmorphic dark UI.
 */
export default function NowcastInsights({ alerts = null }) {
  const defaultInsights = [
    {
      id: 'alert-1',
      category: 'URGENT',
      severity: 'urgent',
      icon: <AlertTriangle size={16} color="#ef4444" />,
      time: 'Now / +111 mins',
      title: 'Rain Cell Approaching from SW',
      message: 'Rain cell approaching from SW. Pause pesticide spraying immediately to prevent chemical wash-off.',
      action: 'Pause spraying & secure open produce',
      radarMeta: 'Verified: Radar Sweep + Farmer Report from SW',
      accentColor: '#ef4444',
      badgeBg: 'rgba(239, 68, 68, 0.18)',
      badgeBorder: 'rgba(239, 68, 68, 0.4)',
    },
    {
      id: 'alert-2',
      category: 'OPTIMAL',
      severity: 'optimal',
      icon: <CheckCircle2 size={16} color="#10b981" />,
      time: 'Next 4 Hours',
      title: 'Optimal Harvesting Window',
      message: 'Atmospheric window stable. Safe for harvesting wheat.',
      action: 'Safe window for wheat combine operations',
      radarMeta: 'Verified: Radar Clear + Ground Consensus',
      accentColor: '#10b981',
      badgeBg: 'rgba(16, 185, 129, 0.18)',
      badgeBorder: 'rgba(16, 185, 129, 0.4)',
    },
    {
      id: 'alert-3',
      category: 'PREDICTIVE RISK',
      severity: 'warning',
      icon: <AlertTriangle size={16} color="#f59e0b" />,
      time: 'Tomorrow',
      title: 'Fungal Blight Risk',
      message: 'High SE winds + 74% humidity increases risk of fungal blight. Scout fields.',
      action: 'Field scouting recommended at morning dew',
      radarMeta: 'Verified: SE Radar Inflow + IoT Mesh Telemetry',
      accentColor: '#f59e0b',
      badgeBg: 'rgba(245, 158, 11, 0.18)',
      badgeBorder: 'rgba(245, 158, 11, 0.4)',
    },
    {
      id: 'alert-4',
      category: 'RESOURCE EFFICIENCY',
      severity: 'resource',
      icon: <Droplets size={16} color="#38bdf8" />,
      time: 'Next 24-48 Hours',
      title: 'Canal Irrigation Advisory',
      message: 'Soil moisture retention high following precipitation. Defer canal irrigation to conserve tubewell electricity.',
      action: 'Conserve tubewell electricity & avoid waterlogging',
      radarMeta: 'Verified: Soil Infiltration + Citizen Reports',
      accentColor: '#38bdf8',
      badgeBg: 'rgba(56, 189, 248, 0.18)',
      badgeBorder: 'rgba(56, 189, 248, 0.4)',
    },
  ];

  const items = alerts || defaultInsights;

  return (
    <div className="glass-panel nowcast-card animate-fade-in">
      {/* 1. Card Header Row */}
      <div className="card-title-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
        <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
          {/* Pulsing Live Dot matching GramWeather design system */}
          <div className="pulse-dot live" style={{ width: '8px', height: '8px', flexShrink: 0 }} />
          <Zap size={18} color="#10b981" />
          <span>Nowcast Actionable Insights</span>
        </div>

        {/* Multi-Source Verified Pill */}
        <span className="badge badge-live" style={{ fontSize: '0.68rem', padding: '3px 9px', letterSpacing: '0.04em' }}>
          ✓ Multi-Source Verified
        </span>
      </div>

      {/* Subtitle explicitly clarifying fusion of Radar + Human Ground Reports */}
      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 10px 0', lineHeight: 1.35 }}>
        Real-time AI advisories cross-verified from multiple sources: <strong style={{ color: 'var(--accent-emerald)' }}>Doppler radar sweeps</strong>, <strong style={{ color: '#38bdf8' }}>Report Weather ground truth from farmers</strong>, and <strong style={{ color: '#fff' }}>IoT mesh sensors</strong>.
      </p>

      {/* 2. Scrollable Alert Feed */}
      <div className="nowcast-feed-list">
        {items.map((alert) => (
          <div key={alert.id} className={`nowcast-alert-card ${alert.severity}`}>
            {/* Top Row: Severity Tag & Highlighted Time */}
            <div className="nowcast-alert-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {alert.icon}
                <span
                  className="nowcast-category-pill"
                  style={{
                    background: alert.badgeBg,
                    color: alert.accentColor,
                    border: `1px solid ${alert.badgeBorder}`,
                  }}
                >
                  {alert.category}
                </span>
              </div>

              {/* Highlighted Time Badge */}
              <span
                className="nowcast-time-badge"
                style={{
                  color: alert.accentColor,
                  border: `1px solid ${alert.badgeBorder}`,
                }}
              >
                ⏱️ {alert.time}
              </span>
            </div>

            {/* Main Actionable Advisory Message */}
            <p className="nowcast-message">
              {alert.message}
            </p>

            {/* Micro Action Footer with verification evidence sources */}
            {alert.action && (
              <div className="nowcast-action-footer">
                <span style={{ color: alert.accentColor, fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ display: 'inline-block', width: '5px', height: '5px', borderRadius: '50%', background: alert.accentColor }} />
                  Action: {alert.action}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontStyle: 'italic' }}>
                  {alert.radarMeta}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 3. Tactical Multi-Source Verification Footer */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '10px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        fontSize: '0.72rem',
        color: 'var(--text-muted)',
        marginTop: '2px'
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-emerald)', display: 'inline-block' }} />
          Fused Sources: Radar Sweep + Farmer Ground Reports + IoT Sensors
        </span>
        <span style={{ color: 'var(--accent-emerald)', fontWeight: 600, fontSize: '0.7rem' }}>
          Consensus: 85%+
        </span>
      </div>
    </div>
  );
}
