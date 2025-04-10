import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Products from "../products/products";
import Navbar from "../navbar/navbar";


const AllSwitches = () => {

      const [active, setActive] = useState("all");
      const navigate = useNavigate();
    
    const switches = [
        { label: "all", route: "/all" },
        { label: "chicken", route: "/chicken" },
        { label: "egg", route: "/egg" },
        { label: "kadai", route: "/kadai" },
      ];
    
      const handleClick = (item) => {
        setActive(item.label);
        navigate(item.route); // 🔥 navigate to the route
      };

  return (
    <>
    <Navbar />
    <div className="allproducts">
    <div className="allproducts-container">
      <div className="allproducts-switch-group">
        {switches.map((item) => (
          <span
            key={item.label}
            className={`allproducts-switch-btn ${active === item.label ? "active" : ""}`}
            onClick={() => handleClick(item)}
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
    </div>
    <Products />
    </>
  );
};

export default AllSwitches;
