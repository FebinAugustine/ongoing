import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosClient";
import { logoutUser } from "../../api/authApiServices";

const LogoutButton = () => {
  const { setAuth, setPersist } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 1. Send logout request to invalidate refresh token
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // 2. Clear all client-side authentication state
      setAuth({}); // Clear auth context
      setPersist(false); // Disable persistence

      // 3. Remove persisted data from storage
      localStorage.removeItem("auth");
      localStorage.removeItem("persist");

      // 4. Clear axios authorization header
      delete axiosInstance.defaults.headers.common["Authorization"];

      // 5. Redirect to login page
      navigate("/login", { replace: true });
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
