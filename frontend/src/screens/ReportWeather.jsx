import React, { useState } from 'react';
import { useWeather } from '../context/WeatherContext';
import { Sun, CloudRain, Wind, AlertTriangle, Send, XCircle, Mic } from '../components/icons';

const EVENT_OPTIONS = [
  { id: 'Heavy Rain', label: 'Heavy Rain', icon: CloudRain, color: '#38bdf8' },
  { id: 'Raining', label: 'Raining', icon: CloudRain, color: '#60a5fa' },
  { id: 'Cloudy', label: 'Cloudy', icon: CloudRain, color: '#94a3b8' },
  { id: 'Clear', label: 'Clear Sky', icon: Sun, color: '#fbbf24' },
  { id: 'Strong Wind', label: 'Strong Wind', icon: Wind, color: '#34d399' },
  { id: 'Hail', label: 'Hail Storm', icon: AlertTriangle, color: '#f87171' },
];

const INTENSITY_OPTIONS = ['Light', 'Moderate', 'Heavy'];
const TIME_OPTIONS = ['Just now', '15 mins ago', '30 mins ago', '1 hour ago'];

export default function ReportWeather({ onClose }) {
  const { selectedVillage, submitReport, t, getConditionLabel, getIntensityLabel, getTimeLabel, getVillageLabel } = useWeather();
  const [selectedEvent, setSelectedEvent] = useState('Heavy Rain');
  const [intensity, setIntensity] = useState('Moderate');
  const [timeDesc, setTimeDesc] = useState('Just now');
  const [reporterName, setReporterName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitReport({
        reporter_name: reporterName.trim() || 'Village Farmer',
        event: selectedEvent,
        intensity: intensity,
        time_description: timeDesc,
        description: description.trim() || undefined,
      });
      setSuccessMsg(t('reportSuccess'));
      setTimeout(() => {
        if (onClose) onClose();
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVoiceQuery = (text, eventDetected, intensityDetected) => {
    setDescription(text);
    setSelectedEvent(eventDetected);
    setIntensity(intensityDetected);
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-community" style={{ fontSize: '0.65rem' }}>{t('voiceInputBadge')}</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 800, marginTop: '4px' }}>
              {t('modalTitle')}
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
              {getVillageLabel(selectedVillage.state)} › {getVillageLabel(selectedVillage.block || selectedVillage.district)} › {getVillageLabel(selectedVillage.name)}
            </span>
          </div>
          {onClose && (
            <button onClick={onClose} style={{ background: 'transparent', color: 'var(--text-secondary)' }}>
              <XCircle size={22} />
            </button>
          )}
        </div>

        {/* Voice Input / Farmer Speaks Presets (Slide 4 in Pitch Deck) */}
        <div style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', marginBottom: '6px' }}>
            <Mic size={14} /> {t('voicePrompt')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <button
              type="button"
              onClick={() => handleVoiceQuery("Dark clouds are coming from the southwest, and the weather feels humid.", "Heavy Rain", "Heavy")}
              style={{
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '4px',
                padding: '6px 10px',
                color: '#cbd5e1',
                fontSize: '0.75rem',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              🗣️ <em>"{t('voiceSample1')}"</em>
            </button>
            <button
              type="button"
              onClick={() => handleVoiceQuery("तेज बारिश शुरू हो गई है और खेतों में पानी भर रहा है", "Heavy Rain", "Heavy")}
              style={{
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '4px',
                padding: '6px 10px',
                color: '#cbd5e1',
                fontSize: '0.75rem',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              🗣️ <em>"{t('voiceSample2')}"</em>
            </button>
          </div>
        </div>

        {successMsg ? (
          <div style={{ padding: '20px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', borderRadius: 'var(--radius-md)', color: '#34d399', textAlign: 'center' }}>
            {successMsg}
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* 1. What weather event do you observe? */}
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                {t('step1SelectEvent')}
              </label>
              <div className="event-grid-buttons">
                {EVENT_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = selectedEvent === opt.id;
                  return (
                    <button
                      type="button"
                      key={opt.id}
                      className={`btn-event-option ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedEvent(opt.id)}
                    >
                      <Icon size={20} color={opt.color} />
                      {getConditionLabel(opt.label)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Intensity & Time */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  {t('intensityLabel')}
                </label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {INTENSITY_OPTIONS.map((intOpt) => (
                    <button
                      type="button"
                      key={intOpt}
                      onClick={() => setIntensity(intOpt)}
                      style={{
                        flex: 1,
                        padding: '6px 4px',
                        borderRadius: 'var(--radius-sm)',
                        background: intensity === intOpt ? '#0f3828' : 'rgba(0,0,0,0.3)',
                        border: intensity === intOpt ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                        color: intensity === intOpt ? '#34d399' : 'var(--text-secondary)',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                      }}
                    >
                      {getIntensityLabel(intOpt)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  {t('sinceWhenLabel')}
                </label>
                <select
                  value={timeDesc}
                  onChange={(e) => setTimeDesc(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '7px 10px',
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#fff',
                    fontSize: '0.8rem',
                  }}
                >
                  {TIME_OPTIONS.map((tm) => (
                    <option key={tm} value={tm} style={{ background: '#0f221d', color: '#fff' }}>
                      {getTimeLabel(tm)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 3. Farmer Name & Description */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="text"
                placeholder={t('namePlaceholder')}
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid var(--border-subtle)',
                  color: '#fff',
                  fontSize: '0.85rem',
                }}
              />

              <textarea
                rows={2}
                placeholder={t('descPlaceholder')}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid var(--border-subtle)',
                  color: '#fff',
                  fontSize: '0.85rem',
                  resize: 'none',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Send size={16} /> {isSubmitting ? t('submitting') : t('btnSubmitReport')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
