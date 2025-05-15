import React from "react";
import { useTheme } from "../../store/themeContext";

export default function ThemeBtn() {
  const { themeMode, lightTheme, darkTheme } = useTheme();
  const onChangeBtn = (e) => {
    const darkModeStatus = e.currentTarget.checked;
    if (darkModeStatus) {
      darkTheme();
    } else {
      lightTheme();
    }
  };
  return (
    <label className="relative inline-flex items-center cursor-pointer hide md:flex">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        onChange={onChangeBtn}
        checked={themeMode === "dark"}
      />
      <div className="w-8 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 md:w-11 md:h-6 md:after:h-5 md:after:w-5 md:after:top-[2px] md:after:left-[2px] md:peer-focus:ring-4"></div>
      <span className="ml-2 text-xs font-normal text-gray-900 dark:text-gray-300 md:ml-3 md:text-sm md:font-medium">
        Toggle Theme
      </span>
    </label>
  );
}
