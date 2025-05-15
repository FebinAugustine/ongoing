import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar"; // You'll need to create this
import AdminSidebar from "../components/AdminSidebar"; // You'll need to create this

const AdminLayout = () => {
  return (
    <div className="admin-layout flex h-screen bg-gray-100 dark:bg-gray-900">
      <AdminSidebar />
      <div className="flex-1 overflow-y-auto p-8">
        <AdminNavbar />
        <div className="mt-4">
          <Outlet />
        </div>
      </div>
      {/* Add admin-specific layout elements */}
    </div>
  );
};

export default AdminLayout;
