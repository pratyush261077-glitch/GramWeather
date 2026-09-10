// Base API wrapper with fallback for offline/demo resilience
const BASE_URL = '/api';

export async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody.detail || `Request failed with status ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.warn(`[API] Network error on ${endpoint}:`, err.message);
    throw err;
  }
}
