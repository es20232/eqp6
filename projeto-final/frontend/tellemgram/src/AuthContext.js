import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { api, endpoints } from "./apiService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    Cookies.get("accessToken") || null
  );
  const [refreshToken, setRefreshToken] = useState(
    Cookies.get("refreshToken") || null
  );
  const [loggedIn, setLoggedIn] = useState(accessToken && refreshToken);
  const [myUserId, setMyUserId] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    setAccessToken(Cookies.get("accessToken"));
    setRefreshToken(Cookies.get("refreshToken"));
    if(Cookies.get("accessToken") !== undefined){
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${Cookies.get("accessToken")}`;
    }
    
    if (refreshToken) {
      setLoggedIn(true);
    }

    setIsVerified(true);
  }, []);

  const login = async ({ username, password }) => {
    try {
      const response = await api.post(endpoints.login, {
        username: username,
        password: password,
      });
      if (response.data.error) {
        return response.status;
      } else {
        Cookies.set("accessToken", response.data.access, { expires: 1 });
        Cookies.set("refreshToken", response.data.refresh, { expires: 1 });
        Cookies.set("myUserId", response.data.user.pk, { expires: 1 });
        Cookies.set("myFirstName", response.data.user.first_name, { expires: 1 });
        Cookies.set("myLastName", response.data.user.last_name, { expires: 1 });
        Cookies.set("myUserName", response.data.user.username, { expires: 1 });
        Cookies.set("myEmail", response.data.user.email, { expires: 1 });
        Cookies.set("canUnlike", true, { expires: 1 });
        setAccessToken(response.data.access);
        setRefreshToken(response.data.refresh);
        setLoggedIn(true);
        setMyUserId(response.data.user.pk)
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access}`;
        return response.status;
      }
    } catch (err) {
      console.log(err);
      if ("response" in err) {
        return err.response.status;
      } else {
        return 503;
      }
    }
  };

  const logout = () => {
    // Limpar os cookies e redefinir o estado
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setAccessToken(null);
    setRefreshToken(null);
    setLoggedIn(false);
    sessionStorage.clear();
    delete api.defaults.headers.common["Authorization"]
  };

  const requestNewAcessToken = async () => {
    try {
      const response = await api.post(endpoints.refreshToken, {
        refresh: refreshToken,
      });
      Cookies.set("accessToken", response.data.access, { expires: 1 });
      setAccessToken(response.data.access);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access}`;
    } catch (error) {
      console.error("Erro ao atualizar AccessToken: ", error);
    }
  };

  const getTokenExpirationTime = (token) => {
    const payload = JSON.parse(atob(token.split(".")[1]));

    if (payload && payload.exp) {
      const expirationTimeInSeconds = payload.exp;
      return expirationTimeInSeconds;
    } else {
      return null;
    }
  };

  const verifyTokenExpirationTime = async () => {
    const acessExpirationTime = getTokenExpirationTime(accessToken);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (currentTimestamp > acessExpirationTime) {
      await requestNewAcessToken();
    }
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        verifyTokenExpirationTime,
        requestNewAcessToken,
        accessToken,
        refreshToken,
        loggedIn,
        myUserId,
        login,
        logout,
      }}
    >
      {isVerified && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
