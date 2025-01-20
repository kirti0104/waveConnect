import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

 export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = Cookies.get("authToken");

  if (!isAuthenticated) {
  
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export const ProtectedLoginRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = Cookies.get("authToken");

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
