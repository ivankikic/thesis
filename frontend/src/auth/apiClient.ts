import axios from "axios";
import AuthService from "./Auth";

const axiosClient = axios.create({
  baseURL: import.meta.env.REACT_APP_BACKEND_URL || "http://localhost:5000",
  headers: {
    common: {
      "Content-Type": "application/json",
    },
  },
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  async (config) => {
    const accessToken = AuthService.getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    config.headers["Content-Type"] =
      config.headers["Content-Type"] || "application/json";
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
