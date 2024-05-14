import { useEffect, useState } from "react";
import AuthService from "../auth/Auth";
import { Outlet, Navigate } from "react-router-dom";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  const checkAuth = async () => {
    setIsLoading(true);
    const hasTokens = AuthService.hasTokens();
    if (!hasTokens) {
      setIsAuthenticated(false);
      setUserRole(null);
      setIsLoading(false);
      return;
    }
    try {
      await AuthService.refreshTokens();
      setIsAuthenticated(true);
      setUserRole(AuthService.getUserRole());
    } catch (error) {
      setIsAuthenticated(false);
      setUserRole(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { isAuthenticated, isLoading, userRole };
};

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
