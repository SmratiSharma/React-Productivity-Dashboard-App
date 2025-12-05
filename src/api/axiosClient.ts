import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.API_URL || "https://api.example.com",
  timeout: 10000,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Placeholder: could dispatch logout or refresh token
      console.warn("Unauthorized — redirect to login");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
