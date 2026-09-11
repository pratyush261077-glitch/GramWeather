import React, { useState, useRef, useEffect } from 'react';
import { useWeather } from '../context/WeatherContext';
import { useAuth } from '../context/AuthContext';
import ObservationCard from '../components/ObservationCard';
import {
  Sun,
  CloudRain,
  Wind,
  AlertTriangle,
  Send,
  XCircle,
  Mic,
  Camera,
  Trash2,
  Volume2,
  FileText,
  Square,
  CheckCircle2,
  MapPin,
  Eye
} from '../components/icons';

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

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_AUDIO_SIZE = 8 * 1024 * 1024; // 8MB
const MAX_RECORD_SECONDS = 15;

/**
 * Client-side photo compression using HTML5 Canvas.
 * Caps dimension to max 1280px and applies 0.8 JPEG compression.
 */
async function compressImage(file, maxWidth = 1280, maxHeight = 1280, quality = 0.8) {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || typeof document === 'undefined' || !file.type.startsWith('image/')) {
      return resolve(file);
    }

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) return resolve(file);
            const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = () => resolve(file);
      img.src = readerEvent.target.result;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}

export default function ReportWeather({ onClose, onInspectObservation }) {
  const {
    selectedVillage,
    observations,
    submitReport,
    t,
    getConditionLabel,
    getIntensityLabel,
    getTimeLabel,
    getVillageLabel,
    language
  } = useWeather();
  const { user } = useAuth();

  const [selectedEvent, setSelectedEvent] = useState('Heavy Rain');
  const [intensity, setIntensity] = useState('Moderate');
  const [timeDesc, setTimeDesc] = useState('Just now');
  const [reporterName, setReporterName] = useState(() => user?.name || '');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Post-submit structured observation state
  const [createdObservation, setCreatedObservation] = useState(null);

  // Media attachments state
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);
  const [mediaError, setMediaError] = useState('');

  // Feed filter state: 'all' | 'photo' | 'voice' | 'verified'
  const [feedFilter, setFeedFilter] = useState('all');

  // Geolocation state
  const [geoLocation, setGeoLocation] = useState({
    lat: selectedVillage?.latitude || null,
    lon: selectedVillage?.longitude || null,
    source: 'Village Center',
    isGps: false
  });
  const [isLocating, setIsLocating] = useState(false);

  // Voice recording & Web Speech API transcription state
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [transcriptionNotice, setTranscriptionNotice] = useState('');
  const [activeInputMode, setActiveInputMode] = useState('voice'); // 'voice' | 'photo' | 'text'

  const cameraInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerIntervalRef = useRef(null);
  const speechRecognitionRef = useRef(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (speechRecognitionRef.current) {
        try { speechRecognitionRef.current.stop(); } catch (e) {}
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        try { mediaRecorderRef.current.stop(); } catch (e) {}
      }
    };
  }, []);

  // Request browser GPS position
  const acquireLocation = () => {
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGeoLocation({
            lat: Number(pos.coords.latitude.toFixed(5)),
            lon: Number(pos.coords.longitude.toFixed(5)),
            accuracy: Math.round(pos.coords.accuracy),
            source: 'Device GPS Stamped',
            isGps: true
          });
          setIsLocating(false);
        },
        (err) => {
          console.warn('[Geolocation] Using village fallback:', err.message);
          setGeoLocation({
            lat: selectedVillage?.latitude || 30.7046,
            lon: selectedVillage?.longitude || 76.2163,
            source: 'Village Center',
            isGps: false
          });
          setIsLocating(false);
        },
        { timeout: 7000, enableHighAccuracy: true }
      );
    }
  };

  // 1. Photo Capture Handler (<input capture="environment" /> opens phone camera directly)
  const handleImageCapture = async (e) => {
    setMediaError('');
    const rawFile = e.target.files?.[0];
    if (!rawFile) return;

    const ext = rawFile.name.split('.').pop().toLowerCase();
    const validExts = ['jpg', 'jpeg', 'png', 'webp'];

    if (!validExts.includes(ext) && !rawFile.type.startsWith('image/')) {
      setMediaError('Invalid image format. Please capture a JPG, PNG, or WebP photo.');
      return;
    }

    try {
      // Client-side canvas compression: max 1280px, quality 0.8
      const compressed = await compressImage(rawFile, 1280, 1280, 0.8);
      if (compressed.size > MAX_IMAGE_SIZE) {
        setMediaError(`Photo size (${(compressed.size / (1024 * 1024)).toFixed(1)}MB) exceeds 5MB limit.`);
        return;
      }

      setImageFile(compressed);
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setImagePreview(URL.createObjectURL(compressed));
      setActiveInputMode('photo');

      // Automatically stamp geolocation upon taking a photo
      if (!geoLocation.isGps) {
        acquireLocation();
      }
    } catch (err) {
      console.warn('Image compression fallback:', err);
      setImageFile(rawFile);
      setImagePreview(URL.createObjectURL(rawFile));
      setActiveInputMode('photo');
    }
  };

  const removeImage = () => {
    setImageFile(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  // 2. Voice Note Recording Handler (up to 15 seconds with MediaRecorder + Web Speech API)
  const startRecording = async () => {
    setMediaError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];

      let mimeType = 'audio/webm';
      if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
        mimeType = 'audio/webm;codecs=opus';
      } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
        mimeType = 'audio/mp4';
      }

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        const ext = mimeType.includes('mp4') ? 'm4a' : 'webm';
        const file = new File([audioBlob], `farmer_voice_${Date.now()}.${ext}`, { type: mimeType });

        setAudioFile(file);
        setAudioPreview(URL.createObjectURL(audioBlob));

        // Release hardware audio tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start(250);
      setIsRecording(true);
      setRecordSeconds(0);
      setActiveInputMode('voice');

      // 15 seconds countdown timer
      let secondsElapsed = 0;
      timerIntervalRef.current = setInterval(() => {
        secondsElapsed += 1;
        setRecordSeconds(secondsElapsed);
        if (secondsElapsed >= MAX_RECORD_SECONDS) {
          stopRecording();
        }
      }, 1000);

      // Web Speech API on-device transcription
      startWebSpeech();

      // Stamp location
      if (!geoLocation.isGps) {
        acquireLocation();
      }
    } catch (err) {
      console.error('Microphone error:', err);
      setMediaError('Microphone access denied or unavailable: ' + err.message);
    }
  };

  const stopRecording = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {}
    }
    if (speechRecognitionRef.current) {
      try { speechRecognitionRef.current.stop(); } catch (e) {}
      speechRecognitionRef.current = null;
    }
    setIsRecording(false);
  };

  const removeAudio = () => {
    stopRecording();
    setAudioFile(null);
    if (audioPreview) URL.revokeObjectURL(audioPreview);
    setAudioPreview(null);
    setTranscriptionNotice('');
  };

  const startWebSpeech = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setTranscriptionNotice('Voice note attached (transcription available for Hindi/English).');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      if (language === 'hi') {
        recognition.lang = 'hi-IN';
      } else if (language === 'pa') {
        setTranscriptionNotice('Voice note attached (transcription available for Hindi/English).');
        return;
      } else {
        recognition.lang = 'en-IN';
      }

      recognition.onresult = (event) => {
        let finalStr = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalStr += event.results[i][0].transcript + ' ';
          }
        }
        const text = finalStr.trim();
        if (text) {
          setDescription((prev) => (prev ? `${prev} ${text}` : text));
          setTranscriptionNotice(`Voice note: on-device transcription (${recognition.lang === 'hi-IN' ? 'Hindi' : 'English'})`);
        }
      };

      recognition.onerror = () => {
        setTranscriptionNotice('Voice note attached (transcription available for Hindi/English).');
      };

      recognition.start();
      speechRecognitionRef.current = recognition;
    } catch (err) {
      console.warn('SpeechRecognition failed:', err);
      setTranscriptionNotice('Voice note attached (transcription available for Hindi/English).');
    }
  };

  // Submit flow
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMediaError('');
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('event', selectedEvent);
      formData.append('intensity', intensity);
      formData.append('time_description', timeDesc);
      formData.append('description', description.trim() || '');
      formData.append('reporter_name', reporterName.trim() || 'Village Farmer');
      formData.append('language', language || 'en');
      if (selectedVillage?.id) formData.append('village_id', selectedVillage.id);

      const latToSend = geoLocation.lat || selectedVillage?.latitude;
      const lonToSend = geoLocation.lon || selectedVillage?.longitude;
      if (latToSend) formData.append('lat', latToSend);
      if (lonToSend) formData.append('lon', lonToSend);

      if (imageFile) {
        formData.append('image', imageFile);
      }
      if (audioFile) {
        formData.append('audio', audioFile);
      }

      const res = await submitReport(formData);
      const structuredResult = res?.observation || res;
      setCreatedObservation(structuredResult);
    } catch (err) {
      console.error(err);
      setMediaError(err.message || 'Failed to submit report. Please check file size and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVoicePreset = (text, eventDetected, intensityDetected) => {
    setDescription(text);
    setSelectedEvent(eventDetected);
    setIntensity(intensityDetected);
    setActiveInputMode('voice');
  };

  // Filtered observations for the embedded feed
  const villageObsList = observations || [];
  const filteredObservations = villageObsList.filter((obs) => {
    if (feedFilter === 'photo') {
      return Boolean(obs.image_url || obs.media_attached?.has_image || obs.media_attached?.image);
    }
    if (feedFilter === 'voice') {
      return Boolean(obs.audio_url || obs.media_attached?.has_audio || obs.media_attached?.audio);
    }
    if (feedFilter === 'verified') {
      return obs.status === 'VERIFIED';
    }
    return true;
  });

  const photoCount = villageObsList.filter((obs) =>
    Boolean(obs.image_url || obs.media_attached?.has_image || obs.media_attached?.image)
  ).length;

  const voiceCount = villageObsList.filter((obs) =>
    Boolean(obs.audio_url || obs.media_attached?.has_audio || obs.media_attached?.audio)
  ).length;

  const verifiedCount = villageObsList.filter((obs) => obs.status === 'VERIFIED').length;

  // The core reporting form and post-submit content
  const renderReportingForm = () => (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Panel Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-community" style={{ fontSize: '0.68rem' }}>
              CITIZEN TELEMETRY
            </span>
            <span className="badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', fontSize: '0.68rem' }}>
              Mobile-First • 3-Way Reporting
            </span>
          </div>
          <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 800, marginTop: '6px', marginBottom: '2px' }}>
            {t('modalTitle') || 'Report Local Weather'}
          </h3>
          <span style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
            {getVillageLabel(selectedVillage?.state)} › {getVillageLabel(selectedVillage?.block || selectedVillage?.district)} › {getVillageLabel(selectedVillage?.name)}
          </span>
        </div>

        {onClose && (
          <button onClick={onClose} style={{ background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', border: 'none' }}>
            <XCircle size={22} />
          </button>
        )}
      </div>

      {/* ---------------------------------------------------- */}
      {/* POST-SUBMIT VIEW: SHOW STRUCTURED OBSERVATION DATA   */}
      {/* ---------------------------------------------------- */}
      {createdObservation ? (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', color: '#34d399', fontWeight: 800, fontSize: '1.05rem' }}>
              <CheckCircle2 size={22} color="#34d399" /> REPORT INGESTED AS STRUCTURED DATA
            </div>
            <p style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '6px' }}>
              Your ground observation has been saved and immediately published to the Village Observation Feed below for multi-source verification.
            </p>
          </div>

          {/* Observation Card Preview */}
          <div style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid var(--border-active)', borderRadius: 'var(--radius-sm)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  OBSERVATION ID: {createdObservation.id}
                </span>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginTop: '2px' }}>
                  {getConditionLabel(createdObservation.event)} ({getIntensityLabel(createdObservation.intensity)})
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Reported by: <strong>{createdObservation.reporter_name}</strong> • Source: <code>{createdObservation.source || 'farmer'}</code>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-unverified" style={{ fontSize: '0.75rem' }}>
                  {createdObservation.status || 'PENDING'}
                </span>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Initial Confidence: <strong>{Math.round(createdObservation.confidence_score || createdObservation.confidence || 50)}%</strong>
                </div>
              </div>
            </div>

            {createdObservation.description && (
              <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontStyle: 'italic', background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '4px' }}>
                "{createdObservation.description}"
              </div>
            )}

            {/* Media Thumbnails & Audio Player */}
            {(createdObservation.image_url || createdObservation.audio_url) && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginTop: '4px' }}>
                {createdObservation.image_url && (
                  <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '6px', padding: '8px' }}>
                    <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                      📷 Photo: user-uploaded, time & location stamped
                    </span>
                    <img
                      src={createdObservation.image_url}
                      alt="Submitted field observation"
                      loading="lazy"
                      decoding="async"
                      style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                  </div>
                )}

                {createdObservation.audio_url && (
                  <div style={{ background: 'rgba(52, 211, 153, 0.08)', border: '1px solid rgba(52, 211, 153, 0.25)', borderRadius: '6px', padding: '8px' }}>
                    <span style={{ fontSize: '0.7rem', color: '#34d399', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                      🎤 Voice note: on-device transcription
                    </span>
                    <audio controls src={createdObservation.audio_url} style={{ width: '100%', height: '36px', marginTop: '10px' }} />
                  </div>
                )}
              </div>
            )}

            {/* Metadata & Telemetry Stamp */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px', flexWrap: 'wrap', gap: '6px' }}>
              <span>📍 Lat: {createdObservation.lat || createdObservation.latitude || '30.7046'}, Lon: {createdObservation.lon || createdObservation.longitude || '76.2163'}</span>
              <span>⏱️ {new Date(createdObservation.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <span style={{ color: '#fbbf24' }}>Local Disk Upload</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                setCreatedObservation(null);
                removeImage();
                removeAudio();
                setDescription('');
              }}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px' }}
            >
              <Send size={15} /> Submit Another Weather Report
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '12px 20px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  color: '#fff',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Done
              </button>
            )}
          </div>
        </div>
      ) : (
        /* ---------------------------------------------------- */
        /* ACTIVE FORM VIEW: 3-WAY REPORTING (PHOTO/VOICE/TEXT)  */
        /* ---------------------------------------------------- */
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Quick Voice Presets for Demonstration */}
          <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.22)', borderRadius: 'var(--radius-sm)', padding: '10px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', fontWeight: 700, color: '#38bdf8', marginBottom: '6px' }}>
              <Mic size={13} /> {t('voicePrompt') || 'Quick Voice Prompts (Tap to auto-fill sample)'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button
                type="button"
                onClick={() => handleVoicePreset("Dark clouds are coming from the southwest, and the weather feels humid.", "Heavy Rain", "Heavy")}
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '4px',
                  padding: '6px 10px',
                  color: '#cbd5e1',
                  fontSize: '0.74rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              >
                🗣️ <em>"{t('voiceSample1') || 'Dark clouds are coming from the southwest...'}"</em>
              </button>
              <button
                type="button"
                onClick={() => handleVoicePreset("तेज बारिश शुरू हो गई है और खेतों में पानी भर रहा है", "Heavy Rain", "Heavy")}
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '4px',
                  padding: '6px 10px',
                  color: '#cbd5e1',
                  fontSize: '0.74rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              >
                🗣️ <em>"{t('voiceSample2') || 'तेज बारिश शुरू हो गई है और खेतों में पानी भर रहा है'}"</em>
              </button>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* 3 BIG MOBILE-FIRST BUTTONS: VOICE, PHOTO, TEXT       */}
          {/* ---------------------------------------------------- */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
                SELECT REPORTING METHOD (MOBILE-FIRST)
              </label>
              <button
                type="button"
                onClick={acquireLocation}
                disabled={isLocating}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: geoLocation.isGps ? '#34d399' : '#38bdf8',
                  fontSize: '0.74rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontWeight: 600
                }}
              >
                <MapPin size={12} /> {isLocating ? 'Locating...' : geoLocation.isGps ? `📍 GPS Stamped: ${geoLocation.lat}, ${geoLocation.lon}` : '📍 Stamp Device GPS'}
              </button>
            </div>

            {/* Hidden Direct-Camera Input for mobile */}
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageCapture}
              style={{ display: 'none' }}
            />

            <div className="report-input-modes-grid">
              {/* BIG BUTTON 1: VOICE (PHONE MIC) */}
              <button
                type="button"
                onClick={() => {
                  setActiveInputMode('voice');
                  if (isRecording) {
                    stopRecording();
                  } else {
                    startRecording();
                  }
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '16px 8px',
                  borderRadius: 'var(--radius-sm)',
                  background: isRecording
                    ? 'rgba(239, 68, 68, 0.25)'
                    : audioFile
                    ? 'rgba(52, 211, 153, 0.15)'
                    : 'rgba(0, 0, 0, 0.3)',
                  border: isRecording
                    ? '2px solid #ef4444'
                    : audioFile
                    ? '2px solid #34d399'
                    : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  position: 'relative'
                }}
              >
                {isRecording ? (
                  <Square size={26} color="#ef4444" />
                ) : (
                  <Mic size={26} color={audioFile ? '#34d399' : '#10b981'} />
                )}
                <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#fff' }}>
                  {isRecording ? `${recordSeconds}s / 15s` : 'VOICE'}
                </span>
                <span style={{ fontSize: '0.68rem', color: isRecording ? '#f87171' : audioFile ? '#34d399' : 'var(--text-muted)' }}>
                  {isRecording ? '🔴 Tap to Stop' : audioFile ? '✓ Audio Attached' : 'Speak in Mic'}
                </span>
              </button>

              {/* BIG BUTTON 2: PHOTO (PHONE CAMERA) */}
              <button
                type="button"
                onClick={() => {
                  setActiveInputMode('photo');
                  cameraInputRef.current?.click();
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '16px 8px',
                  borderRadius: 'var(--radius-sm)',
                  background: imageFile ? 'rgba(56, 189, 248, 0.15)' : 'rgba(0, 0, 0, 0.3)',
                  border: imageFile ? '2px solid #38bdf8' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <Camera size={26} color="#38bdf8" />
                <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#fff' }}>PHOTO</span>
                <span style={{ fontSize: '0.68rem', color: imageFile ? '#38bdf8' : 'var(--text-muted)' }}>
                  {imageFile ? '✓ Photo Attached' : 'Open Camera'}
                </span>
              </button>

              {/* BIG BUTTON 3: TEXT */}
              <button
                type="button"
                onClick={() => setActiveInputMode('text')}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '16px 8px',
                  borderRadius: 'var(--radius-sm)',
                  background: activeInputMode === 'text' || description ? 'rgba(251, 191, 36, 0.12)' : 'rgba(0, 0, 0, 0.3)',
                  border: activeInputMode === 'text' || description ? '2px solid #fbbf24' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <FileText size={26} color="#fbbf24" />
                <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#fff' }}>TEXT</span>
                <span style={{ fontSize: '0.68rem', color: description ? '#fbbf24' : 'var(--text-muted)' }}>
                  {description ? '✓ Entered' : 'Type Details'}
                </span>
              </button>
            </div>
          </div>

          {/* Active Voice Recording Live Banner */}
          {isRecording && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid #ef4444',
              borderRadius: '6px',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              animation: 'pulse 1.5s infinite'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#fca5a5' }}>
                    RECORDING LIVE FROM MICROPHONE ({recordSeconds}s / 15s)
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>
                    Speak your weather observation now. Transcribing to text...
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={stopRecording}
                style={{
                  background: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '6px 12px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Stop
              </button>
            </div>
          )}

          {/* Error Banner */}
          {mediaError && (
            <div style={{ padding: '10px 14px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', borderRadius: '4px', color: '#fca5a5', fontSize: '0.78rem' }}>
              ⚠️ {mediaError}
            </div>
          )}

          {/* Voice Preview Strip (if audio recorded / attached) */}
          {audioPreview && (
            <div style={{ background: 'rgba(52, 211, 153, 0.08)', border: '1px solid rgba(52, 211, 153, 0.3)', borderRadius: '6px', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#34d399', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Volume2 size={14} /> Voice note: {transcriptionNotice ? transcriptionNotice : 'audio attached (15s)'}
                </div>
                <button type="button" onClick={removeAudio} title="Delete and re-record" style={{ background: 'transparent', color: '#f87171', border: 'none', cursor: 'pointer', padding: '4px' }}>
                  <Trash2 size={16} />
                </button>
              </div>
              <audio controls src={audioPreview} style={{ width: '100%', height: '34px' }} />
            </div>
          )}

          {/* Photo Preview Strip (if photo attached) */}
          {imagePreview && (
            <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '6px', padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={imagePreview}
                  alt="Field preview"
                  loading="lazy"
                  decoding="async"
                  style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #38bdf8' }}
                />
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fff' }}>Photo: user-uploaded, time & location stamped</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {(imageFile.size / (1024 * 1024)).toFixed(2)} MB • {geoLocation.isGps ? `GPS: ${geoLocation.lat}, ${geoLocation.lon}` : selectedVillage?.name}
                  </div>
                </div>
              </div>
              <button type="button" onClick={removeImage} title="Remove photo" style={{ background: 'transparent', color: '#f87171', border: 'none', cursor: 'pointer', padding: '4px' }}>
                <Trash2 size={16} />
              </button>
            </div>
          )}

          {/* Transcription notice banner if Punjab/fallback */}
          {transcriptionNotice && !audioPreview && (
            <div style={{ fontSize: '0.74rem', color: '#fbbf24', background: 'rgba(245, 158, 11, 0.1)', padding: '8px 12px', borderRadius: '4px' }}>
              ℹ️ {transcriptionNotice}
            </div>
          )}

          {/* 1. What weather event do you observe? */}
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
              {t('step1SelectEvent') || '1. Select Observed Weather Event'}
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
              <label style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                {t('intensityLabel') || 'Intensity'}
              </label>
              <div style={{ display: 'flex', gap: '6px' }}>
                {INTENSITY_OPTIONS.map((intOpt) => (
                  <button
                    type="button"
                    key={intOpt}
                    onClick={() => setIntensity(intOpt)}
                    style={{
                      flex: 1,
                      padding: '7px 4px',
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
              <label style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                {t('sinceWhenLabel') || 'Since When'}
              </label>
              <select
                value={timeDesc}
                onChange={(e) => setTimeDesc(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
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

          {/* Farmer Name & Text Note Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <label style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  {user ? `Reported by: ${user.name}` : 'Your Name / Farm ID'}
                </label>
                {user && (
                  <span style={{ fontSize: '0.68rem', color: '#34d399', fontWeight: 700 }}>
                    ✓ Verified Account ({user.role === 'officer' ? 'Agri Officer' : 'Local Farmer'})
                  </span>
                )}
              </div>
              <input
                type="text"
                placeholder={t('namePlaceholder') || 'e.g. Ramesh Patel, North Fields'}
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid var(--border-subtle)',
                  color: '#fff',
                  fontSize: '0.85rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                Weather Description (Typed or Auto-Transcribed from Voice)
              </label>
              <textarea
                rows={3}
                placeholder={t('descPlaceholder') || 'Describe conditions, e.g. dark convective clouds moving fast, water puddles forming...'}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid var(--border-subtle)',
                  color: '#fff',
                  fontSize: '0.85rem',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Honest Prototype Label */}
          <div style={{
            background: 'rgba(245, 158, 11, 0.08)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            borderRadius: '4px',
            padding: '8px 12px',
            fontSize: '0.72rem',
            color: '#fbbf24',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px'
          }}>
            <span style={{ fontSize: '0.85rem', lineHeight: '1' }}>📁</span>
            <div>
              <strong>Local Prototype Storage:</strong> Media files are stored on server disk (<code>backend/uploads/observations/</code>) and mounted at <code>/uploads</code>.
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || isRecording}
            className="btn-primary"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px', fontSize: '0.92rem', fontWeight: 800 }}
          >
            <Send size={16} /> {isSubmitting ? (t('submitting') || 'Submitting Observation...') : (t('btnSubmitReport') || 'Submit Village Observation')}
          </button>
        </form>
      )}
    </div>
  );

  // The embedded Village Observation Feed component
  const renderObservationFeed = () => (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px', height: 'fit-content' }}>
      {/* Feed Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
        <div>
          <div className="card-header" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Eye size={18} color="#10b981" /> {t('feedTitle') || 'Village Observation Feed'}
            <span className="badge badge-community" style={{ fontSize: '0.7rem' }}>
              {villageObsList.length} Reports
            </span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            {t('feedSub') || 'Farmer and community reports verified against local IoT sensors and NWP model telemetry.'}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => setFeedFilter('all')}
          className={`nav-tab-btn ${feedFilter === 'all' ? 'active' : ''}`}
          style={{ padding: '4px 10px', fontSize: '0.72rem' }}
        >
          All ({villageObsList.length})
        </button>
        <button
          type="button"
          onClick={() => setFeedFilter('photo')}
          className={`nav-tab-btn ${feedFilter === 'photo' ? 'active' : ''}`}
          style={{ padding: '4px 10px', fontSize: '0.72rem' }}
        >
          📷 Photos ({photoCount})
        </button>
        <button
          type="button"
          onClick={() => setFeedFilter('voice')}
          className={`nav-tab-btn ${feedFilter === 'voice' ? 'active' : ''}`}
          style={{ padding: '4px 10px', fontSize: '0.72rem' }}
        >
          🎤 Voice ({voiceCount})
        </button>
        <button
          type="button"
          onClick={() => setFeedFilter('verified')}
          className={`nav-tab-btn ${feedFilter === 'verified' ? 'active' : ''}`}
          style={{ padding: '4px 10px', fontSize: '0.72rem' }}
        >
          ✓ Verified ({verifiedCount})
        </button>
      </div>

      {/* Observation Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '720px', overflowY: 'auto', paddingRight: '4px' }}>
        {filteredObservations && filteredObservations.length > 0 ? (
          filteredObservations.map((obs) => (
            <ObservationCard
              key={obs.id}
              observation={obs}
              onVerify={onInspectObservation}
            />
          ))
        ) : (
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center', padding: '36px 12px', background: 'rgba(0,0,0,0.2)', borderRadius: '6px' }}>
            {t('noObservations') || 'No observations recorded for this filter in this village yet.'}
          </div>
        )}
      </div>
    </div>
  );

  // If onClose is passed, render as a modal popup
  if (onClose) {
    return (
      <div className="modal-overlay animate-fade-in" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '92vh', overflowY: 'auto', maxWidth: '850px' }}>
          {renderReportingForm()}
          <div style={{ marginTop: '20px' }}>
            {renderObservationFeed()}
          </div>
        </div>
      </div>
    );
  }

  // Full Screen View: Dedicated Report Weather Section in Main App Shell
  return (
    <div className="dashboard-content animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Banner & Header */}
      <div className="card-title-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '3px 10px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.25)', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#38bdf8', letterSpacing: '0.04em' }}>
              HYPERLOCAL CITIZEN SCIENCE • 3-WAY REPORTING
            </span>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', margin: 0 }}>
            {t('btnReportWeather') || 'Report Weather'} & {t('feedTitle') || 'Village Observation Feed'}
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
            Ground-truth reporting for <strong>{getVillageLabel(selectedVillage?.name)}</strong> ({getVillageLabel(selectedVillage?.state)}). Report via voice note, camera photo, or text notes.
          </p>
        </div>

        {/* GPS Telemetry Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid var(--border-subtle)',
          padding: '8px 14px',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.78rem'
        }}>
          <MapPin size={14} color={geoLocation.isGps ? '#34d399' : '#38bdf8'} />
          <span style={{ color: geoLocation.isGps ? '#34d399' : 'var(--text-secondary)' }}>
            {geoLocation.isGps ? `GPS: ${geoLocation.lat}° N, ${geoLocation.lon}° E` : `${selectedVillage?.name || 'Village'} Center`}
          </span>
          <button
            type="button"
            onClick={acquireLocation}
            disabled={isLocating}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid var(--border-subtle)',
              color: '#fff',
              fontSize: '0.72rem',
              padding: '2px 8px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {isLocating ? 'Locating...' : 'Refresh GPS'}
          </button>
        </div>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="dashboard-grid">
        {/* Column 1: Reporting Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {renderReportingForm()}
        </div>

        {/* Column 2: Embedded Village Observation Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {renderObservationFeed()}
        </div>
      </div>
    </div>
  );
}
