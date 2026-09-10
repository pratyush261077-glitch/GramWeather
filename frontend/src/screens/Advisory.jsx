import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { Sprout, Droplets, Wind, Sun, Info } from '../components/icons';
import TransparencyBadge from '../components/TransparencyBadge';

export default function Advisory() {
  const { selectedVillage, advisory, selectedCrop, setSelectedCrop, t, getCropLabel, translateText } = useWeather();
  const crops = selectedVillage.primary_crops || ['Wheat', 'Paddy', 'Sugarcane', 'Cotton'];

  return (
    <div className="dashboard-content animate-fade-in">
      <div className="card-title-row" style={{ marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sprout size={22} color="#10b981" /> {t('advisoryTitle')}
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            {t('advisorySubtitle')}
          </p>
        </div>
        <TransparencyBadge source="ICAR Rules + Open-Meteo" isSimulated={false} />
      </div>

      {/* Crop Selector Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {crops.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCrop(c)}
            className={`btn-scenario ${selectedCrop === c ? 'agree' : ''}`}
            style={{ padding: '10px 20px', fontSize: '0.9rem' }}
          >
            🌾 {getCropLabel(c)}
          </button>
        ))}
      </div>

      {/* Main Advisory Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#38bdf8', fontWeight: 700, fontSize: '1rem' }}>
            <Droplets size={20} /> {t('irrigationStrategy')}
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
            {translateText(advisory?.irrigation_advice) || t('connecting')}
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f59e0b', fontWeight: 700, fontSize: '1rem' }}>
            <Wind size={20} /> {t('sprayingWindow')}
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
            {translateText(advisory?.spraying_advice) || t('connecting')}
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fbbf24', fontWeight: 700, fontSize: '1rem' }}>
            <Sun size={20} /> {t('harvestingStorage')}
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
            {translateText(advisory?.harvesting_advice) || t('connecting')}
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#34d399', fontWeight: 700, fontSize: '1rem' }}>
            <Sprout size={20} /> {t('nutrientManagement')}
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
            {translateText(advisory?.fertilizer_advice) || t('connecting')}
          </p>
        </div>
      </div>
    </div>
  );
}
