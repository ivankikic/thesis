import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../auth/AuthProvider";

const AdminRoute = () => {
  const { isLoggedIn, user } = useAuthContext();

  if (!user) {
    return <div>Loading...</div>;
  }

  return isLoggedIn && user.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminRoute;
