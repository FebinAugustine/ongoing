import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./store/themeContext"; // Correct named import
import { AuthProvider } from "./store/authContext";

function App() {
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
    <AuthProvider>
      <ThemeProvider value={{ themeMode, lightTheme, darkTheme, toggleTheme }}>
        <main className="bg-gray-300 dark:bg-black p-4 min-h-screen">
          <Outlet />
        </main>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
