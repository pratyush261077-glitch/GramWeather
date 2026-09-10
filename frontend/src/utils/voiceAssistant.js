/**
 * Voice Assistant Utility for GramWeather AI
 * Uses the Web Speech API (speechSynthesis) to speak advisories and weather readouts
 * in Hindi, Punjabi, and English for rural accessibility.
 */

export function speakText(text, lang = 'en') {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser environment.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  // Map language codes
  if (lang === 'hi') {
    utterance.lang = 'hi-IN';
  } else if (lang === 'pa') {
    utterance.lang = 'pa-IN';
  } else {
    utterance.lang = 'en-IN';
  }

  utterance.rate = 0.95; // Slightly slower for clear rural comprehension
  utterance.pitch = 1.0;

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
