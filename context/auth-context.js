import React from 'react';
import { setAuthUser } from '../react-query/auth';
import { getMyProfile } from '../fetch-api/user';
import FullPageSpinner from '../components/FullPageSpinner';
import { queryCache } from 'react-query';

const AuthContext = React.createContext();
AuthContext.displayName = 'AuthContext';

function AuthProvider(props) {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    getMyProfile()
      .then((user) => {
        setAuthUser(user);
        setUser(user);
      })
      .catch(() => {
        setAuthUser(null);
        setUser(null);
        localStorage.removeItem('token');
      })
      .finally(() => setLoading(false));
  }, []);

  const login = React.useCallback((user, token) => {
    setLoading(true);
    if (token) {
      localStorage.setItem('token', token);
    }
    queryCache.clear();
    setAuthUser(user);
    setUser(user);

    setLoading(false);
  }, []);

  const logout = React.useCallback(() => {
    setLoading(true);
    localStorage.removeItem('token');
    setUser(null);
    queryCache.clear();
    setLoading(false);
  }, []);

  const value = React.useMemo(
    () => ({ user, login, logout, authenticated: !!user }),
    [login, logout, user]
  );

  if (loading) {
    return <FullPageSpinner />;
  }

  return <AuthContext.Provider value={value} {...props} />;
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
