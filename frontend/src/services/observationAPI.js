import { request } from './api';

export async function submitFarmerObservation(payload) {
  if (typeof FormData !== 'undefined' && payload instanceof FormData) {
    const res = await fetch('/observations', {
      method: 'POST',
      body: payload,
    });
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
