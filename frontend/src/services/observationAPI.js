import { request } from './api';

export async function submitFarmerObservation(payload) {
  return request('/observations', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function fetchVillageObservations(villageId) {
  return request(`/observations/${villageId}`);
}
