import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

/**
 * role: required role for route (e.g. 'superadmin' or 'sales')
 * Child must be a component
 */
export default function ProtectedRoute({ children, role }) {
  const user = getCurrentUser();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) {
    // redirect to login or an unauthorized page
    return <Navigate to="/login" replace />;
  }
  return children;
}
