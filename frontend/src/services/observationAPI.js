import { request } from './api';

export async function submitFarmerObservation(payload) {
  if (typeof FormData !== 'undefined' && payload instanceof FormData) {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('gw_auth_token') : null;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const res = await fetch('/observations', {
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
    return await res.json();
  }

  return request('/observations', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function fetchVillageObservations(villageId) {
  return request(`/observations/${villageId}`);
}
