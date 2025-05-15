import React from "react";
import { Outlet } from "react-router-dom";
import ManagerNavbar from "../components/ManagerNavbar"; // You'll need to create this
import ManagerSidebar from "../components/ManagerSidebar"; // You'll need to create this

const ManagerLayout = () => {
  return (
    <div className="manager-layout flex h-screen bg-gray-100 dark:bg-gray-900">
      <ManagerSidebar />
      <div className="flex-1 overflow-y-auto p-8">
        <ManagerNavbar />
        <div className="mt-4">
          <Outlet />
        </div>
      </div>
      {/* Add manager-specific layout elements */}
    </div>
  );
};

export default ManagerLayout;
