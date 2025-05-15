import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { logoutUser } from "../../../api/authApiServices";

const ManagerNavbar = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      console.log("Logout response:", response);
      setAuth({}); // Clear auth state
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error during logout:", error);
      // Handle logout error (e.g., show a toast message)
    }
  };

  return (
    <nav className="bg-orange-500 dark:bg-orange-700 p-4 text-white flex justify-between items-center">
      <div className="font-bold text-lg">Manager Portal</div>
      <div>
        <span className="mr-4">Welcome, {auth?.email || "Manager"}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default ManagerNavbar;
