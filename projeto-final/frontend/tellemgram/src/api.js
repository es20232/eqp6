import axios from "axios";
import config from "./config";
import Cookies from 'js-cookie';

export const fetchUsers = async (accessToken) => {
  try {
    console.log(
      "fetchUsers: " + JSON.stringify(config.apiUrl + config.getUsersEndpoint)
    );
    const response = await axios.get(config.apiUrl + config.getUsersEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro na requisição fetchUsers:", error);
    throw error;
  }
};

export const refreshAcessToken = async (refreshToken) => {
  try {
    console.log(
      "getRefreshToken: " + JSON.stringify(config.apiUrl + config.refreshTokenEndpoint)
    );
    const response = await axios.post(
      config.apiUrl + config.refreshTokenEndpoint,
      {"refresh": refreshToken},
      {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro na requisição fetchUsers:", error);
    throw error;
  }
};

export const uploadImage = async (base64Image) =>{
  const accessToken = Cookies.get('accessToken')
  try {
    console.log(
      "Uploading Image to: " + JSON.stringify(config.apiUrl + config.uploadImageEndpoint)
    );
    const response = await axios.post(
      config.apiUrl + config.uploadImageEndpoint,
      { id: 13, image: base64Image},
      {
          headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          },
      }
    );
    console.log("Resposta do servidor: " + JSON.stringify(response.data))
    return response.data;
  } catch (error) {
    console.error("Erro na requisição uploadImage:", error);
    throw error;
  }
}