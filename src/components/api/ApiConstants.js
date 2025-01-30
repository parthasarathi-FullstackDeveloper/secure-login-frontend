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
    const token = localStorage.getItem("authToken");
    if (token) {
      // Attach token to headers if available
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default ApiConstants;
