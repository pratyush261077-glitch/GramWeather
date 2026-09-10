import React from 'react';
import { MapPin } from './icons';
import { useWeather } from '../context/WeatherContext';

export default function LocationChamberSelector() {
  const {
    currentState,
    currentBlock,
    availableStates,
    availableBlocks,
    availableVillages,
    selectedVillageId,
    handleSelectState,
    handleSelectBlock,
    handleSelectVillage,
    setIsLocationModalOpen,
    t,
    getVillageLabel,
  } = useWeather();

  return (
    <div className="three-chamber-selector" title={t('threeChamberTitle')}>
      {/* Map Icon / Explorer Launcher */}
      <button
        type="button"
        className="chamber-icon-btn"
        onClick={() => setIsLocationModalOpen(true)}
        title={t('threeChamberSubtitle')}
      >
        <MapPin size={15} color="#10b981" />
      </button>

      {/* Chamber 1: State */}
      <div className="chamber-unit chamber-unit-state">
        <span className="chamber-unit-badge">
          <span className="chamber-num">1</span>
          <span className="chamber-title-text">{t('chamberState')}</span>
        </span>
        <select
          className="chamber-select"
          value={currentState}
          onChange={(e) => handleSelectState(e.target.value)}
          aria-label={t('chamberState')}
        >
          {availableStates.map((st) => (
            <option key={st} value={st}>
              {getVillageLabel(st)}
            </option>
          ))}
        </select>
      </div>

      <span className="chamber-unit-arrow">›</span>

      {/* Chamber 2: Block */}
      <div className="chamber-unit chamber-unit-block">
        <span className="chamber-unit-badge">
          <span className="chamber-num">2</span>
          <span className="chamber-title-text">{t('chamberBlock')}</span>
        </span>
        <select
          className="chamber-select"
          value={currentBlock}
          onChange={(e) => handleSelectBlock(e.target.value)}
          aria-label={t('chamberBlock')}
        >
          {availableBlocks.map((bl) => (
            <option key={bl} value={bl}>
              {getVillageLabel(bl)}
            </option>
          ))}
        </select>
      </div>

      <span className="chamber-unit-arrow">›</span>

      {/* Chamber 3: Village */}
      <div className="chamber-unit chamber-unit-village active-chamber">
        <span className="chamber-unit-badge active">
          <span className="chamber-num">3</span>
          <span className="chamber-title-text">{t('chamberVillage')}</span>
        </span>
        <select
          className="chamber-select chamber-select-village"
          value={selectedVillageId}
          onChange={(e) => handleSelectVillage(e.target.value)}
          aria-label={t('chamberVillage')}
        >
          {availableVillages.map((vg) => (
            <option key={vg.id} value={vg.id}>
              {getVillageLabel(vg.name)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
