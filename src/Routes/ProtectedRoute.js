import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { IsTokenValid } from "../utils/middleware";

const ProtectedRoute = () => {
  const isAuthenticated = IsTokenValid();
  // const isAuthenticated = true;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
