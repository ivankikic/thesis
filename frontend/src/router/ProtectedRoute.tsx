import { useEffect, useState } from "react";
import AuthService from "../auth/Auth";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import styled from "styled-components";

const Content = styled.div<{ isOpen: boolean }>`
  margin-left: ${({ isOpen }) => (isOpen ? "250px" : "0")};
  transition: margin-left 0.3s ease;
`;

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <div>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <Content isOpen={isSidebarOpen}>
        <Outlet />
      </Content>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
