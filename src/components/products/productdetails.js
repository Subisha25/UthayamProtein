import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import Recommendedproducts from "./recommendedproducts";
import "../products/productdetails.css";
import thumb1 from "../products/images/Mask group (1).png";
import thumb2 from "../products/images/Mask group (2).png";
import thumb3 from "../products/images/Mask group (3).png";


const ProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedProduct = location.state?.product;
  const [activeTab, setActiveTab] = useState("Details");
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState("");
  const selectedProducts = {
    image: "images/main.jpg",
    thumbnailImages: [thumb1, thumb2, thumb3] // Use imported images

  };
  const handleBuyNowClick = () => {
    setShowModal(true);
  };


  const handleCloseModal = () => {
    setShowModal(false);
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


  if (!selectedProduct) {
    navigate("/");
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="product-container">
        {/* Product Image Gallery */}
        <div className="image-gallery-wrapper">
          <div className="image-gallery">
            {/* Main Image (Centered) */}
            <div className="main-image-container">
              <img
                src={`http://localhost:5000/uploads/${selectedProduct.image}`}
                alt={selectedProduct.name}
                className="main-image1"
              />
            </div>

            {/* Thumbnails (Aligned to the Left) */}
            <div className="thumbnail-container">
              {selectedProducts.thumbnailImages.map((thumbnail, index) => (
                <img
                  key={index}
                  src={thumbnail}
                  alt="thumbnail"
                  className="thumbnail"
                />
              ))}
            </div>
          </div>
          {/* Add to Cart & Buy Now Buttons */}
          <div className="button-container">
            <button className="add-to-cart-btn">ADD TO CART</button>
            <button className="buy-now-btn" onClick={handleBuyNowClick}>BUY IT NOW</button>
          </div>


        </div>




        {/* Product Details */}
        <div className="product-details">

          <h2 className="product-title">{selectedProduct.title}</h2>
          <div className="price-container">
            <span className="price1">₹{selectedProduct.originalRate}</span>
            <span className="old-price">₹{selectedProduct.oldRate}</span>
          </div>
          {selectedProduct.tag && <div className="offer-tag">Limited time Offer</div>}
          <p className="stock-status">In Stock</p>

          <label className="dropdown-label">Pieces</label>
          <select className="dropdown">
            <option>5 PCS</option>
            <option>10 PCS</option>
            <option>15 PCS</option>
          </select>

          <label className="dropdown-label">Bought together (Optional)</label>
          <select className="dropdown1">
            <option>Select your Add On</option>
            <option>Spices</option>
            <option>Marination</option>
          </select>
          {/* Mobile Buttons (below dropdowns) */}
          <div className="mobile-button-container">
            <button className="add-to-cart-btn">ADD TO CART</button>
            <button className="buy-now-btn" onClick={handleBuyNowClick}>BUY IT NOW</button>
          </div>

          {showModal && (
            <div className="modal-overlay">
              {!showOTPModal ? (
                <div className="modal-content">
                  <button className="modal-close" onClick={handleCloseModal}>✖</button>
                  <h2 className="modal-title">Login or Signup to Continue Shopping</h2>

                  <div className="modal-input-wrapper">
                    <label className="modal-label">PHONE NUMBER</label>
                    <div className="modal-input-container">
                      <span className="modal-country-code">IN +91</span>
                      <input
                        type="text"
                        className="modal-input"
                        maxLength="10"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                  </div>

                  <button className="modal-button" onClick={handleContinue}>CONTINUE</button>
                  <p className="modal-footer">By clicking, I accept the Terms and Conditions & Privacy Policy</p>
                </div>
              ) : (
                <div className="modal-content">
                  <button className="modal-close" onClick={handleCloseModal}>✖</button>
                  <p className="modal-text">Enter OTP sent to <strong>{phoneNumber}</strong></p>

                  <button className="modal-change-number" onClick={() => setShowOTPModal(false)}>CHANGE NUMBER</button>

                  <div className="modal-otp-input-container">
                    <input
                      type="text"
                      className="modal-input"
                      maxLength="6"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>

                  <button className="modal-button" onClick={handleVerifyOTP}>VERIFY OTP</button>
                </div>
              )}
            </div>
          )}

          {/* Tabs for Details and Reviews */}
          <div className="tab-container">
            <span
              className={activeTab === "Details" ? "tab active" : "tab"}
              onClick={() => setActiveTab("Details")}
            >
              Details
            </span>
            <span
              className={activeTab === "Reviews" ? "tab active" : "tab"}
              onClick={() => setActiveTab("Reviews")}
            >
              Reviews
            </span>
          </div>
          <div className="product-description">
            {activeTab === "Details" ? (
              <p>
                I bought meat at their shop. They provide fresh, organic meat
                sourced from their farm.
              </p>
            ) : (
              <p>
                The quality is excellent! Fresh, organic, and tastes amazing.
                Organic meat sourced from their farm.
              </p>
            )}
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
      <Recommendedproducts />
    </>
  );
};

export default ProductDetails;
