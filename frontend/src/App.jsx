import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import AppLayout from "./common/components/AppLayout";
import Unauthorized from "./features/auth/pages/Unauthorised";
import ManagerDashboard from "./features/manager/pages/ManagerDashboard";
import AdminDashboard from "./features/admin/pages/AdminDashboard";
import UserDashboard from "./features/user/pages/UserDashboard";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import PersistLogin from "./common/components/PersistLogin";
import Home from "./features/auth/pages/Home";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import AdminTest from "./features/admin/pages/AdminTest";
import AuthLayout from "./features/auth/components/AuthLayout";
import UserLayout from "./features/user/components/UserLayout";
import ManagerLayout from "./features/manager/components/ManagerLayout";
import AdminLayout from "./features/admin/components/AdminLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {/* public routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route path="/" element={<UserLayout />}>
              <Route path="user/dashboard" element={<UserDashboard />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["manager"]} />}>
            <Route path="/manager" element={<ManagerLayout />}>
              <Route path="/manager/dashboard" element={<ManagerDashboard />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/test" element={<AdminTest />} />
            </Route>
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Unauthorized />} />
      </Route>
    </Routes>
  );
}

export default App;
