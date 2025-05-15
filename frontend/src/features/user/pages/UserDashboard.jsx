import React from "react";
import useAuth from "../../../hooks/useAuth";

const UserDashboard = () => {
  const { auth } = useAuth();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 dark:text-white">
        User Dashboard
      </h2>
      <p className="dark:text-gray-300">Welcome, User!</p>
      <div className="mt-4 dark:text-gray-300">
        <h3>Your Details:</h3>
        {auth?.email && <p>Email: {auth.email}</p>}
        {auth?.roles && <p>Roles: {auth.roles.join(", ")}</p>}
        {/* Add other user details you might want to display */}
      </div>
    </div>
  );
};

export default UserDashboard;
