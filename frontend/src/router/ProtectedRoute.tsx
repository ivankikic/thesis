import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../auth/AuthProvider";
import Sidebar from "../components/Sidebar/Sidebar";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Content = styled.div<{ isOpen: boolean }>`
  margin-left: ${({ isOpen }) => (isOpen ? "300px" : "0")};
  transition: margin-left 0.3s ease;
`;

const ProtectedRoute = () => {
  const { isLoggedIn, loading } = useAuthContext(); // Added loading state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { t } = useTranslation();

  if (loading) {
    return <div>{t("LOADING")}</div>;
  }

  return isLoggedIn ? (
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
