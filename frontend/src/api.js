// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // Adjust if needed
});

// Request Interceptor: Attach Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Ensure the key matches AuthContext
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const originalRequest = error.config;

      // Prevent infinite loops by checking a custom flag
      if (!originalRequest._retry && !originalRequest.url.endsWith("/api/user")) {
        originalRequest._retry = true;
        console.warn("api.js: Received 401 Unauthorized. Redirecting to /login.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        console.warn("api.js: Received 401 Unauthorized for /api/user. Not redirecting.");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
