import React from "react";
import { Link } from "react-router-dom";

const AdminTest = () => {
  return (
    <div>
      <h2>Test Route</h2>
      <Link to="/admin/dashboard">Dashboard</Link>
    </div>
  );
};

export default AdminTest;
