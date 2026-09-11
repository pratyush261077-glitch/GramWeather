import { request, clearApiCache } from './api';

export async function submitFarmerObservation(payload) {
  let result;
  if (typeof FormData !== 'undefined' && payload instanceof FormData) {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('gw_auth_token') : null;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const res = await fetch('/api/observations', {
      method: 'POST',
      headers,
      body: payload,
    });

    if (res.status === 401) {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('gw_auth_token');
        localStorage.removeItem('gw_auth_user');
      }
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('auth:unauthorized'));
      }
      const errBody = await res.json().catch(() => ({}));
      throw new Error(errBody.detail || 'Session expired. Please log in again.');
    }

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(errBody.detail || `Observation submission failed with status ${res.status}`);
    }
    result = await res.json();
  } else {
    result = await request('/observations', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // Clear in-memory cached observations so the feed refreshes immediately
  clearApiCache('/observations');
  return result;
}

export async function fetchVillageObservations(villageId, options = {}) {
  return request(`/observations/${villageId}`, options);
}
