// DarkModeToggle.js
import  { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
    updateStyles(isDarkMode);
  }, []);

  const updateStyles = (isDarkMode) => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.backgroundColor = "#000";
      document.documentElement.style.color = "#fff";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.backgroundColor = "#ffffff";
      document.documentElement.style.color = "#1f2937";
    }
  };

  const toggleDarkMode = () => {
    const updatedMode = !darkMode;
    localStorage.setItem("darkMode", updatedMode);
    setDarkMode(updatedMode);
    updateStyles(updatedMode);
  };

  return (
    <button
      className={`fixed bottom-12 right-12 md:static md:me-3 p-2 rounded-full ${
        darkMode ? "bg-gray-700" : "bg-gray-300"
      }`}
      onClick={toggleDarkMode}
    >
      {darkMode ? (
        <FiSun className="w-6 h-6 text-yellow-500" />
      ) : (
        <FiMoon className="w-6 h-6 text-gray-500" />
      )}
    </button>
  );
};

export default DarkModeToggle;
