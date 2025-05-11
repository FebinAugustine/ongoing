import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const Home = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 p-8">
    <h1 className="text-4xl font-bold text-gray-800 dark:text-white text-center">
      Welcome to My App
    </h1>
    <p className="mt-4 text-gray-600 dark:text-gray-400">
      Please login to continue
    </p>
    <div className="mt-8">
      <Link
        to="/login"
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Let's Get Started
      </Link>
    </div>
  </div>
);

export default Home;
