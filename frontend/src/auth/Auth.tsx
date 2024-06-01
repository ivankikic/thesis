import { Tokens } from "../assets/types";
import { Api } from "./index";

export default class AuthService {
  static getAccessToken() {
    try {
      return window?.localStorage?.getItem("accessToken");
    } catch (error) {
      return null;
    }
  }

  static getRefreshToken() {
    try {
      return window?.localStorage?.getItem("refreshToken");
    } catch (error) {
      return null;
    }
  }

  static getCurrentUser() {
    try {
      const userId = window?.localStorage?.getItem("currentUserId");
      return userId ? JSON.parse(userId) : null;
    } catch (error) {
      return null;
    }
  }

  static getUserRole() {
    try {
      const userRole = window?.localStorage?.getItem("currentUserRole");
      return userRole ? JSON.parse(userRole) : null;
    } catch (error) {
      return null;
    }
  }

  static getChosenCurrentUserRole() {
    try {
      const userRole = window?.localStorage?.getItem("chosenCurrentUserRole");
      return userRole ? JSON.parse(userRole) : null;
    } catch (error) {
      return null;
    }
  }

  static async getCurrentUserRole() {
    try {
      const response = await Api.get({
        url: `/api/users/current`,
      });
      return response.Role;
    } catch (error) {
      throw error;
    }
  }

  static async refreshTokens() {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) throw new Error("No refresh token available");

      const response = await Api.get({
        url: "/api/auth/refresh_token",
      });

      if (response.accessToken) {
        this.saveTokens({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken || refreshToken,
        });
        // this.saveCurrentUser(
        //   response.user.Username,
        //   response.user.Id,
        //   response.user.Role
        // );
        return response;
      } else {
        throw new Error("Failed to refresh token");
      }
    } catch (error) {
      this.logoutUser();
      throw error;
    }
  }

  static saveTokens(tokens: Tokens): void {
    try {
      window?.localStorage?.setItem("accessToken", tokens.accessToken);
      window?.localStorage?.setItem("refreshToken", tokens.refreshToken);
    } catch (error) {}
  }

  static saveCurrentUser(user: string, userId: string, userRole: string) {
    try {
      window?.localStorage?.setItem(
        "currentUserUsername",
        JSON.stringify(user)
      );
      window?.localStorage?.setItem("currentUserId", JSON.stringify(userId));
      window?.localStorage?.setItem(
        "currentUserRole",
        JSON.stringify(userRole)
      );
    } catch (error) {}
  }

  static hasTokens() {
    return Boolean(this.getAccessToken() && this.getRefreshToken());
  }

  static removeTokens() {
    try {
      window?.localStorage?.removeItem("accessToken");
      window?.localStorage?.removeItem("refreshToken");
      window?.localStorage?.removeItem("expiryDate");
      window?.localStorage?.removeItem("currentUserUsername");
      window?.localStorage?.removeItem("currentUserId");
      window?.localStorage?.removeItem("currentUserRole");
    } catch (error) {}
  }

  static logoutUser() {
    this.removeTokens();
  }

  static async loginUser(email: string, password: string) {
    try {
      const response = await Api.post({
        url: "/api/auth/login/",
        data: {
          email,
          password,
        },
      });
      const { tokens, userData } = response;
      this.saveTokens(tokens);
      // this.saveCurrentUser(userData.username, userData.email, userData.role);
      return userData;
    } catch (error) {
      console.log(error);
      throw (
        (error as any).data ||
        (error as any).message ||
        "Unknown error occurred"
      );
    }
  }

  static async registerUser(Username: string, Email: string, Password: string) {
    try {
      const response = await Api.post({
        url: "/api/auth/register/",
        data: {
          Username,
          Email,
          Password,
        },
      });
      const { accessToken, refreshToken } = response.data;
      this.saveTokens({ accessToken, refreshToken });
      return response;
    } catch (error) {
      throw error;
    }
  }
}
