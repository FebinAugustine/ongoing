import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { FaEnvelope, FaLock } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { loginUser } from "../../../api/authApiServices";

const LoginComponent = () => {
  const { setAuth, setPersist } = useAuth(); // Get auth setters from hook
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({ email, password });
      console.log("Login Response in Component:", response.data);

      if (response?.error) {
        setErrMsg(response.error);
        errRef.current.focus();
        return;
      }

      if (response?.data?.accessToken && response?.data?.roles) {
        const { accessToken, roles, email, username } = response.data;
        setAuth({ accessToken, roles, email, username });
        setPersist(rememberMe); // Set persist state
        localStorage.setItem("persist", JSON.stringify(rememberMe)); // Update localStorage
        console.log("Login AT", accessToken);
        console.log("Login Roles", roles);
        console.log("Login Email", email);
        console.log("Login Username", username);
        toast.success("Login Successful!");
        setEmail("");
        setPassword("");
        // Fixed navigation using destructured roles
        navigate(getRolePath(roles), { replace: true });
      }
    } catch (err) {
      console.error("Login Error:", err);
      setErrMsg("Login failed due to a network error.");
      errRef.current.focus();
    }
  };

  // Simplified role path mapping
  const getRolePath = (roles) => {
    const pathMap = {
      admin: "/admin/dashboard",
      user: "/user/dashboard",
      manager: "/manager/dashboard",
    };

    // Find first matching role or fallback
    const validRole = roles.find((role) => pathMap[role]);
    return validRole ? pathMap[validRole] : "/unauthorized";
  };

  // Synchronized persist toggle
  const togglePersist = () => {
    setRememberMe((prev) => !prev);
    setPersist((prev) => !prev); // Direct sync with context
  };

  return (
    <div className="h-auto dark:bg-gray-800 bg-gray-50 flex justify-center pt-8 pb-20  px-2  sm:px-6 lg:px-8">
      <div className="dark:bg-gray-900 bg-white mt-4 p-4 md:p-8 rounded-lg shadow-xl w-full max-w-md h-auto transition-all">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <Toaster />

        <div className="text-center">
          <h2 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left"
            >
              Email address
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <FaEnvelope className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                id="email"
                name="email"
                type="email"
                ref={userRef}
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="dark:bg-gray-800 dark:text-white dark:border-gray-700 w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left"
            >
              Password:
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <FaLock className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                className="dark:bg-gray-800 dark:text-white dark:border-gray-700 w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>
          </div>
          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={togglePersist}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>

          <div>
            <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Sign in
            </button>
          </div>

          <div className="text-center text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Register here
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
