import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const endpoints = {
  loginEndpoint: "login/?format=json",
  signupEndpoint: "register/?format=json",
  getUsersEndpoint: "users/",
  refreshTokenEndpoint: "token/refresh",
  uploadImageEndpoint: "upload-image/upload/",
  changePasswordEndpoint: "password/change/",
  resetPasswordEndpoint: "reset-password/",
};
