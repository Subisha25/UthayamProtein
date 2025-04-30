// ThemeContext.js
import React, { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Load from localStorage or default to "Red"
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "Red"; // Default is Red
  });

  // Change theme and store in localStorage
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Apply the theme class to the body on every change
  useEffect(() => {
    document.body.className = "";
    document.body.classList.add(`theme-${theme.toLowerCase()}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
