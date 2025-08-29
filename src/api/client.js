// src/api/client.js
import axios from "axios";

// ✅ Create Axios instance for backend requests
export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://127.0.0.1:5000", // backend URL
  withCredentials: true, // allow cookies and credentials
});

// ✅ Interceptor: attach token automatically to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Helper function to set or remove token manually
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("adminToken", token); // save token
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`; // attach to future requests
  } else {
    localStorage.removeItem("adminToken"); // remove token
    delete api.defaults.headers.common["Authorization"];
  }
};
