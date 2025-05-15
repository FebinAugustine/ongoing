import { createContext, useState, useEffect, useCallback } from "react";
import axiosInstance from "../api/axiosClient";

const AuthContext = createContext();

// Helper function to safely parse localStorage items
const safeParse = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage:`, error);
    return defaultValue;
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuthState] = useState(() => {
    return safeParse("auth", {}); // Default to empty object
  });

  const [persist, setPersistState] = useState(() => {
    return safeParse("persist", false); // Default to false
  });

  // Automatically update axios headers when auth changes
  useEffect(() => {
    if (auth?.accessToken) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${auth.accessToken}`;
    } else {
      delete axiosInstance.defaults.headers.common["Authorization"];
    }
  }, [auth?.accessToken]);

  // Persist auth state to localStorage
  useEffect(() => {
    if (persist) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth, persist]);

  // Memoized state updaters
  const setAuth = useCallback((newAuth) => {
    setAuthState((prev) => ({ ...prev, ...newAuth }));
  }, []);
  const setPersist = useCallback((newPersist) => {
    try {
      setPersistState(newPersist);
      localStorage.setItem("persist", JSON.stringify(newPersist));
    } catch (error) {
      console.error("Error updating persist in localStorage:", error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
