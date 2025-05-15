import React from "react";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { ThemeProvider } from "../../store/themeContext";

const AppLayout = () => {
  const [themeMode, setThemeMode] = useState(() => {
    // Initialize themeMode from local storage or default to 'light'
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light";
  });

  const lightTheme = () => {
    setThemeMode("light");
    localStorage.setItem("theme", "light"); // Store in local storage
  };

  const darkTheme = () => {
    setThemeMode("dark");
    localStorage.setItem("theme", "dark"); // Store in local storage
  };

  const toggleTheme = () => {
    setThemeMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("theme", newMode);
      return newMode;
    });
  };

  useEffect(() => {
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme, toggleTheme }}>
      <main>
        <Outlet />
      </main>
    </ThemeProvider>
  );
};

export default AppLayout;
