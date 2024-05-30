import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../auth/AuthProvider";
import Sidebar from "../components/Sidebar/Sidebar";
import styled from "styled-components";

const Content = styled.div<{ isOpen: boolean }>`
  margin-left: ${({ isOpen }) => (isOpen ? "300px" : "0")};
  transition: margin-left 0.3s ease;
`;

const ProtectedRoute = () => {
  const { isLoggedIn, user } = useAuthContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!user && isLoggedIn) {
    return <div>Loading...</div>;
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
