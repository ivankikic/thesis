import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./ProtectedRoute";

const AdminRoute = () => {
  const { isAuthenticated, isLoading, userRole } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated && userRole === 0 ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminRoute;
