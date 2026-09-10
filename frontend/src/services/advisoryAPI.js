import { request } from './api';

export async function fetchFarmingAdvisory(villageId, crop = 'Wheat', lang = 'en') {
  return request(`/advisory/${villageId}?crop=${encodeURIComponent(crop)}&lang=${lang}`);
}

export async function fetchFarmerAlerts(villageId, lang = 'en') {
  return request(`/alerts/${villageId}?lang=${lang}`);
}
