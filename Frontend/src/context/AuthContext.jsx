import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AuthAPI, setAccessToken } from '@/lib/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await AuthAPI.me();
        setUser(res.user);
      } catch {}
      setLoading(false);
    })();
  }, []);

  const value = useMemo(() => ({
    user,
    setUser,
    loading,
    async login(email, password) {
      const data = await AuthAPI.login(email, password);
      setUser(data.user);
      return data;
    },
    async register(payload) {
      const data = await AuthAPI.register(payload);
      setUser(data.user);
      return data;
    },
    async logout() {
      await AuthAPI.logout();
      setUser(null);
      setAccessToken(null);
    },
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
