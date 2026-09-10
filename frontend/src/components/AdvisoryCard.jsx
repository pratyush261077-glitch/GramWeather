import React, { useState } from 'react';
import { Sprout, Droplets, Wind, Sun, Info, Volume2 } from './icons';
import { speakText } from '../utils/voiceAssistant';
import { useWeather } from '../context/WeatherContext';

export default function AdvisoryCard({ advisory, selectedCrop, onSelectCrop, availableCrops }) {
  const { language, t, getCropLabel, getStatusLabel, translateText } = useWeather();
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const crops = availableCrops && availableCrops.length > 0 ? availableCrops : ['Wheat', 'Paddy', 'Sugarcane', 'Cotton', 'Mustard'];

  if (!advisory) {
    return (
      <div className="glass-panel advisory-card">
        <p style={{ color: 'var(--text-secondary)' }}>{t('connecting')}</p>
      </div>
    );
  }

  const riskClass = advisory.risk_level === 'HIGH' ? 'badge-conflict' : advisory.risk_level === 'MODERATE' ? 'badge-unverified' : 'badge-verified';

  const handlePlayVoice = () => {
    setIsPlayingVoice(true);
    const speechMessage = `${getCropLabel(selectedCrop)}: ${translateText(advisory.irrigation_advice)}. ${translateText(advisory.spraying_advice)}. ${translateText(advisory.harvesting_advice)}`;
    speakText(speechMessage, language);
    setTimeout(() => setIsPlayingVoice(false), 6000);
  };

  return (
    <div className="glass-panel advisory-card animate-fade-in">
      <div className="card-title-row">
        <div className="card-title">
          <Sprout size={18} color="#10b981" /> {t('advisoryTitle')}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={handlePlayVoice}
            className="badge"
            style={{
              background: isPlayingVoice ? 'rgba(16, 185, 129, 0.3)' : 'rgba(56, 189, 248, 0.15)',
              color: isPlayingVoice ? '#34d399' : '#38bdf8',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 10px',
            }}
            title="Listen to advisory in local language voice"
          >
            <Volume2 size={13} /> {isPlayingVoice ? t('speaking') : t('voiceReadout')}
          </button>
          <span className={`badge ${riskClass}`}>
            {t('riskLevel')}: {getStatusLabel(advisory.risk_level || 'LOW')}
          </span>
        </div>
      </div>

      {/* Crop Selector Tabs */}
      <div className="crop-selector-tabs">
        {crops.map((c) => (
          <button
            key={c}
            className={`crop-tab ${selectedCrop === c ? 'active' : ''}`}
            onClick={() => onSelectCrop(c)}
          >
            🌾 {getCropLabel(c)}
          </button>
        ))}
      </div>

      {/* Action Recommendation Boxes */}
      <div className="advisory-actions-grid">
        {/* Irrigation */}
        <div className="advisory-box">
          <div className="advisory-box-title">
            <Droplets size={14} color="#38bdf8" /> {t('irrigationStrategy')}
          </div>
          <div className="advisory-box-desc">{translateText(advisory.irrigation_advice)}</div>
        </div>

        {/* Chemical Spraying */}
        <div className="advisory-box">
          <div className="advisory-box-title">
            <Wind size={14} color="#f59e0b" /> {t('sprayingWindow')}
          </div>
          <div className="advisory-box-desc">{translateText(advisory.spraying_advice)}</div>
        </div>

        {/* Harvesting */}
        <div className="advisory-box">
          <div className="advisory-box-title">
            <Sun size={14} color="#fbbf24" /> {t('harvestingStorage')}
          </div>
          <div className="advisory-box-desc">{translateText(advisory.harvesting_advice)}</div>
        </div>

        {/* Fertilizer */}
        <div className="advisory-box">
          <div className="advisory-box-title">
            <Sprout size={14} color="#34d399" /> {t('nutrientManagement')}
          </div>
          <div className="advisory-box-desc">{translateText(advisory.fertilizer_advice)}</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
        <Info size={13} />
        <span>{t('advisoryDisclaimer')}</span>
      </div>
    </div>
  );
}
