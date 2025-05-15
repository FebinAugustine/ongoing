import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const ProtectedRoute = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const userRoles = auth?.roles || [];

  const isAllowed = allowedRoles.some((role) => userRoles.includes(role));

  return isAllowed ? (
    <Outlet />
  ) : auth?.accessToken ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
