import { request } from './api';

export async function runVerification(observation, scenario = 'normal', options = {}) {
  return request(`/verify?scenario=${scenario}`, {
    method: 'POST',
    body: JSON.stringify(observation),
    ...options,
  });
}

export async function fetchVillageConfidence(villageId, options = {}) {
  return request(`/confidence/${villageId}`, options);
}
