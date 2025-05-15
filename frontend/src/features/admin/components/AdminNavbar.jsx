import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { logoutUser } from "../../../api/authApiServices";
import { refreshToken } from "../../../api/authApiServices";
import LogoutButton from "../../../common/components/LogoutButton";

const AdminNavbar = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_URL;
  const [testResult, setTestResult] = useState("");

  const handleRefresh = async () => {
    try {
      const response = await refreshToken();
      console.log("Access response:", response.data.newAccessToken);

      setTestResult(response.data);
    } catch (error) {
      console.error("Error during logout:", error);
      // Handle logout error (e.g., show a toast message)
    }
  };

  return (
    <nav className="bg-green-500 dark:bg-green-700 p-4 text-white flex justify-between items-center">
      <div className="font-bold text-lg">Admin Panel</div>
      <div>
        <span className="mr-4">Welcome, {auth?.email || "Admin"}</span>
        <LogoutButton />
      </div>
    </nav>
  );
};

export default AdminNavbar;
