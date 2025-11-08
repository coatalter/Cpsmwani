import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import SuperAdminPanel from "./components/SuperAdminPanel";
import SalesDashboard from "./components/SalesDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { initDefaultAdmin } from "./services/authService";

export default function App() {
  useEffect(() => {
    // Pastikan akun superadmin ada saat pertama kali load
    initDefaultAdmin();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      {/* Superadmin area - hanya role 'superadmin' */}
      <Route
        path="/superadmin/*"
        element={
          <ProtectedRoute role="superadmin">
            <SuperAdminPanel />
          </ProtectedRoute>
        }
      />

      {/* Sales dashboard - role 'sales' */}
      <Route
        path="/sales/*"
        element={
          <ProtectedRoute role="sales">
            <SalesDashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<div className="p-8">Page not found</div>} />
    </Routes>
  );
}
