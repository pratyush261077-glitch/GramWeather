import React, { useState, useEffect } from 'react';
import { useWeather } from '../context/WeatherContext';
import { ShieldCheck, CheckCircle2, XCircle, AlertTriangle, RefreshCw, Camera, Volume2 } from '../components/icons';
import TransparencyBadge from '../components/TransparencyBadge';
import LearningLoop from '../components/LearningLoop';

export default function Verification({ inspectTarget }) {
  const {
    selectedVillage,
    observations,
    weatherData,
    verifyReport,
    latestVerification,
    demoScenario,
    setDemoScenario,
    t,
    getConditionLabel,
    getIntensityLabel,
    getStatusLabel,
    translateText
  } = useWeather();

  const [activeObservation, setActiveObservation] = useState(inspectTarget || null);
  const [verificationData, setVerificationData] = useState(latestVerification || null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [selectedMediaZoom, setSelectedMediaZoom] = useState(null);

  useEffect(() => {
    if (inspectTarget) {
      setActiveObservation(inspectTarget);
    } else if (observations && observations.length > 0 && !activeObservation) {
      setActiveObservation(observations[0]);
    }
  }, [inspectTarget, observations, activeObservation]);

  // Trigger verification whenever observation or scenario changes
  const runVerificationNow = async (obs, scenarioChoice) => {
    if (!obs) return;
    setIsVerifying(true);
    try {
      const res = await verifyReport(obs, scenarioChoice);
      setVerificationData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    if (activeObservation) {
      runVerificationNow(activeObservation, demoScenario);
    }
  }, [activeObservation?.id, demoScenario]);

  const score = Math.round(verificationData?.confidence_score || 50);
  const status = verificationData?.status || activeObservation?.status || 'PENDING';
  const isVerified = status === 'VERIFIED';
  const isConflict = status === 'CONFLICT';

  const hasImage = Boolean(activeObservation?.image_url || activeObservation?.media_attached?.has_image || activeObservation?.media_attached?.image);
  const hasAudio = Boolean(activeObservation?.audio_url || activeObservation?.media_attached?.has_audio || activeObservation?.media_attached?.audio);

  return (
    <div className="tab-pane animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Engine Header & Scenarios */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-verified">{t('verificationTitle')}</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Observe → <strong>Verify</strong> → Fuse → Predict → Explain
            </span>
          </div>
          <h2 style={{ fontSize: '1.4rem', color: '#fff', marginTop: '6px', fontWeight: 800 }}>
            {t('verificationTitle')}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', marginTop: '4px', maxWidth: '640px' }}>
            {t('verificationSub')}
          </p>
        </div>

        {/* Preset Dual-Scenario Tester for Jury / Presentation */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {t('demoPreset')}
          </span>
          <div className="scenario-btn-group">
            <button
              className={`btn-scenario agreement ${demoScenario === 'agreement_rain' ? 'active' : ''}`}
              onClick={() => {
                setDemoScenario('agreement_rain');
                if (activeObservation) runVerificationNow({ ...activeObservation, event: 'Heavy Rain', intensity: 'Heavy' }, 'agreement_rain');
              }}
            >
              {t('demoAgreement')}
            </button>
            <button
              className={`btn-scenario conflict ${demoScenario === 'conflict_dry' ? 'active' : ''}`}
              onClick={() => {
                setDemoScenario('conflict_dry');
                if (activeObservation) runVerificationNow({ ...activeObservation, event: 'Heavy Rain', intensity: 'Heavy' }, 'conflict_dry');
              }}
            >
              {t('demoConflict')}
            </button>
          </div>
        </div>
      </div>

      {/* Observation Selector Strip */}
      <div className="glass-panel" style={{ padding: '16px 20px' }}>
        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '10px', fontWeight: 600 }}>
          {t('selectObsToExamine')}
        </div>
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
          {observations.map((obs) => {
            const obsImg = Boolean(obs.image_url || obs.media_attached?.has_image || obs.media_attached?.image);
            const obsAud = Boolean(obs.audio_url || obs.media_attached?.has_audio || obs.media_attached?.audio);
            return (
              <button
                key={obs.id}
                onClick={() => setActiveObservation(obs)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: activeObservation?.id === obs.id ? 'var(--bg-surface)' : 'rgba(0,0,0,0.2)',
                  border: activeObservation?.id === obs.id ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                  color: '#fff',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textAlign: 'left',
                  whiteSpace: 'nowrap',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>{getConditionLabel(obs.event)} ({getIntensityLabel(obs.intensity)})</span>
                  {obsImg && <span title="Photo attached" style={{ fontSize: '0.7rem' }}>📷</span>}
                  {obsAud && <span title="Voice note attached" style={{ fontSize: '0.7rem' }}>🎤</span>}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{obs.reporter_name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Verification Results Panel */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              {t('evaluatedObs')}
            </span>
            <h3 style={{ fontSize: '1.2rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span>{getConditionLabel(activeObservation?.event)} ({getIntensityLabel(activeObservation?.intensity)}) — {activeObservation?.reporter_name}</span>
              {hasImage && (
                <span className="badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', fontSize: '0.7rem' }}>
                  <Camera size={11} /> Photo Evidence
                </span>
              )}
              {hasAudio && (
                <span className="badge" style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', fontSize: '0.7rem' }}>
                  <Volume2 size={11} /> Voice Telemetry
                </span>
              )}
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>{t('concordanceScore')}</span>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: isVerified ? '#34d399' : isConflict ? '#f87171' : '#fbbf24' }}>
                {score}%
              </span>
            </div>
            <span className={`badge ${isVerified ? 'badge-verified' : isConflict ? 'badge-conflict' : 'badge-unverified'}`} style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
              {isVerified ? <CheckCircle2 size={16} /> : isConflict ? <XCircle size={16} /> : <AlertTriangle size={16} />}
              {getStatusLabel(status)}
            </span>
          </div>
        </div>

        {/* Explainable Reasoning Banner */}
        <div
          style={{
            background: isVerified ? 'rgba(16, 185, 129, 0.1)' : isConflict ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
            border: isVerified ? '1px solid rgba(16, 185, 129, 0.3)' : isConflict ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: 'var(--radius-sm)',
            padding: '14px 18px',
          }}
        >
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: isVerified ? '#6ee7b7' : isConflict ? '#fca5a5' : '#fde68a' }}>
            {translateText(verificationData?.summary) || t('consensusMonitoring')}
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', marginTop: '4px' }}>
            <strong>{t('actionImplication')}:</strong> {translateText(verificationData?.action_implication) || t('monitoringGroundConsensus')}
          </div>
        </div>

        {/* Farmer Ground Media Evidence (Slide 4 in Pitch Deck) */}
        {(hasImage || hasAudio) && (
          <div style={{ background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: 'var(--radius-sm)', padding: '14px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                📷 Farmer Ground Media Evidence
              </span>
              <span style={{ fontSize: '0.7rem', color: '#fbbf24', background: 'rgba(245, 158, 11, 0.12)', padding: '2px 8px', borderRadius: '4px' }}>
                📁 Local prototype disk storage (/uploads/observations/)
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', alignItems: 'center' }}>
              {activeObservation?.image_url && (
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Field Ground Photo:</div>
                  <img
                    src={activeObservation.image_url}
                    alt="Ground Photo"
                    onClick={() => setSelectedMediaZoom(activeObservation.image_url)}
                    style={{
                      height: '110px',
                      width: '100%',
                      objectFit: 'cover',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      border: '1px solid rgba(56, 189, 248, 0.3)'
                    }}
                  />
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>Click to view full photo</div>
                </div>
              )}

              {activeObservation?.audio_url && (
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Farmer Voice Note:</div>
                  <audio controls src={activeObservation.audio_url} style={{ width: '100%', height: '36px' }} />
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>Recorded audio note from village reporter</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Multi-Source Evidence Breakdown Table */}
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
            {t('evidenceMatrixTitle')}
          </h4>

          <table className="evidence-table">
            <thead>
              <tr>
                <th>{t('colSource')}</th>
                <th>{t('colTelemetry')}</th>
                <th>{t('colConcordance')}</th>
                <th>{t('colWeight')}</th>
                <th>{t('colDetail')}</th>
                <th>{t('colClass')}</th>
              </tr>
            </thead>
            <tbody>
              {/* If media attached, display Farmer photo/voice report row in matrix */}
              {(hasImage || hasAudio) && (
                <tr style={{ background: 'rgba(56, 189, 248, 0.05)' }}>
                  <td style={{ fontWeight: 700, color: '#38bdf8' }}>Farmer photo/voice report</td>
                  <td style={{ color: 'var(--text-primary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      {activeObservation.image_url && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <img
                            src={activeObservation.image_url}
                            alt="Evidence thumbnail"
                            onClick={() => setSelectedMediaZoom(activeObservation.image_url)}
                            style={{
                              width: '42px',
                              height: '42px',
                              objectFit: 'cover',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              border: '1px solid #38bdf8'
                            }}
                            title="Click to view full photo"
                          />
                          <span style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>Photo: user-uploaded, time & location stamped</span>
                        </div>
                      )}
                      {activeObservation.audio_url && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <audio controls src={activeObservation.audio_url} style={{ height: '28px', maxWidth: '170px' }} />
                          <span style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>Voice note: on-device transcription</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <span style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                      <CheckCircle2 size={14} /> Corroborating
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>Direct (100%)</td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {activeObservation.description ? `"${activeObservation.description}"` : 'Direct visual/voice ground observation'}
                  </td>
                  <td>
                    <span className="badge" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', fontSize: '0.7rem' }}>
                      Local Upload
                    </span>
                  </td>
                </tr>
              )}

              {verificationData?.evidence_breakdown?.map((ev, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 700, color: '#fff' }}>{ev.source_name}</td>
                  <td style={{ color: 'var(--text-primary)' }}>{ev.reading}</td>
                  <td>
                    {ev.agrees ? (
                      <span style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                        <CheckCircle2 size={14} /> {t('agrees')}
                      </span>
                    ) : (
                      <span style={{ color: '#f87171', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                        <XCircle size={14} /> {t('conflicts')}
                      </span>
                    )}
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{Math.round(ev.reliability_weight * 100)}%</td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{translateText(ev.detail)}</td>
                  <td>
                    <TransparencyBadge source={ev.is_simulated ? 'Simulated' : 'Live NWP'} isSimulated={ev.is_simulated} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Image Zoom Modal */}
      {selectedMediaZoom && (
        <div
          className="modal-overlay animate-fade-in"
          onClick={() => setSelectedMediaZoom(null)}
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
                Field Photo Evidence Verification • {activeObservation?.reporter_name}
              </span>
              <button
                onClick={() => setSelectedMediaZoom(null)}
                style={{ background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', border: 'none' }}
              >
                ✕
              </button>
            </div>
            <img
              src={selectedMediaZoom}
              alt="Zoomed evidence"
              style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: '4px' }}
            />
            <span style={{ fontSize: '0.7rem', color: '#fbbf24' }}>
              📁 Local Prototype Storage: Stored at {selectedMediaZoom}
            </span>
          </div>
        </div>
      )}

      {/* Closed-Loop Verification & Learning Loop (Slide 2 & 6 in Pitch Deck) */}
      <LearningLoop learningData={weatherData?.learning_loop} />
    </div>
  );
}
