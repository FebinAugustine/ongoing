import React from "react";
import { Link } from "react-router-dom";

const ManagerSidebar = () => {
  return (
    <aside className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 w-64 min-h-screen p-4">
      <div className="mb-8">
        <h3 className="font-semibold text-xl dark:text-white">Manager Menu</h3>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              to="/manager/dashboard"
              className="block p-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/manager/teams"
              className="block p-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              Manage Teams
            </Link>
          </li>
          <li>
            <Link
              to="/manager/reports"
              className="block p-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              View Reports
            </Link>
          </li>
          {/* Add more manager-specific links */}
        </ul>
      </nav>
    </aside>
  );
};

export default ManagerSidebar;
