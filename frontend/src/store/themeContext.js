import { createContext, useContext } from "react";

export const ThemeContext = createContext({
  themeMode: "light",
  darkTheme: () => {},
  lightTheme: () => {},
});

// Named export for Provider
export const ThemeProvider = ThemeContext.Provider;

// Named export for consumer hook
export const useTheme = () => useContext(ThemeContext);
