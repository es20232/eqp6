import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { refreshAcessToken } from "./api";
import { api2, endpoints } from "./api2";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

  const [accessToken, setAccessToken] = useState(Cookies.get('accessToken') || null);
  const [refreshToken, setRefreshToken] = useState(Cookies.get('refreshToken') || null);
  const [loggedIn, setLoggedIn] = useState(accessToken && refreshToken);
  const [isVerified, setIsVerified] = useState('false')

  useEffect(() => {
    setAccessToken(Cookies.get('accessToken'))
    setRefreshToken(Cookies.get('refreshToken'))
    setIsVerified(true)
  }, []);

  useEffect(() => {
    if (accessToken && refreshToken) {
      setLoggedIn(true);
    }
  }, [accessToken, refreshToken]);

  const logIn = (access, refresh) => {
    Cookies.set('accessToken', access, { expires: 1 });
    Cookies.set('refreshToken', refresh, { expires: 1 });
    setAccessToken(access)
    setRefreshToken(refresh)
    setLoggedIn(true);
  };

  const login2 = async ( {username, password} ) => {
    try{
      const response = await api2.post(endpoints.loginEndpoint, {"username": username, "password": password});
      if(response.data.error) {
        return response.status;
      }else{
        api2.defaults.headers.common["Authorization"] = `Bearer ${response.data.access}`;
        Cookies.set('accessToken', response.data.access, { expires: 1 });
        Cookies.set('refreshToken', response.data.refresh, { expires: 1 });
        setAccessToken(response.data.access)
        setRefreshToken(response.data.refresh)
        setLoggedIn(true);
        return response.status;
      }
    } catch(err){
      console.log(err);
      if('response' in err){
        return err.response.status
      } else{
        return 503;
      }
    }
  }

  const logOut  = () => {// Limpar os cookies e redefinir o estado
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    setAccessToken(null);
    setRefreshToken(null);
    setLoggedIn(false);
  }

  const requestNewAcessToken = async (refreshToken) => {
    console.log("Função de revalidar o token " + refreshToken)
    try {
      const result = await refreshAcessToken(refreshToken); // Substitua pela sua URL
      console.log(result);
      Cookies.set('accessToken', result.access, { expires: 1 });
      setAccessToken(result.access)
    } catch (error) {
      // Lidar com o erro, se necessário
      console.error('Erro ao obter dados:', error);
    }
  }

  return (
    <AuthContext.Provider value={{login2, requestNewAcessToken, accessToken, refreshToken, loggedIn, logIn, logOut }}>
      {isVerified && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};