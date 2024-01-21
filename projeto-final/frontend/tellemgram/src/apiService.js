import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const endpoints = {
  loginEndpoint: "login/?format=json",
  getUsersEndpoint: "api/users/",
  refreshTokenEndpoint: "token/refresh",
  uploadImageEndpoint: "upload-image/upload/",
};
