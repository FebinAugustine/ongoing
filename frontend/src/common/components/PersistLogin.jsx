import { useState, useEffect, useContext } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import { Outlet, useNavigate } from "react-router-dom";
import AuthContext from "../../store/authContext";
import axiosInstance from "../../api/axiosClient";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, persist, setAuth } = useContext(AuthContext);
  const refresh = useRefreshToken();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        const newAccessToken = await refresh();
        setAuth({ accessToken: newAccessToken }); // Will auto-save to localStorage
      } catch (error) {
        console.error("Refresh failed:", error);
        if (isMounted) navigate("/login");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    // Only attempt refresh if:
    // - Persist is enabled
    // - No existing access token
    if (persist && !auth?.accessToken) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    return () => (isMounted = false);
  }, [persist, auth?.accessToken, refresh, navigate, setAuth]);

  return isLoading ? <p>Loading...</p> : <Outlet />;
};

export default PersistLogin;
