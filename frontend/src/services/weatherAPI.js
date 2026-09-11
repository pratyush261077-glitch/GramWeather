import { request } from './api';

export async function fetchVillages(options = {}) {
  return request('/villages', options);
}

export async function fetchVillageWeather(villageId, scenario = 'normal', options = {}) {
  return request(`/weather/${villageId}?scenario=${scenario}`, options);
}

export async function fetchVillageForecast(villageId, options = {}) {
  return request(`/forecast/${villageId}`, options);
}

export async function fetchDirectionWeather(villageId, options = {}) {
  return request(`/direction-weather/${villageId}`, options);
}

export async function fetchVillageHistory(villageId, options = {}) {
  return request(`/history/${villageId}`, options);
}
