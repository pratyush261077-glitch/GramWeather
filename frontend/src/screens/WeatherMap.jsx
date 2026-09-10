import React, { useState } from 'react';
import { useWeather } from '../context/WeatherContext';
import { MapPin, Wind, CloudRain, ShieldCheck } from '../components/icons';
import TransparencyBadge from '../components/TransparencyBadge';

export default function WeatherMap() {
  const { selectedVillage, weatherData, t } = useWeather();
  const [activeNode, setActiveNode] = useState(null);

  const sensors = weatherData?.sensors || [];
  const current = weatherData?.current;

  return (
    <div className="dashboard-content animate-fade-in">
      <div className="card-title-row" style={{ marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={22} color="#10b981" /> {t('villageMapTitle')}
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            {t('villageMapSub')}
          </p>
        </div>
        <TransparencyBadge source="Micro-Telemetry Radar" isSimulated={true} />
      </div>

      <div className="dashboard-grid">
        {/* Visual Map Canvas / Radar */}
        <div className="glass-panel" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
          <div
            style={{
              width: '100%',
              height: '460px',
              background: 'radial-gradient(circle, #0a1f1a 0%, #06100d 80%)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Concentric Radar Rings */}
            <div style={{ position: 'absolute', width: '120px', height: '120px', borderRadius: '50%', border: '1px dashed rgba(16, 185, 129, 0.2)' }} />
            <div style={{ position: 'absolute', width: '240px', height: '240px', borderRadius: '50%', border: '1px dashed rgba(16, 185, 129, 0.2)' }} />
            <div style={{ position: 'absolute', width: '380px', height: '380px', borderRadius: '50%', border: '1px dashed rgba(16, 185, 129, 0.15)' }} />

            {/* Radar Crosshairs */}
            <div style={{ position: 'absolute', width: '100%', height: '1px', background: 'rgba(16, 185, 129, 0.1)' }} />
            <div style={{ position: 'absolute', height: '100%', width: '1px', background: 'rgba(16, 185, 129, 0.1)' }} />

            {/* Range markers */}
            <span style={{ position: 'absolute', top: '238px', right: '35px', fontSize: '0.65rem', color: 'var(--text-muted)' }}>10 km</span>
            <span style={{ position: 'absolute', top: '238px', right: '110px', fontSize: '0.65rem', color: 'var(--text-muted)' }}>5 km</span>
            <span style={{ position: 'absolute', top: '238px', right: '170px', fontSize: '0.65rem', color: 'var(--text-muted)' }}>2 km</span>

            {/* Center: Village Core */}
            <div
              onClick={() => setActiveNode({ type: 'village', data: selectedVillage })}
              style={{
                zIndex: 20,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 20px #10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                <MapPin size={18} />
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#fff', background: 'rgba(0,0,0,0.7)', padding: '2px 8px', borderRadius: '4px' }}>
                {selectedVillage.name}
              </span>
            </div>

            {/* Sensor 1: North Field */}
            <div
              onClick={() => setActiveNode({ type: 'sensor', data: sensors[0] || {} })}
              style={{
                position: 'absolute',
                top: '110px',
                left: '260px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(15, 32, 28, 0.9)',
                border: '1px solid var(--accent-emerald)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                zIndex: 15,
              }}
            >
              <span className="pulse-dot live" />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>Node 01: North Field</span>
            </div>

            {/* Sensor 2: Panchayat Roof */}
            <div
              onClick={() => setActiveNode({ type: 'sensor', data: sensors[1] || {} })}
              style={{
                position: 'absolute',
                bottom: '120px',
                right: '180px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(15, 32, 28, 0.9)',
                border: '1px solid var(--accent-emerald)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                zIndex: 15,
              }}
            >
              <span className="pulse-dot live" />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>Node 02: Panchayat Roof</span>
            </div>

            {/* Cloud Advection Vector Graphic */}
            <div
              style={{
                position: 'absolute',
                top: '60px',
                left: '60px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                padding: '6px 14px',
                borderRadius: 'var(--radius-sm)',
                color: '#38bdf8',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}
            >
              <Wind size={16} /> Incoming Cloud Front: NW → SE ({current?.wind_speed || 12} km/h)
            </div>
          </div>
        </div>

        {/* Selected Map Node Details */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card-title">
            <ShieldCheck size={18} color="#10b981" /> Telemetry Node Inspector
          </div>

          {activeNode ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                {activeNode.type === 'village' ? selectedVillage.name : activeNode.data?.sensor_id || 'ESP32 Micro-Sensor'}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                {activeNode.type === 'village'
                  ? `Center Coordinates: ${selectedVillage.latitude}° N, ${selectedVillage.longitude}° E`
                  : `Source: ${activeNode.data?.source || 'ESP32 IoT Station'}`}
              </div>

              {activeNode.type === 'sensor' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                  <div className="metric-pill">
                    <span className="metric-label">Status</span>
                    <span className="metric-val" style={{ color: '#34d399', fontSize: '1rem' }}>
                      {activeNode.data?.health_status || 'ONLINE'}
                    </span>
                  </div>
                  <div className="metric-pill">
                    <span className="metric-label">Temperature</span>
                    <span className="metric-val" style={{ fontSize: '1rem' }}>
                      {activeNode.data?.temperature ?? current?.temperature}°C
                    </span>
                  </div>
                  <div className="metric-pill">
                    <span className="metric-label">Humidity</span>
                    <span className="metric-val" style={{ fontSize: '1rem' }}>
                      {activeNode.data?.humidity ?? current?.relative_humidity}%
                    </span>
                  </div>
                  <div className="metric-pill">
                    <span className="metric-label">Rain Status</span>
                    <span className="metric-val" style={{ color: activeNode.data?.rain_detected ? '#38bdf8' : '#fff', fontSize: '1rem' }}>
                      {activeNode.data?.rain_detected ? 'Rain Active' : 'Dry'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Click any node on the spatial radar to inspect live telemetry readings and sensor health status.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
