import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../banner/banner.css";
import logo from "../assets/Uthayam_Protein_Logo_PNG 1.png";
import User from "../assets/Vector (1).png";
import Arrow from "../assets/Vector (2).png";
import Cart from "../assets/Vector.png";
import Search from '../assets/iconamoon_search.png';
import { useCart } from '../context/cartContext';


const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  // Search functionality states
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { cartItems } = useCart(); // ✅ Get cart items from context


  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setShowOTPModal(false);
    setPhoneNumber("");
    setOtp("");
  };

  const handleContinue = () => {
    if (phoneNumber.length === 10) {
      setShowOTPModal(true);
    } else {
      alert("Please enter a valid 10-digit phone number.");
    }
  };
  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      alert("OTP Verified Successfully!");
      handleCloseModal();
    } else {
      alert("Please enter a valid 6-digit OTP.");
    }
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

  // Search function
  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/products/?search=${query}`);
        const filteredResults = response.data.filter(product =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredResults);
      } catch (error) {
        console.error("Error searching products:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  // Close search box
  const handleCloseSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  // Navigate to product details
  const handleProductClick = (product) => {
    navigate("/productdetails", { state: { product } });
    handleCloseSearch();
  };

  return (
    <div className="container">
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
        <div className="mobilelogo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="mobileicons">
          <img src={Search} alt="Search" className="mobimg1" onClick={() => navigate("/search", { state: { query: "" } })} />
          <img src={User} alt=" " className="mobimg1" />
          <img src={Arrow} alt=" " className="mobimg2" onClick={handleOpenModal} />
          <img src={Cart} alt=" " className="mobimg1" onClick={() => navigate("/cart")} />
          <span className="cartitemlength">{cartItems.length}</span>
        </div>
      </header>

      <header className="header">
        <div className="header-left">
          <img src={logo} alt="Uthayam Protein" className="logo" />
        </div>

        <div className="header-right">
          <nav className={`nav ${mobileMenu ? 'mobile-active' : ''}`}>
            {/* Search Box Trigger */}
            <span className="nav-item" onClick={() => navigate("/search", { state: { query: "" } })}>
              <img src={Search} alt="Search" className="navimage" />
              Search
            </span>

            <span className="nav-item" onClick={handleOpenModal}>
              <img src={User} alt="" className="navimage" />
              Login
              <img src={Arrow} className="navimage2" alt="" />
            </span>

            <Link className="nav-item2" to="/cart">
              <img src={Cart} className="navimage" alt="" /><span  className="cartitemlength">{cartItems.length}</span>
              Cart
            </Link>
          </nav>
        </div>
      </header>
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
    </div>
  );
};

export default Navbar;
