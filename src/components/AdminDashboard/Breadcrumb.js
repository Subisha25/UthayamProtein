// src/components/Breadcrumb.js
import React from "react";
import { FaHome } from "react-icons/fa"; // Font Awesome home icon

const Breadcrumb = ({ current }) => {
  return (
    <div className="breadcrumb">
    <a href="/dashboard">   <FaHome className="icon"/>Home</a> / <span>{current}</span>
  </div>
  
  );
};

export default Breadcrumb;
