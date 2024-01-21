import React, { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";

import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

import "./TokenManager.css";
// import { refreshAcessToken } from "../../api";

const TokenManager = () => {
  const {requestNewAcessToken, accessToken, refreshToken } = useAuth();
  const [acessTokenExpirationTime, setAccessTokenExpirationTime] = useState(null);
  const [refreshTokenExpirationTime, setRefreshTokenExpirationTime] = useState(null);

  const verifyTokenExpirationTime = (token) =>{
    const payload = JSON.parse(atob(token.split(".")[1]));

    if (payload && payload.exp) {
      const expirationTimeInSeconds = payload.exp;

      const currentTimestampInSeconds = Math.floor(Date.now() / 1000);

      if (currentTimestampInSeconds < expirationTimeInSeconds) {
        return String(new Date(expirationTimeInSeconds * 1000))
      } else {
          return null
      }
    } else {
      console.log("Token inválido ou sem data de expiração");
    }
  }

  useEffect(() => {
    verifyAllTokens()
  }, [accessToken,refreshToken]);

  const verifyAllTokens = () => {
    console.log("Verificando a validade dos tokens...")
    const acessTokenExpiration = verifyTokenExpirationTime(accessToken)
    setAccessTokenExpirationTime(acessTokenExpiration)
    const refreshTokenExpiration = verifyTokenExpirationTime(refreshToken)
    setRefreshTokenExpirationTime(refreshTokenExpiration)
  }

  // const getNewToken = async () =>{
  //   console.log("Função de revalidar o token")
  //   try {
  //     const result = await refreshAcessToken(refreshToken); // Substitua pela sua URL
  //     console.log(result);
  //   } catch (error) {
  //     // Lidar com o erro, se necessário
  //     console.error('Erro ao obter dados:', error);
  //   }
  // }

  const refreshButtonHandle = async () => {
    await requestNewAcessToken()
  }

//   const requestToAPI = async () => {
//     try {
//         const result = await fetchUsers(accessToken); // Substitua pela sua URL
//         console.log(result);
//       } catch (error) {
//         // Lidar com o erro, se necessário
//         console.error('Erro ao obter dados:', error);
//       }
// }

  return (
    <div className="token-manager-container">
      <div className="token-container">
        <TextField
          id="outlined-multiline-flexible"
          label="AcessToken"
          multiline
          disabled
          value={accessToken}
          sx={{ width: "100%" }}
        />

        {acessTokenExpirationTime && (
          <p>O token é válido até: {acessTokenExpirationTime}</p>
        )}
        {!acessTokenExpirationTime && <p>O token já expirou</p>}
      </div>
      
      <div className="token-container">
        <TextField
          id="outlined-multiline-flexible"
          label="RefreshToken"
          multiline
          disabled
          value={refreshToken}
          sx={{ width: "100%" }}
        />
        {refreshTokenExpirationTime && (
          <p>O token é válido até: {refreshTokenExpirationTime}</p>
        )}
        {!refreshTokenExpirationTime && <p>O token já expirou</p>}
      </div>

      <div className="button-container">
        <Button variant="outlined" onClick={verifyAllTokens}>Verificar Tokens</Button>
        <Button variant="outlined" onClick={refreshButtonHandle}>Atualizar AccessToken</Button>
      </div>
    </div>
  );
};

export default TokenManager;
