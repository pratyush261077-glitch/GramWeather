import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const TOKEN_KEY = 'gw_auth_token';
const USER_KEY = 'gw_auth_user';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem(TOKEN_KEY) || null;
    } catch {
      return null;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Clear auth session
  const logout = useCallback(() => {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch (e) {
      console.warn('Could not clear auth localStorage:', e);
    }
    setToken(null);
    setUser(null);
    setAuthError(null);
  }, []);

  // Check token validity with /auth/me on initial app load
  useEffect(() => {
    let isMounted = true;

    async function verifyToken() {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      if (!storedToken) {
        if (isMounted) setIsLoading(false);
        return;
      }

      try {
        const res = await fetch('/auth/me', {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          const verifiedUser = data.user || data;
          if (isMounted) {
            setUser(verifiedUser);
            localStorage.setItem(USER_KEY, JSON.stringify(verifiedUser));
          }
        } else if (res.status === 401) {
          // Token expired or invalid
          if (isMounted) {
            logout();
          }
        }
      } catch (err) {
        console.warn('[Auth] Verification network check error:', err.message);
        // Keep offline cached user if already present in localStorage
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    verifyToken();

    // Listen for 401 unauthorized events emitted from API service layer
    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => {
      isMounted = false;
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, [logout]);

  // Login handler
  const login = async (identifier, password) => {
    setAuthError(null);
    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier: identifier.trim(), password }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const errorMsg = data.detail || `Login failed with status ${res.status}`;
        setAuthError(errorMsg);
        throw new Error(errorMsg);
      }

      const receivedToken = data.token;
      const receivedUser = data.user;

      localStorage.setItem(TOKEN_KEY, receivedToken);
      localStorage.setItem(USER_KEY, JSON.stringify(receivedUser));

      setToken(receivedToken);
      setUser(receivedUser);
      return receivedUser;
    } catch (err) {
      setAuthError(err.message);
      throw err;
    }
  };

  // Signup handler
  const signup = async (signupData) => {
    setAuthError(null);
    try {
      const res = await fetch('/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const errorMsg = data.detail || `Signup failed with status ${res.status}`;
        setAuthError(errorMsg);
        throw new Error(errorMsg);
      }

      const receivedToken = data.token;
      const receivedUser = data.user;

      localStorage.setItem(TOKEN_KEY, receivedToken);
      localStorage.setItem(USER_KEY, JSON.stringify(receivedUser));

      setToken(receivedToken);
      setUser(receivedUser);
      return receivedUser;
    } catch (err) {
      setAuthError(err.message);
      throw err;
    }
  };

  // Demo 1-tap login for evaluation / judges
  const loginAsDemo = async (role = 'farmer') => {
    const identifier = role === 'officer' ? 'officer@gramweather.in' : 'farmer@gramweather.in';
    return await login(identifier, 'demo1234');
  };

  const value = {
    token,
    user,
    isAuthenticated: Boolean(token && user),
    isLoading,
    authError,
    setAuthError,
    login,
    signup,
    logout,
    loginAsDemo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
