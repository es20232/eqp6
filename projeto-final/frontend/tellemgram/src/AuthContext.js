import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [loggedIn, setLoggedIn] = useState(true);
  const [accessToken, setAccessToken] = useState(Cookies.get('accessToken') || null);
  const [refreshToken, setRefreshToken] = useState(Cookies.get('refreshToken') || null);
  
  // const [loggedIn, setLoggedIn] = useState(true);
  // const [accessToken, setAccessToken] = useState(null);
  // const [refreshToken, setRefreshToken] = useState(null);
  console.log("Verificando cookies")

  // useEffect(() => {
  //   console.log("Verificando cookie2")
  //   const fetchCookies = async () => {
  //     try {
  //       console.log("Verificando cookies3")
  //       const accessTokenCookie = await getCookies('accessToken');
  //       const refreshTokenCookie = await getCookies('refreshToken');

  //       if (accessTokenCookie && refreshTokenCookie) {
  //         setAccessToken(accessTokenCookie);
  //         setRefreshToken(refreshTokenCookie);
  //         setLoggedIn(true);
  //         console.log("Logado!!!")
  //       }else{
  //         setLoggedIn(false);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching cookies:', error);
  //     }
  //   };

  //   fetchCookies();
  // }, []);

  useEffect(() => {
    // Verificar se os tokens existem nos cookies
    if (accessToken && refreshToken) {
      setLoggedIn(true);
    }
  }, [accessToken, refreshToken]);


  const logIn = () => {
    setLoggedIn(true)
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

  const getCookies = (cookieName) => {
    return new Promise((resolve, reject) => {
      const cookieValue = Cookies.get(cookieName);
      if (cookieValue) {
        resolve(cookieValue);
      } else {
        reject(new Error(`Cookie ${cookieName} not found`));
      }
    });
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};