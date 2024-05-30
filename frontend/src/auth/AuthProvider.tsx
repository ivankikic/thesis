import { createContext, useContext, useEffect, useState } from "react";
import AuthService from "./Auth";
import { AuthContextType } from "../assets/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const hasTokens = AuthService.hasTokens();
      if (hasTokens) {
        try {
          const userData = await AuthService.refreshTokens();
          if (userData) {
            setIsLoggedIn(true);
            setUser(userData);
          } else {
            setIsLoggedIn(false);
            setUser(null);
          }
        } catch (error) {
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userData = await AuthService.loginUser(email, password);
      setIsLoggedIn(true);
      setUser(userData);
      return userData;
    } catch (error) {
      throw error;
    }
  };
  const logout = () => {
    AuthService.logoutUser();
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
