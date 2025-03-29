import React, { useState, useEffect} from "react";
import "../banner/banner.css";
import chickenImage from "../assets/features_img02 1.png";
import logo from "../assets/Uthayam_Protein_Logo_PNG 1.png";
import Chicken from '../assets/cbi_chicken.png';
import Egg from '../assets/jam_eggs-f.png';
import Kadai from '../assets/Group.png';
import User from '../assets/Vector (1).png';
import Arrow from '../assets/Vector (2).png';
import Cart from '../assets/Vector.png';
import About from "../about/about";
import { Link,useNavigate } from "react-router-dom";
import Search from '../assets/iconamoon_search.png';
const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setMobileMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="container">
      <div className="top-banner"></div>

      <header className="mobileheader">
      {/* Left side - Logo */}
      <div className="mobilelogo">
        <img src={logo} alt="Logo" />
      </div>

      {/* Right side - Icons */}
      <div className="mobileicons">
       <img src={User} alt=" " className="mobimg1" />
       <img src={Arrow} alt=" " className="mobimg2" />
       <img src={Cart} alt=" " className="mobimg1" />

      </div>
    </header>

      <header className="header">
        
        <div className="header-left">
          <img src={logo} alt="Uthayam Protein" className="logo" />
         
        </div>
        
        <div className="header-right">
          {/* {windowWidth <= 768 && (
            <button 
              className="mobile-menu-toggle" 
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          )} */}
          
          <nav className={`nav ${mobileMenu ? 'mobile-active' : ''}`}>
          <span className="nav-item">
              <img src={Search} alt="" className="navimage" />
            Search
            </span>
            <span className="nav-item">
              <img src={User} alt="" className="navimage" />
              Login 
              <img src={Arrow} className="navimage2" alt="" />
            </span>
            {/* <span className="nav-item2" onClick={() => navigate("/cart")}>
              <img src={Cart} className="navimage" alt="" />
              Cart
            </span> */}
            <Link className="nav-item2" to="/cart">
              <img src={Cart} className="navimage" alt=""  onClick={() => navigate("/cart")}/>
              Cart
            </Link>
          </nav>

        </div>
      </header>

    </div>
  );
};

export default Navbar;