import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api } from '../api';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const read = () => {
  try {
    return localStorage.getItem('token');
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(read());
  const [checking, setChecking] = useState(!!read());

  const logout = useCallback(() => {
    try {
      localStorage.removeItem('token');
    } catch {
      /* ignore */
    }
    setToken(null);
  }, []);

  useEffect(() => {
    if (!token) {
      setChecking(false);
      return;
    }
    api
      .me()
      .catch((e) => {
        if (e.status === 401) logout();
      })
      .finally(() => setChecking(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email, password) => {
    const { token: t } = await api.login(email, password);
    try {
      localStorage.setItem('token', t);
    } catch {
      /* ignore */
    }
    setToken(t);
  };

  return <AuthContext.Provider value={{ token, checking, login, logout }}>{children}</AuthContext.Provider>;
}
