import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../api/authApiServices";

const Navbar = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate(); // Import useNavigate

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
    <nav className="bg-blue-500 dark:bg-blue-700 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-lg">
          My App
        </Link>
        <div>
          {auth?.accessToken ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Logout
            </button>
          ) : (
            <div>
              <Link to="/login" className="mr-4 hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
