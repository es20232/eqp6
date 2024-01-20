import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [accessToken, setAccessToken] = useState(Cookies.get('accessToken') || null);
  const [refreshToken, setRefreshToken] = useState(Cookies.get('refreshToken') || null);
  const [loggedIn, setLoggedIn] = useState(accessToken && refreshToken);

  useEffect(() => {
    console.log("Verificando cookies no use effect2")
    if (accessToken && refreshToken) {
      setLoggedIn(true);
    }
  }, [accessToken, refreshToken]);

  const logIn = () => {
    setAccessToken(Cookies.get('accessToken'))
    setRefreshToken(Cookies.get('refreshToken'))
  };

  const logOut  = () => {// Limpar os cookies e redefinir o estado
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    setAccessToken(null);
    setRefreshToken(null);
    setLoggedIn(false);
  }
  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};