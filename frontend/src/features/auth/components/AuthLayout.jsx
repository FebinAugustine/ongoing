import React from "react";
import { Outlet } from "react-router-dom";
import AuthNavbar from "./AuthNavbar.jsx";

const AuthLayout = () => {
  return (
    <main className="bg-gray-100 ">
      <AuthNavbar />
      <Outlet />
    </main>
  );
};

export default AuthLayout;
