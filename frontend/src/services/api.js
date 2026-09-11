// Base API wrapper with in-memory memoization cache, AbortController support, and JWT auth
const BASE_URL = '/api';
const TOKEN_KEY = 'gw_auth_token';
const USER_KEY = 'gw_auth_user';

// In-memory cache for GET requests: key -> { data, timestamp }
const inMemoryCache = new Map();
const CACHE_TTL_MS = 30000; // 30 seconds

export function clearApiCache(endpointPrefix = null) {
  if (!endpointPrefix) {
    inMemoryCache.clear();
  } else {
    for (const key of inMemoryCache.keys()) {
      if (key.startsWith(endpointPrefix)) {
        inMemoryCache.delete(key);
      }
    }
  }
}

export async function request(endpoint, options = {}) {
  const method = (options.method || 'GET').toUpperCase();
  const url = `${BASE_URL}${endpoint}`;
  
  // Memoization for GET requests if within TTL and not explicitly bypassed
  const isGet = method === 'GET';
  const shouldCache = isGet && !options.bypassCache;
  const now = Date.now();

  if (shouldCache && inMemoryCache.has(endpoint)) {
    const entry = inMemoryCache.get(endpoint);
    if (now - entry.timestamp < CACHE_TTL_MS) {
      return entry.data;
    } else {
      inMemoryCache.delete(endpoint);
    }
  }

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

    const data = await res.json();
    if (shouldCache) {
      inMemoryCache.set(endpoint, { data, timestamp: Date.now() });
    }
    return data;
  } catch (err) {
    if (err.name === 'AbortError') {
      // Handled cleanly when component unmounts
      throw err;
    }
    console.warn(`[API] Network error on ${endpoint}:`, err.message);
    throw err;
  }
}
