import axiosClient from "../auth/apiClient";

export const getCurrentUser = async () => {
  try {
    const response = await axiosClient.get("/api/users/current");

    return response.data;
  } catch (error) {
    console.error("Failed to fetch current user:", error);
    throw error;
  }
};
