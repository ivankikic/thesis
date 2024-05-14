import axios from "axios";
import AuthService from "./Auth";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  headers: {
    common: {
      "Content-Type": "application/json",
    },
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const accessToken = AuthService.getAccessToken();
    let userRole = AuthService.getUserRole();

    if (userRole === 0) {
      userRole = AuthService.getChosenCurrentUserRole();
    }

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    // Add the user role to every request if it exists
    if (userRole) {
      config.headers["Role"] = userRole;
    }

    config.headers["Content-Type"] =
      config.headers["Content-Type"] || "application/json";

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;
