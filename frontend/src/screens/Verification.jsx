import React, { useState, useEffect } from 'react';
import { useWeather } from '../context/WeatherContext';
import { ShieldCheck, CheckCircle2, XCircle, AlertTriangle, RefreshCw } from '../components/icons';
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
  }, [activeObservation, demoScenario]);

  const status = verificationData?.status || 'VERIFIED';
  const score = verificationData?.confidence_score ?? 84;
  const isVerified = status === 'VERIFIED';
  const isConflict = status === 'CONFLICT';

  return (
    <div className="verification-lab animate-fade-in">
      {/* Header & Scenario Controls */}
      <div className="scenario-picker-bar">
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={22} color="#10b981" /> {t('verificationTitle')}
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            {t('verificationSub')}
          </p>
        </div>

        {/* Preset Dual-Scenario Tester for Jury / Presentation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{t('demoPreset')}</span>
          <div className="scenario-btn-group">
            <button
              className={`btn-scenario agree ${demoScenario === 'agreement_rain' ? 'active' : ''}`}
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
          {observations.map((obs) => (
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
              <div>{getConditionLabel(obs.event)} ({getIntensityLabel(obs.intensity)})</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{obs.reporter_name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Verification Results Panel */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              {t('evaluatedObs')}
            </span>
            <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>
              {getConditionLabel(activeObservation?.event)} ({getIntensityLabel(activeObservation?.intensity)}) — {activeObservation?.reporter_name}
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
            {translateText(verificationData?.summary) || t('connecting')}
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', marginTop: '4px' }}>
            <strong>{t('actionImplication')}:</strong> {translateText(verificationData?.action_implication) || t('connecting')}
          </div>
        </div>

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

      {/* Closed-Loop Verification & Learning Loop (Slide 2 & 6 in Pitch Deck) */}
      <LearningLoop learningData={weatherData?.learning_loop} />
    </div>
  );
}
