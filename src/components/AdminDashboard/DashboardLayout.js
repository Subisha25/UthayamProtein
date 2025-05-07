import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import "./DashboardLayout.css";
import { Outlet, useNavigate } from "react-router-dom";
import { ThemeContext } from "../AdminDashboard/ThemeContext";
import axios from "axios"; // ✅ add axios

const themes = ["Lightblue", "Dark", "Blue", "Pink", "Red"];

const DashboardLayout = () => {
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem("theme") || "Lightblue"
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // ✅ Remove localStorage values
  const [adminName, setAdminName] = useState("Administrator");
  const [adminLogo, setAdminLogo] = useState("http://udhayamp.pcstech.in/admin/avatar/user.jpg");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/profile/1");
        setAdminName(response.data.fullName);
        setAdminLogo(`http://localhost:5000/${response.data.avatar.replace(/^uploads\//, '')}`);
      } catch (error) {
        console.error("Failed to fetch admin profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "/adminlogin";
  };

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    localStorage.setItem("theme", theme);
    document.body.className = "";
    document.body.classList.add(`theme-${theme.toLowerCase()}`);
  };

  useEffect(() => {
    document.body.className = "";
    document.body.classList.add(`theme-${selectedTheme.toLowerCase()}`);
  }, [selectedTheme]);

  const navigate = useNavigate();

  return (
    <ThemeContext.Provider value={{ theme: selectedTheme, setTheme: handleThemeChange }}>
      <div className="admin-layout">
        <Sidebar />

        <div className="main-content">
          <div className="admin-header">
            {/* Theme Selector */}
            <div className="theme-selector">
              <span>Theme▾</span>
              <ul className="theme-dropdown">
                {themes.map((theme) => (
                  <li key={theme} onClick={() => handleThemeChange(theme)}>
                    {theme}
                  </li>
                ))}
              </ul>
            </div>

            {/* Search bar */}
            <div className="search-bar">
              <input type="text" placeholder="Search order" />
              <button className="search-button">🔍</button>
            </div>

            {/* Admin Logo Dropdown */}
            <div className="admin-profile" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <img src={adminLogo} alt="Admin" className="admin-logo" />
              {isDropdownOpen && (
                <div className="admin-dropdown">
                  <img src={adminLogo} alt="Admin" className="admin-dropdown-logo" />
                  <p className="admin-name">{adminName}</p>
                  <p className="admin-role">Member since</p>
                  <button className="setting-btn" onClick={() => navigate("/dashboard/accountsettings")}>
                    Setting
                  </button>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="page-content">
            <Outlet />
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default DashboardLayout;
