import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/*<Route path="/register" element={<Register />} />*/}
      <Route element={<ProtectedRoute />}>
        {/*<Route path="/home" element={<Home />} />*/}
        <Route element={<AdminRoute />}></Route>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
