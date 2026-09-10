import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { Globe } from './icons';

export default function LanguageSelector() {
  const { language, setLanguage } = useWeather();

  return (
    <div className="village-select-wrapper" style={{ padding: '4px 10px' }}>
      <Globe size={15} color="#10b981" />
      <select
        className="village-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{ fontSize: '0.82rem' }}
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी (Hindi)</option>
        <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
      </select>
    </div>
  );
}
