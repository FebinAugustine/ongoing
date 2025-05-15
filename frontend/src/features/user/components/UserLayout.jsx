import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"; // You'll need to create this

const UserLayout = () => {
  return (
    <div className="user-layout">
      <Navbar />
      <div className="container mx-auto py-8">
        <Outlet />
      </div>
      {/* Add user-specific layout elements like sidebar, footer */}
    </div>
  );
};

export default UserLayout;
