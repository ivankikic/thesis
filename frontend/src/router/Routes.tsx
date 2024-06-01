import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Import from "../pages/Import/Import";
import Connect from "../pages/Connect/Connect";
import AlertingSystem from "../pages/AlertingSystem/AlertingSystem";
import UserSettings from "../pages/UserSettings/UserSettings";
import Sheet from "../pages/Sheet/Sheet";
import Dashboard from "../pages/Dashboard/Dashboard";
import Connection from "../pages/Connection/Connection";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/*<Route path="/register" element={<Register />} />*/}
      <Route element={<ProtectedRoute />}>
        {/*<Route path="/home" element={<Home />} />*/}
        <Route element={<AdminRoute />}></Route>
        <Route path="/" element={<Home />} />
        <Route path="/import" element={<Import />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/alerting-system" element={<AlertingSystem />} />
        <Route path="/user-settings" element={<UserSettings />} />
        <Route path="/sheet/:id" element={<Sheet />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/connection/:id" element={<Connection />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
