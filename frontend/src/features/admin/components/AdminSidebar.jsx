import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 w-64 min-h-screen p-4">
      <div className="mb-8">
        <h3 className="font-semibold text-xl dark:text-white">Admin Menu</h3>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin/dashboard"
              className="block p-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="block p-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              Manage Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/products"
              className="block p-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              Manage Products
            </Link>
          </li>
          <li>
            <Link
              to="/admin/orders"
              className="block p-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              View Orders
            </Link>
          </li>
          {/* Add more admin-specific links */}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
