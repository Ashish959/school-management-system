import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 15000,
});

// Auto attach JWT
api.interceptors.request.use((config) => {

  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
