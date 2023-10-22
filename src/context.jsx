import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme:dark)").matches;
  console.log(localStorage.getItem("darkTheme"));
  const storedDarkMode = localStorage.getItem("darkTheme") === "true";
  return storedDarkMode || prefersDarkMode;
};

export const AppProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(getInitialDarkMode());
  const [searchTerm, setSearchTerm] = useState("bmw");

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDark;
    setIsDark(newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDark);
  }, [isDark]);

  return (
    <AppContext.Provider value={{ isDark, toggleDarkTheme, searchTerm, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
