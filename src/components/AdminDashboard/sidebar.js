// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { FaList, FaBox, FaTimes, FaBars,FaImage, FaHome  } from 'react-icons/fa';
// import './sidebar.css';
// import { BiSolidCategory } from "react-icons/bi";
// import { IoStorefrontSharp } from "react-icons/io5";
// import { FaUsers } from "react-icons/fa";
// import { ThemeContext } from '../AdminDashboard/ThemeContext';
// import { useContext } from 'react';

// const Sidebar = () => {
  
//   const [isOpen, setIsOpen] = useState(false);
//   const { theme } = useContext(ThemeContext);
//   const toggleSidebar = () => setIsOpen(!isOpen);
//   const closeSidebar = () => setIsOpen(false);

//   return (
//     <>
//       {/* Toggle shown only when sidebar is closed */}
//       {!isOpen && (
//         <div className="sidebar-toggle" onClick={toggleSidebar}>
//           <FaBars />
//         </div>
//       )}

//       {/* Sidebar */}
//       <div className={`sidebar ${isOpen ? 'open' : ''}`}>
//         {/* Close button inside sidebar (top right) */}
//         <div className="sidebar-close" onClick={closeSidebar}>
//           <FaTimes />
//         </div>

//         <h3>Admin Panel</h3>
        // <ul onClick={closeSidebar}>
        // <li>
        // <NavLink to="/dashboard" end className={({ isActive }) => (isActive ? "active" : "")}>
        // <span className="nav-icon"><FaHome /></span> Home
        //     </NavLink>
        //   </li>
        //   <li>
        //     <NavLink to="/dashboard/orderlist" className={({ isActive }) => (isActive ? "active" : "")}>
        //       <span className="nav-icon"><FaList /></span> Order List
        //     </NavLink>
        //   </li>
        //   <li>
        //     <NavLink to="/dashboard/admindashboard" className={({ isActive }) => (isActive ? "active" : "")}>
        //       <span className="nav-icon"><FaBox /></span> Product List
        //     </NavLink>
        //   </li>
        //   <li>
        //     <NavLink to="/dashboard/customerlist" className={({ isActive }) => (isActive ? "active" : "")}>
        //       <span className="nav-icon"><FaUsers /></span> Customers
        //     </NavLink>
        //   </li>
        //   <li>
        //     <NavLink to="/dashboard/imagedashboard" className={({ isActive }) => (isActive ? "active" : "")}>
        //       <span className="nav-icon"><FaImage /></span> Image List
        //     </NavLink>
        //   </li>
        //   <li>
        //     <NavLink to="/dashboard/categorylist" className={({ isActive }) => (isActive ? "active" : "")}>
        //       <span className="nav-icon"><BiSolidCategory /></span> Category List
        //     </NavLink>
        //     <NavLink to="/dashboard/storeinformation" className={({ isActive }) => (isActive ? "active" : "")}>
        //       <span className="nav-icon"><IoStorefrontSharp /></span> Store Information
        //     </NavLink>
        //   </li>
        // </ul>
//       </div>
//     </>
//   );
// };

// export default Sidebar;




import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaList, FaBox, FaTimes, FaBars, FaImage, FaHome } from 'react-icons/fa';
import { ThemeContext } from '../AdminDashboard/ThemeContext';
import './sidebar.css';
import { FaUsers } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { IoStorefrontSharp } from "react-icons/io5";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useContext(ThemeContext);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {!isOpen && (
        <div className="sidebar-toggle" onClick={toggleSidebar}>
          <FaBars />
        </div>
      )}

      <div className={`sidebar ${isOpen ? 'open' : ''} sidebar-${theme.toLowerCase()}`}>
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
            <NavLink to="/dashboard/customerlist" className={({ isActive }) => (isActive ? "active" : "")}>
              <span className="nav-icon"><FaUsers /></span> Customers
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/imagedashboard" className={({ isActive }) => (isActive ? "active" : "")}>
              <span className="nav-icon"><FaImage /></span> Image List
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/categorylist" className={({ isActive }) => (isActive ? "active" : "")}>
              <span className="nav-icon"><BiSolidCategory /></span> Category List
            </NavLink>
            <NavLink to="/dashboard/storeinformation" className={({ isActive }) => (isActive ? "active" : "")}>
              <span className="nav-icon"><IoStorefrontSharp /></span> Store Information
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;