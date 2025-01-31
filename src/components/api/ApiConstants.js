import axios from 'axios';

// Create axios instance
const ApiConstants = axios.create({
  baseURL: 'http://localhost:8080/', // your base URL
  headers: {
    "Content-Type": "application/json", // Default content type for all requests
  }
});

// Axios request interceptor to add the token to headers for all requests
ApiConstants.interceptors.request.use(
  (config) => {
    // Skip adding the token for login and register requests
    if (!config.url.includes("/auth/login") && !config.url.includes("/auth/register")) {
      const token = localStorage.getItem("authToken");
      if (token) {
        // Attach token to headers if available and not a register/login request
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default ApiConstants;
