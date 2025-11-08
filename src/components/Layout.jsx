import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout, getCurrentUser } from "../services/authService";

/**
 * Simple layout with sidebar + header, children displayed in main
 * Use this in SuperAdminPanel and SalesDashboard
 */
export default function Layout({ children }) {
  const user = getCurrentUser();
  const nav = useNavigate();

  const doLogout = () => {
    logout();
    nav("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="flex">
        <aside className="w-64 bg-white border-r min-h-screen p-4">
          <div className="text-indigo-600 font-bold text-lg">JMK · Sales</div>

          <nav className="mt-6">
            <ul className="space-y-2 text-sm">
              <li><Link to={user?.role === "superadmin" ? "/superadmin" : "/sales"} className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50">🏠 Dashboard</Link></li>
              {user?.role === "superadmin" && (
                <li><Link to="/superadmin" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50">👥 Manage Sales</Link></li>
              )}
            </ul>
          </nav>

          <div className="mt-8 text-xs text-gray-500">User</div>
          <div className="mt-2 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center">{(user?.name || "U").slice(0,2).toUpperCase()}</div>
            <div>
              <div className="text-sm font-medium">{user?.name}</div>
              <div className="text-xs text-gray-500">{user?.role}</div>
            </div>
            <button onClick={doLogout} className="ml-auto text-xs text-red-500">Logout</button>
          </div>
        </aside>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
