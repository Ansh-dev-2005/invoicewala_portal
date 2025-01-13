import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  console.log("ProtectedRoute: isAuthenticated:", isAuthenticated);

  if (loading) {
    return <div>Loading...</div>; // Add a loading state
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
