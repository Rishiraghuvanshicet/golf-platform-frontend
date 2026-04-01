import axios from "axios";

export const apiBaseUrl =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export const http = axios.create({
  baseURL: `${apiBaseUrl}/api`,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

