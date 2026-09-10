import React, { useState } from 'react';
import { MapPin, CheckCircle2, XCircle, Sprout, Wind } from './icons';
import { useWeather } from '../context/WeatherContext';

export default function LocationChamberModal() {
  const {
    isLocationModalOpen,
    setIsLocationModalOpen,
    currentState,
    currentBlock,
    selectedVillage,
    selectedVillageId,
    availableStates,
    availableBlocks,
    availableVillages,
    handleSelectState,
    handleSelectBlock,
    handleSelectVillage,
    villages,
    t,
    getVillageLabel,
    getCropLabel,
  } = useWeather();

  const [searchQuery, setSearchQuery] = useState('');

  if (!isLocationModalOpen) return null;

  const filteredVillages = (villages || []).filter(v => {
    if (!searchQuery.trim()) return false;
    const q = searchQuery.toLowerCase().trim();
    return (
      (v.name || '').toLowerCase().includes(q) ||
      (v.block || '').toLowerCase().includes(q) ||
      (v.district || '').toLowerCase().includes(q) ||
      (v.state || '').toLowerCase().includes(q) ||
      (getVillageLabel(v.name) || '').toLowerCase().includes(q) ||
      (getVillageLabel(v.block || v.district) || '').toLowerCase().includes(q) ||
      (getVillageLabel(v.state) || '').toLowerCase().includes(q)
    );
  });

  return (
    <div
      className="modal-backdrop animate-fade-in"
      onClick={() => setIsLocationModalOpen(false)}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(5, 12, 10, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '920px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          background: 'linear-gradient(135deg, rgba(15, 32, 28, 0.98) 0%, rgba(9, 20, 18, 0.98) 100%)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(16, 185, 129, 0.15)',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-verified" style={{ fontSize: '0.72rem' }}>
                <MapPin size={12} /> {t('threeChamberTitle')}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {t('threeChamberSubtitle')}
              </span>
            </div>
            <h2 style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 800, marginTop: '8px' }}>
              {t('threeChamberTitle')}
            </h2>
          </div>
          <button
            onClick={() => setIsLocationModalOpen(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '4px',
            }}
            title="Close"
          >
            <XCircle size={24} />
          </button>
        </div>

        {/* Real-time Location Search & Direct Village Entry Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(0, 0, 0, 0.45)',
          border: '1.5px solid rgba(16, 185, 129, 0.45)',
          borderRadius: 'var(--radius-md)',
          padding: '10px 16px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}>
          <span style={{ fontSize: '1.1rem' }}>🔍</span>
          <input
            type="text"
            placeholder={t('enterLocationSearch') || "Search or enter village name (e.g. Khanna, Baramati, Anand, Mandya, Muzaffarnagar...)"}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: '0.92rem',
              fontWeight: 600,
              width: '100%',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1rem', padding: '0 4px' }}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Direct Search Results or 3-Chambers View */}
        {searchQuery.trim() ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minHeight: '260px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Matching villages ({filteredVillages.length}):
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px', maxHeight: '320px', overflowY: 'auto' }}>
              {filteredVillages.map((vg) => {
                const isCurrent = vg.id === selectedVillageId;
                return (
                  <div
                    key={vg.id}
                    onClick={() => {
                      handleSelectState(vg.state);
                      handleSelectBlock(vg.block || vg.district);
                      handleSelectVillage(vg.id);
                      setIsLocationModalOpen(false);
                      setSearchQuery('');
                    }}
                    style={{
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      background: isCurrent ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0, 0, 0, 0.35)',
                      border: isCurrent ? '1.5px solid #10b981' : '1px solid var(--border-subtle)',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MapPin size={14} color="#10b981" /> {getVillageLabel(vg.name)}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '3px' }}>
                        {getVillageLabel(vg.block || vg.district)} • {getVillageLabel(vg.state)}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        Elevation: {vg.elevation}m • Crops: {vg.primary_crops?.slice(0, 2).map(c => getCropLabel(c)).join(', ')}
                      </div>
                    </div>
                    <button
                      className="btn-primary"
                      style={{ padding: '6px 12px', fontSize: '0.74rem' }}
                    >
                      Select
                    </button>
                  </div>
                );
              })}
              {filteredVillages.length === 0 && (
                <div style={{ color: 'var(--text-muted)', padding: '30px', textAlign: 'center', gridColumn: '1 / -1' }}>
                  No village found matching "{searchQuery}". You can select your village using the 3 chambers below.
                </div>
              )}
            </div>
          </div>
        ) : (
          /* 3 Chambers Grid */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            minHeight: '280px',
          }}
        >
          {/* Chamber 1: State */}
          <div
            className="chamber-column"
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '8px' }}>
              <span
                style={{
                  background: '#10b981',
                  color: '#064e3b',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                }}
              >
                1
              </span>
              <h4 style={{ fontSize: '0.92rem', color: '#fff', fontWeight: 700, margin: 0 }}>
                {t('chamber1Label')}
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', maxHeight: '240px', paddingRight: '4px' }}>
              {availableStates.map((st) => {
                const isActive = st === currentState;
                return (
                  <button
                    key={st}
                    onClick={() => handleSelectState(st)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: isActive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                      border: isActive ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.06)',
                      color: isActive ? '#fff' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.88rem',
                      textAlign: 'left',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span>{getVillageLabel(st)}</span>
                    {isActive && <CheckCircle2 size={14} color="#10b981" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chamber 2: Block */}
          <div
            className="chamber-column"
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '8px' }}>
              <span
                style={{
                  background: '#38bdf8',
                  color: '#0c4a6e',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                }}
              >
                2
              </span>
              <h4 style={{ fontSize: '0.92rem', color: '#fff', fontWeight: 700, margin: 0 }}>
                {t('chamber2Label')}
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', maxHeight: '240px', paddingRight: '4px' }}>
              {availableBlocks.map((bl) => {
                const isActive = bl === currentBlock;
                return (
                  <button
                    key={bl}
                    onClick={() => handleSelectBlock(bl)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: isActive ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                      border: isActive ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.06)',
                      color: isActive ? '#fff' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.88rem',
                      textAlign: 'left',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span>{getVillageLabel(bl)}</span>
                    {isActive && <CheckCircle2 size={14} color="#38bdf8" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chamber 3: Village */}
          <div
            className="chamber-column"
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '8px' }}>
              <span
                style={{
                  background: '#f59e0b',
                  color: '#78350f',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                }}
              >
                3
              </span>
              <h4 style={{ fontSize: '0.92rem', color: '#fff', fontWeight: 700, margin: 0 }}>
                {t('chamber3Label')}
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', maxHeight: '240px', paddingRight: '4px' }}>
              {availableVillages.map((vg) => {
                const isActive = vg.id === selectedVillageId;
                return (
                  <button
                    key={vg.id}
                    onClick={() => handleSelectVillage(vg.id)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: '4px',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: isActive ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                      border: isActive ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.06)',
                      color: isActive ? '#fff' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.88rem',
                      textAlign: 'left',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: isActive ? '#34d399' : '#fff', fontWeight: 700 }}>
                        {getVillageLabel(vg.name)}
                      </span>
                      {isActive && <CheckCircle2 size={14} color="#10b981" />}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {vg.elevation}m elevation • {vg.primary_crops?.slice(0, 2).map((c) => getCropLabel(c)).join(', ')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        )}

        {/* Active Selection Summary Bar */}
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              {t('locationConfirmed')}:
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
              <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
                1. {getVillageLabel(currentState)}
              </span>
              <span style={{ color: 'var(--text-muted)' }}>›</span>
              <span className="badge" style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8' }}>
                2. {getVillageLabel(currentBlock)}
              </span>
              <span style={{ color: 'var(--text-muted)' }}>›</span>
              <span className="badge" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', fontWeight: 700 }}>
                3. {getVillageLabel(selectedVillage.name)}
              </span>
            </div>
          </div>

          <button
            className="btn-primary"
            onClick={() => setIsLocationModalOpen(false)}
            style={{ padding: '8px 20px', fontSize: '0.85rem' }}
          >
            {t('locationConfirmed')}
          </button>
        </div>
      </div>
    </div>
  );
}
