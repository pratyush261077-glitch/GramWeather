import React, { useState, useEffect } from 'react';
import { useWeather } from '../context/WeatherContext';
import { fetchVillageHistory } from '../services/weatherAPI';
import { CloudRain, Sun, Info } from '../components/icons';
import TransparencyBadge from '../components/TransparencyBadge';

export default function History() {
  const { selectedVillage, t } = useWeather();
  const [historyData, setHistoryData] = useState(null);

  useEffect(() => {
    async function loadHist() {
      try {
        const res = await fetchVillageHistory(selectedVillage.id);
        setHistoryData(res);
      } catch (err) {
        console.error(err);
      }
    }
    loadHist();
  }, [selectedVillage.id]);

  const trends = historyData?.recent_trend || [];
  const chirps = historyData?.chirps_baseline;

  return (
    <div className="dashboard-content animate-fade-in">
      <div className="card-title-row" style={{ marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CloudRain size={22} color="#38bdf8" /> {t('historyTitle')}
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            {t('historySub')}
          </p>
        </div>
        <TransparencyBadge source="CHIRPS + Open-Meteo Archive" isSimulated={false} />
      </div>

      {/* CHIRPS Benchmark Card */}
      {chirps && (
        <div
          className="glass-panel"
          style={{
            padding: '20px 24px',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(56, 189, 248, 0.05) 100%)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-emerald)', textTransform: 'uppercase' }}>
              {t('chirpsNormal')}
            </span>
            <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: '4px 0' }}>
              {t('avgMonthlyRain')}: {chirps.average_monthly_rainfall_mm} mm
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {t('statusLabel')}: <strong style={{ color: '#34d399' }}>{chirps.drought_risk_index}</strong> • {t('citationLabel')}: {chirps.citation}
            </p>
          </div>
          <TransparencyBadge source="CHIRPS Benchmark" isSimulated={false} />
        </div>
      )}

      {/* 7-Day Rainfall & Temp Bar/Table */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          {t('sevenDayTrend')}
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
          {trends.map((item, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(0,0,0,0.25)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '14px 10px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                {item.date}
              </span>

              {item.rainfall_mm > 0 ? (
                <div style={{ color: '#38bdf8', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                  <CloudRain size={20} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{item.rainfall_mm} mm</span>
                </div>
              ) : (
                <div style={{ color: '#fbbf24', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                  <Sun size={20} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{t('dry')}</span>
                </div>
              )}

              <div style={{ fontSize: '0.75rem', color: '#fff', marginTop: '4px' }}>
                {item.temp_max}° / {item.temp_min}°
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
