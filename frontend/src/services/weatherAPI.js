import { request } from './api';

export async function fetchVillages() {
  return request('/villages');
}

export async function fetchVillageWeather(villageId, scenario = 'normal') {
  return request(`/weather/${villageId}?scenario=${scenario}`);
}

export async function fetchVillageForecast(villageId) {
  return request(`/forecast/${villageId}`);
}

export async function fetchDirectionWeather(villageId) {
  return request(`/direction-weather/${villageId}`);
}

export async function fetchVillageHistory(villageId) {
  return request(`/history/${villageId}`);
}
