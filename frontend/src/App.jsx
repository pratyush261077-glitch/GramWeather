import React, { useState } from 'react';
import { WeatherProvider, useWeather } from './context/WeatherContext';
import Navbar from './components/Navbar';
import Monsoon from './screens/Monsoon';
import Dashboard from './screens/Dashboard';
import Verification from './screens/Verification';
import Advisory from './screens/Advisory';
import Alerts from './screens/Alerts';
import WeatherMap from './screens/WeatherMap';
import History from './screens/History';
import ReportWeather from './screens/ReportWeather';
import LocationChamberModal from './components/LocationChamberModal';
import './styles/global.css';
import './styles/dashboard.css';

function MainAppShell() {
  const [activeScreen, setActiveScreen] = useState('monsoon');
  const [inspectObservation, setInspectObservation] = useState(null);
  const { isReportModalOpen, setIsReportModalOpen } = useWeather();

  const handleInspectObservation = (obs) => {
    setInspectObservation(obs);
    setActiveScreen('verification');
  };

  return (
    <div className="app-container">
      {/* Top Navbar with Village Selector and Nav tabs */}
      <Navbar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />

      {/* Screen Views */}
      <main style={{ flex: 1 }}>
        {activeScreen === 'monsoon' && <Monsoon />}
        {activeScreen === 'dashboard' && (
          <Dashboard onInspectObservation={handleInspectObservation} />
        )}
        {activeScreen === 'verification' && (
          <Verification inspectTarget={inspectObservation} />
        )}
        {activeScreen === 'advisory' && <Advisory />}
        {activeScreen === 'alerts' && <Alerts />}
        {activeScreen === 'map' && <WeatherMap />}
        {activeScreen === 'history' && <History />}
      </main>

      {/* Floating Modal for Farmer Weather Reporting */}
      {isReportModalOpen && (
        <ReportWeather onClose={() => setIsReportModalOpen(false)} />
      )}

      {/* 3-Chamber Location Selection Modal */}
      <LocationChamberModal />

      {/* Footer */}
      <footer
        style={{
          padding: '16px 28px',
          background: 'rgba(8, 18, 16, 0.9)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
        }}
      >
        <div>
          <strong style={{ color: '#34d399' }}>GramWeather AI</strong> • Core Paradigm:{' '}
          <span style={{ color: '#fff' }}>Observe → Verify → Fuse → Predict → Explain → Learn</span>
        </div>
        <div>
          Data Source: Live Open-Meteo API • Local Hardware: Simulated ESP32 Mesh Fleet
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <WeatherProvider>
      <MainAppShell />
    </WeatherProvider>
  );
}
