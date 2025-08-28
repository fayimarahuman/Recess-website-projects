// src/api/client.js
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://127.0.0.1:5000",
  withCredentials: true,
});

// attach token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("adminToken", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("adminToken");
    delete api.defaults.headers.common["Authorization"];
  }
};