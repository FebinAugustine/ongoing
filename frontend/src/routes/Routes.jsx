import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../features/auth/pages/Home";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import AuthLayout from "../features/auth/components/AuthLayout";
import Unauthorized from "../features/auth/pages/Unauthorised";
import UserDashboard from "../features/user/pages/UserDashboard";
import AdminDashboard from "../features/admin/pages/AdminDashboard";
import ManagerDashboard from "../features/manager/pages/ManagerDashboard";
import UserLayout from "../features/user/components/UserLayout";
import AdminLayout from "../features/admin/components/AdminLayout";
import ManagerLayout from "../features/manager/components/ManagerLayout";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import AdminTest from "../features/admin/pages/AdminTest";
import PersistLogin from "../common/components/PersistLogin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/unauthorized",
            element: <Unauthorized />,
          },
        ],
      },
      {
        path: "/user",
        element: <ProtectedRoute allowedRoles={["user"]} />,
        children: [
          {
            path: "/user/dashboard",
            element: <UserLayout />,
            children: [
              {
                path: "/user/dashboard",
                element: <UserDashboard />,
              },
            ],
          },
        ],
      },
      {
        path: "/admin",
        element: <PersistLogin />, // Wrap ProtectedRoute with PersistLogin
        children: [
          {
            element: <ProtectedRoute allowedRoles={["admin"]} />,
            children: [
              {
                path: "/admin/dashboard",
                element: <AdminLayout />,
                children: [
                  {
                    path: "/admin/dashboard",
                    element: <AdminDashboard />,
                  },
                  {
                    path: "/admin/dashboard/test",
                    element: <AdminTest />,
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        /* Manager routes */
      },
      {
        path: "/manager",
        element: <ProtectedRoute allowedRoles={["manager"]} />,
        children: [
          {
            path: "/manager/dashboard",
            element: <ManagerLayout />,
            children: [
              {
                path: "/manager/dashboard",
                element: <ManagerDashboard />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
