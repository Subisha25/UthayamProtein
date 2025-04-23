// import React from 'react';
// import Sidebar from '../components/sidebar';
// import { Outlet } from 'react-router-dom';

// const DashboardLayout = () => {
//   return (
//     <div style={{ display: 'flex' }}>
//       <Sidebar />
//       <div style={{ flexGrow: 1, padding: '20px' }}>
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;




import React from "react";
import Sidebar from "./sidebar";
import "./DashboardLayout.css";
import { Outlet } from 'react-router-dom';


const DashboardLayout = ({ children }) => {
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    // Add other tokens or flags here if used
    window.location.href = "/adminlogin"; // or use navigate() if using useNavigate()
  };
  
  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="main-content">
        {/* 🔹 Top Header */}
        <div className="admin-header">
  <h3>Uthayam Protein Admin</h3>
  <button className="logout-button" onClick={handleLogout}>Logout</button>
</div>


        {/* 🔸 Page Content */}
        <div className="page-content">
  <Outlet />
</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
