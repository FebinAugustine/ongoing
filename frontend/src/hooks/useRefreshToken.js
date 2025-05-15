import axiosInstance from "../api/axiosClient";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const REFRESH_URL = "/auth/refresh";

  const refresh = async () => {
    try {
      const response = await axiosInstance.get(REFRESH_URL, {
        withCredentials: true,
      });

      const { accessToken, user } = response.data.data;

      // Update auth state (triggers axios header update via useEffect)
      setAuth({
        accessToken,
        user,
      });

      return accessToken;
    } catch (error) {
      console.error("Refresh failed:", error);
      setAuth({}); // Clear auth state on failure
      throw error;
    }
  };

  return refresh;
};

export default useRefreshToken;
