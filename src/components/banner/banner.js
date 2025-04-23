import React, { useState, useEffect } from "react";
import "./banner.css";
import chickenImage from "../assets/features_img02 1.png";
import logo from "../assets/Uthayam_Protein_Logo_PNG 1.png";
import Chicken from '../assets/cbi_chicken.png';
import Egg from '../assets/jam_eggs-f.png';
import Kadai from '../assets/Group.png';
import User from '../assets/Vector (1).png';
import Arrow from '../assets/Vector (2).png';
import Cart from '../assets/Vector.png';
import About from "../about/about";
import { Link, useNavigate } from "react-router-dom";
import Search from '../assets/iconamoon_search.png';
import axios from "axios";
import { useCart } from '../context/cartContext';
import Products from "../products/products";
import Testimonials from "../testimonials/testimonials";
import Quality from "../quality/quality";



const Banner = ({ onSearch, showSearchResults }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const { cartItems } = useCart();

  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [banner, setBanner] = useState(null);
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/images');
        
        // 🔍 Find banner and logo based on title
        const bannerData = res.data.find(item => item.title.toLowerCase() === "banner image");
        const logoData = res.data.find(item => item.title.toLowerCase() === "logo");

        if (bannerData) setBanner(bannerData);
        if (logoData) setLogo(logoData);

      } catch (err) {
        console.error("Failed to load images:", err);
      }
    };

    fetchImages();
  }, []);
  

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId); // will be true if userId exists
  }, []);

  
  useEffect(() => {
    const fetchCartCount = async () => {
      const cartId = localStorage.getItem("cartId");
      if (!cartId) return;

      try {
        const res = await axios.get(`http://localhost:5000/api/cart/${cartId}`);
        setCartCount(res.data.length); // set count based on number of items
      } catch (err) {
        console.error("Error fetching cart count:", err);
      }
    };

    fetchCartCount();
  }, []);

  const handleOpenModal = () => {
    setShowMobileDropdown(false); // hide dropdown
    setShowModal(true); // open modal
  };
  
  // const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setShowOTPModal(false);
    setPhoneNumber("");
    setOtp("");
  };

  const handleContinue = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert(`Your OTP is: ${data.otp}`);
        setShowOTPModal(true);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };
  
  const handleVerifyOTP = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber, otp }),
      });
  
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("userId", data.userId);
        setIsLoggedIn(true); // ✅ update login state
        alert("Login successful!");
        handleCloseModal();
      }
       else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error verifying OTP");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setShowMobileDropdown(false); // hide dropdown
    setIsLoggedIn(false); // ✅ update state
    navigate("/"); // or wherever you want after logout
  };

  
  // Search functionality
  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/products/?search=${query}`);
        // setSearchResults(response.data);

        const filteredResults = response.data.filter(product =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredResults);

        // Pass search results to parent component
        if (onSearch) {
          onSearch(response.data, query);
        }
      } catch (error) {
        console.error("Error searching products:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]);
      // Reset search in parent component
      if (onSearch) {
        onSearch([], "");
      }
    }
  };

  // Close search box and clear results
  const handleCloseSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    if (onSearch) {
      onSearch([], "");
    }
  };

  // Navigate to product details
  const handleProductClick = (product) => {
    navigate("/productdetails", { state: { product } });
    handleCloseSearch();
  };

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
    <>
      <div className={`container ${showSearchResults ? 'search-active' : ''}`}>
        <div className="top-banner"></div>
        {/* Search Box and Results */}
        {searchOpen && (
          <div className="search-container">
            <div className="search-box">

              <input
                type="text"
                placeholder="Search products..."
                className="search-input"
                value={searchQuery}
                onChange={handleSearch}
                autoFocus
              />

              <button className="close-btn2" onClick={handleCloseSearch}>✖</button>
            </div>

            {loading && <div className="search-loading">Loading...</div>}

            {searchQuery && searchResults.length > 0 && (
              <div className="search-results">
                <div className="search-results-grid">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="search-product-card"
                      onClick={() => handleProductClick(product)}
                    >
                      {product.tag && <span className="tag">{product.tag}</span>}
                      <img
                        src={`http://localhost:5000/uploads/${product.image}`}
                        alt={product.title}
                        className="search-product-image"
                      />
                      <h3 className="search-product-name">{product.title}</h3>
                      {product.stock ? (
                        <div className="search-price-cart-container">
                          <div className="price-container1">
                            <span className="price2">₹{product.originalRate}</span>
                            <span className="old-price1">₹{product.oldRate}</span>
                          </div>
                          <button className="add-to-cart">ADD TO CART</button>
                        </div>
                      ) : (
                        <p className="unavailable">Currently unavailable.</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {searchQuery && searchResults.length === 0 && !loading && (
              <div className="no-results">No products found matching "{searchQuery}"</div>
            )}
          </div>
        )}
        <header className="mobileheader">
          {/* Left side - Logo */}
          <div className="mobilelogo">
          {logo && (
      <img
        src={`http://localhost:5000/uploads/${logo.image}`}
        alt={logo.title}
       
      />
    )}        
      </div>

          {/* Right side - Icons */}
          <div className="mobileicons">
            <img src={Search} alt="Search" className="mobimg1"onClick={() => navigate("/search", { state: { query: "" } })} />
            <img src={User} alt=" " className="mobimg1" />
            <img src={Arrow} alt=" " className="mobimg2" onClick={() => setShowMobileDropdown(!showMobileDropdown)}
 />

            <img src={Cart} alt=" " className="mobimg1" onClick={() => navigate("/cart")} />
            {cartCount > 0 && <span className="cartitemlength">{cartCount}</span>}
            </div>



        </header>

        <header className={`header ${showSearchResults ? 'hidden-on-search' : ''}`}>
          <div className="header-left">
          {logo && (
      <img
        src={`http://localhost:5000/uploads/${logo.image}`}
        alt={logo.title}
       
      />
    )}        
            {/* <img src={logo} alt="Uthayam Protein" className="logo" /> */}
            <h1 className="main-title">
              <span>Fresh, Safe, Quality</span><br />
              <span>Chicken Meat</span>
            </h1>
            <p className="sub-text">Food that matters – to you, to farmers, and to the planet we all share.</p>
          </div>

          <div className="header-right">
            <nav className={`nav ${mobileMenu ? 'mobile-active' : ''}`}>
              {/* Search Icon */}
              <span className="nav-item" onClick={() => navigate("/search", { state: { query: "" } })}>
                <img src={Search} alt="Search" className="navimage" />
                Search
              </span>


              {isLoggedIn ? (
<span className="nav-item" onClick={() => setShowLogoutConfirm(true)}>
    <img src={User} alt="" className="navimage" />
    <p>Logout</p>
    <img src={Arrow} className="navimage2" alt="" />
  </span>
) : (
  <span className="nav-item" onClick={handleOpenModal}>
    <img src={User} alt="" className="navimage" />
    Login
    <img src={Arrow} className="navimage2" alt="" />
  </span>
)}


              {/* <span className="nav-item" onClick={handleOpenModal}>
                <img src={User} alt="" className="navimage" />
                Login
                <img src={Arrow} className="navimage2" alt="" />
              </span> */}

              <Link className="nav-item2" to="/cart" >
                <img src={Cart} className="navimage" alt="" />
                {cartCount > 0 && <span className="cartitemlength">{cartCount}</span>}
                Cart
              </Link>
            </nav>

            {banner && (
        <img
          src={`http://localhost:5000/uploads/${banner.image}`}
          alt={banner.title}
          className="chicken-img"

        />
      )}
            {/* <img src={chickenImage} alt="Chicken Meat" className="chicken-img" /> */}
            
          </div>
        </header>



        <section className={`categories ${showSearchResults ? 'hidden-on-search' : ''}`}>
          <div className="category" onClick={() => navigate("/chicken")} >
            <span className="icon">
              <img className="iconimage" src={Chicken} alt="Chicken" />
            </span>
            <div className="category-text">
              <h3>Chicken</h3>
              <p>Broiler & Natukoli</p>
            </div>
          </div>

          <div className="category" onClick={() => navigate("/egg")}>
            <span className="icon">
              <img className="iconimage" src={Egg} alt="Egg" />
            </span>
            <div className="category-text">
              <h3>Egg</h3>
              <p>Broiler & Natukoli</p>
            </div>
          </div>

          <div className="category" onClick={() => navigate("/kadai")}>
            <span className="icon">
              <img className="iconimage" src={Kadai} alt="Kadai" />
            </span>
            <div className="category-text">
              <h3>Kadai</h3>
              <p>Meat & Egg</p>
            </div>
          </div>
          {/* Modal Popup */}
          {showModal && (
            <div className="modal-overlay1">
              <div className="modal-content1">
                <button className="modal-close1" onClick={handleCloseModal}>✖</button>

                {!showOTPModal ? (
                  <>
                    <h2 className="modal-title1">Login or Signup to Continue Shopping</h2>
                    <div className="modal-input-wrapper1">
                      <label className="modal-label1">PHONE NUMBER</label>
                      <div className="modal-input-container1">
                        <span className="modal-country-code1">IN +91</span>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          className="modal-input1"
                          maxLength="10"
                          value={phoneNumber}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) {
                              setPhoneNumber(value);
                            }
                          }}
                        />
                      </div>
                    </div>
                    <button
                      className="modal-button1"
                      onClick={handleContinue}
                      disabled={phoneNumber.length !== 10}
                      style={{ opacity: phoneNumber.length === 10 ? 1 : 0.5 }}
                    >
                      CONTINUE
                    </button>

                    <p className="modal-footer1">By clicking, I accept the Terms and Conditions & Privacy Policy</p>
                  </>
                ) : (
                  <>
                    <p className="modal-text1">Enter OTP sent to <strong>{phoneNumber}</strong></p>
                    <button className="modal-change-number1" onClick={() => setShowOTPModal(false)}>CHANGE NUMBER</button>
                    <div className="modal-otp-input-container1">
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        className="modal-input1"
                        maxLength="6"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </div>
                    <button
                      className="modal-button1"
                      onClick={handleVerifyOTP}
                      disabled={otp.length !== 6}
                      style={{ opacity: otp.length === 6 ? 1 : 0.5 }}
                    >
                      VERIFY OTP
                    </button>

                    <p className="modal-footer1">By clicking, I accept the Terms and Conditions & Privacy Policy</p>

                  </>
                )}
              </div>
            </div>
          )}

{windowWidth <= 768 && showMobileDropdown && (
  <div className="mobile-dropdown2">
    {isLoggedIn ? (
      <span onClick={handleLogout} className="dropdown-item">Logout</span>
    ) : (
      
      <span onClick={handleOpenModal} className="dropdown-item">Login</span>
    )}
  </div>
)}

{showLogoutConfirm && (
  <div className="logout-modal-overlay">
    <div className="logout-modal-content">
      <h2>Are you sure you want to logout?</h2>
      <div className="logout-modal-actions">
        <button
          className="logout-confirm-btn"
          onClick={() => {
            localStorage.removeItem("userId");
            setIsLoggedIn(false);
            setShowLogoutConfirm(false);
            navigate("/");
          }}
        >
          Logout
        </button>
        <button
          className="logout-cancel-btn"
          onClick={() => setShowLogoutConfirm(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

        </section>

        {!showSearchResults && (
          <>
            <About />
            <Products />
            <Quality />
            <Testimonials />
          </>

        )}
      </div>

    </>
  );
};

export default Banner;