import React, { useState } from 'react';
import { Eye, CheckCircle2, AlertTriangle, XCircle, Camera, Volume2 } from './icons';
import { useWeather } from '../context/WeatherContext';

function ObservationCard({ observation, onVerify }) {
  const { t, getConditionLabel, getIntensityLabel, getStatusLabel, getTimeLabel, translateText } = useWeather();
  const [showFullImage, setShowFullImage] = useState(false);

  const status = observation.status || 'PENDING';
  const isVerified = status === 'VERIFIED';
  const isConflict = status === 'CONFLICT';
  const isPending = status === 'PENDING';

  const badgeClass = isVerified
    ? 'badge-verified'
    : isConflict
    ? 'badge-conflict'
    : isPending
    ? 'badge-unverified'
    : 'badge-unverified';

  const statusIcon = isVerified ? (
    <CheckCircle2 size={13} color="#10b981" />
  ) : isConflict ? (
    <XCircle size={13} color="#ef4444" />
  ) : (
    <AlertTriangle size={13} color="#f59e0b" />
  );

  const hasImage = Boolean(observation.image_url || observation.media_attached?.has_image || observation.media_attached?.image);
  const hasAudio = Boolean(observation.audio_url || observation.media_attached?.has_audio || observation.media_attached?.audio);

  return (
    <div
      style={{
        background: 'rgba(0,0,0,0.25)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-sm)',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        transition: 'border-color 0.2s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#fff' }}>
              {getConditionLabel(observation.event)} ({getIntensityLabel(observation.intensity)})
            </span>
            {hasImage && (
              <span className="badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', fontSize: '0.65rem', padding: '2px 6px' }}>
                <Camera size={10} /> Photo
              </span>
            )}
            {hasAudio && (
              <span className="badge" style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', fontSize: '0.65rem', padding: '2px 6px' }}>
                <Volume2 size={10} /> Voice
              </span>
            )}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            {t('reportedBy')} {observation.reporter_name} • {getTimeLabel(observation.time_description)}
          </div>
        </div>

        <span className={`badge ${badgeClass}`}>
          {statusIcon} {getStatusLabel(status)}
        </span>
      </div>

      {observation.description && (
        <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontStyle: 'italic', background: 'rgba(255,255,255,0.02)', padding: '6px 10px', borderRadius: '4px' }}>
          "{translateText(observation.description)}"
        </div>
      )}

      {/* Attached Media Previews */}
      {(hasImage || hasAudio) && (
        <div style={{ background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '6px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {hasImage && observation.image_url && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Camera size={12} /> Photo: user-uploaded, time & location stamped
                </span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Tap to zoom</span>
              </div>
              <img
                src={observation.image_url}
                alt="Farmer field report"
                loading="lazy"
                decoding="async"
                onClick={() => setShowFullImage(true)}
                style={{
                  width: '100%',
                  maxHeight: '140px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                }}
              />
            </div>
          )}

          {hasAudio && observation.audio_url && (
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                <Volume2 size={12} /> Voice note: on-device transcription
              </div>
              <audio controls src={observation.audio_url} style={{ width: '100%', height: '32px' }} />
            </div>
          )}
        </div>
      )}

      {/* Full Image Modal */}
      {showFullImage && observation.image_url && (
        <div
          className="modal-overlay animate-fade-in"
          onClick={() => setShowFullImage(false)}
          style={{ zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#091512',
              border: '1px solid var(--border-active)',
              borderRadius: '8px',
              padding: '16px',
              maxWidth: '90vw',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
                Field Photo Evidence • {observation.reporter_name}
              </span>
              <button
                onClick={() => setShowFullImage(false)}
                style={{ background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', border: 'none' }}
              >
                ✕
              </button>
            </div>
            <img
              src={observation.image_url}
              alt="Enlarged field report"
              loading="lazy"
              decoding="async"
              style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: '4px' }}
            />
            <span style={{ fontSize: '0.7rem', color: '#fbbf24' }}>
              📁 Local Prototype Storage: Stored at {observation.image_url}
            </span>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          {t('confidence')}: <strong>{Math.round(observation.confidence_score || observation.confidence || 50)}%</strong>
        </span>

        {onVerify && (
          <button
            onClick={() => onVerify(observation)}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-active)',
              color: 'var(--accent-emerald)',
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Eye size={12} /> {t('inspectEvidence')}
          </button>
        )}
      </div>
    </div>
  );
}

export default React.memo(ObservationCard);
