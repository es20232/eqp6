import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const endpoints = {
  login: "login/?format=json",
  register: "register/?format=json",
  users: "users/",
  refreshToken: "token/refresh",
  changePasswordEndpoint: "password/change/",
  resetPasswordEndpoint: "reset-password/",
};
