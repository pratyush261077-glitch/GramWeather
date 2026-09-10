import { request } from './api';

export async function fetchMonsoonOutlook(villageId) {
  return request(`/monsoon/${villageId}`);
}

export async function fetchMonsoonBacktest(villageId) {
  return request(`/monsoon/${villageId}/backtest`);
}
