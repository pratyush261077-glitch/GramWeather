import { request } from './api';

export async function fetchFarmingAdvisory(villageId, crop = 'Wheat', lang = 'en') {
  return request(`/advisory/${villageId}?crop=${encodeURIComponent(crop)}&lang=${lang}`);
}

export async function fetchFarmerAlerts(villageId, lang = 'en') {
  return request(`/alerts/${villageId}?lang=${lang}`);
}

export async function injectDemoAlert(villageId, alertType = 'HEAVY RAIN') {
  return request(`/alerts/${villageId}/inject?alert_type=${encodeURIComponent(alertType)}`, { method: 'POST' });
}

export async function clearDemoAlerts(villageId) {
  return request(`/alerts/${villageId}/clear`, { method: 'POST' });
}

