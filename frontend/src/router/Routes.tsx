import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      {/*<Route path="/login" element={<Login />} />*/}
      {/*<Route path="/register" element={<Register />} />*/}
      <Route element={<ProtectedRoute />}>
        {/*<Route path="/home" element={<Home />} />*/}
        <Route element={<AdminRoute />}></Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
