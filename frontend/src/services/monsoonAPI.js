import { request } from './api';

export async function fetchMonsoonOutlook(villageId, options = {}) {
  return request(`/monsoon/${villageId}`, options);
}

export async function fetchMonsoonBacktest(villageId, options = {}) {
  return request(`/monsoon/${villageId}/backtest`, options);
}
