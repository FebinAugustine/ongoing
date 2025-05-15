import React from "react";
import { Link } from "react-router-dom";
import { IoIosSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import ThemeBtn from "../../../common/components/ThemeBtn";
import { useTheme } from "../../../store/themeContext";

const AuthNavbar = () => {
  const { themeMode, toggleTheme } = useTheme();
  const isDark = themeMode === "dark";

  return (
    <nav className="dark:bg-gray-900 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left Section - Logo & Brand */}
          <div className="flex items-center space-x-2">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <svg
                className="w-8 h-8 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                BrandName
              </span>
            </Link>
          </div>

          {/* Right Section - Navigation & Theme Toggle */}
          <div className="flex items-center space-x-6">
            {/* Theme Toggle */}
            <ThemeBtn />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors  md:hidden"
            >
              {isDark ? (
                <FaMoon className="w-5 h-5 text-gray-500 " />
              ) : (
                <IoIosSunny className="w-6 h-6  text-yellow-500" />
              )}
            </button>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 px-6 py-2 rounded-md"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 px-4 py-2 rounded-md"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AuthNavbar;
