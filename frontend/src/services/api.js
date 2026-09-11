// Base API wrapper with fallback for offline/demo resilience and JWT auth
const BASE_URL = '/api';
const TOKEN_KEY = 'gw_auth_token';
const USER_KEY = 'gw_auth_user';

export async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  
  // Attach token from localStorage if present
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
        ...options.headers,
      },
    });

    if (res.status === 401) {
      // Clear token and alert AuthContext to route back to Auth screen
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('auth:unauthorized'));
      }
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody.detail || 'Session expired. Please log in again.');
    }

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
