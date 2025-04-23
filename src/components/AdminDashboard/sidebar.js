import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaList, FaBox, FaTimes, FaBars,FaImage, FaHome  } from 'react-icons/fa';
import './sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Toggle shown only when sidebar is closed */}
      {!isOpen && (
        <div className="sidebar-toggle" onClick={toggleSidebar}>
          <FaBars />
        </div>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Close button inside sidebar (top right) */}
        <div className="sidebar-close" onClick={closeSidebar}>
          <FaTimes />
        </div>

        <h3>Admin Panel</h3>
        <ul onClick={closeSidebar}>
        <li>
        <NavLink to="/dashboard" end className={({ isActive }) => (isActive ? "active" : "")}>
        <span className="nav-icon"><FaHome /></span> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/orderlist" className={({ isActive }) => (isActive ? "active" : "")}>
              <span className="nav-icon"><FaList /></span> Order List
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/admindashboard" className={({ isActive }) => (isActive ? "active" : "")}>
              <span className="nav-icon"><FaBox /></span> Product List
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/imagedashboard" className={({ isActive }) => (isActive ? "active" : "")}>
              <span className="nav-icon"><FaImage /></span> Image List
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
