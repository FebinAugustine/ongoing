import React from "react";
import useAuth from "../../../hooks/useAuth";

const ManagerDashboard = () => {
  const { auth } = useAuth();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 dark:text-white">
        Manager Dashboard
      </h2>
      <p className="dark:text-gray-300">Welcome, Manager!</p>
      <div className="mt-4 dark:text-gray-300">
        <h3>Manager Details:</h3>
        {auth?.email && <p>Email: {auth.email}</p>}
        {auth?.roles && <p>Roles: {auth.roles.join(", ")}</p>}
        {/* Add manager-specific content */}
      </div>
    </div>
  );
};

export default ManagerDashboard;
