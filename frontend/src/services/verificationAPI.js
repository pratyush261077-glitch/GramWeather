import { request } from './api';

export async function runVerification(observation, scenario = 'normal') {
  return request(`/verify?scenario=${scenario}`, {
    method: 'POST',
    body: JSON.stringify(observation),
  });
}

export async function fetchVillageConfidence(villageId) {
  return request(`/confidence/${villageId}`);
}
