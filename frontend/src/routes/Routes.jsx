import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../features/auth/pages/Home";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import AuthLayout from "../features/auth/components/AuthLayout";

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
        ],
      },
    ],
  },
]);

export default router;
