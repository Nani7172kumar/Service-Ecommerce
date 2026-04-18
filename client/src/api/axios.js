import axios from "axios";

const instance = axios.create({
  baseURL: "https://service-ecommerce-1.onrender.com/api", // your deployed backend
  timeout: 10000, // prevents hanging requests
});

// Attach token automatically
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: handle errors globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default instance;