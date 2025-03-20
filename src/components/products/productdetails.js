import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../products/productdetails.css";
import image1 from "../products/images/Mask group (1).png";
import image2 from "../products/images/Mask group (2).png";
import image3 from "../products/images/Mask group (3).png";
import image4 from "../products/images/Mask group (4).png";
import image5 from "../products/images/Mask group (5).png";
import image6 from "../products/images/Mask group (6).png";
import { useState } from "react";
import Testimonials from "../testimonials/testimonials";
import Navbar from "../navbar/navbar";

const products = [
  {
    id: 1,
    name: "Chicken Drumstick Sampler Pack – 5 Pcs",
    price: "₹260",
    originalPrice: "₹300",
    image: image1,
    tag: "Limited time Offer",
    available: true,
  },
  {
    id: 2,
    name: "Roast Chicken",
    price: "",
    originalPrice: "",
    image: image2,
    available: false,
  },
  {
    id: 3,
    name: "Chicken Chunks",
    price: "₹250",
    originalPrice: "₹290",
    image: image3,
    tag: "Popular",
    available: true,
  },
  {
    id: 4,
    name: "Egg (Nattukoli) – 10 Ns",
    price: "₹150",
    originalPrice: "₹180",
    image: image4,
    available: true,
  },
  {
    id: 5,
    name: "Chicken Leg – 1 KG",
    price: "₹220",
    originalPrice: "₹190",
    image: image5,
    available: true,
  },
  {
    id: 6,
    name: "Whole Chicken Roaster (Without Skin)",
    price: "₹250",
    originalPrice: "₹280",
    image: image6,
    available: true,
  },
];

const ProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedProduct = location.state?.product;
  const [activeTab, setActiveTab] = useState("Details");
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(""); // Store phone number
  const [showOTPModal, setShowOTPModal] = useState(false); // OTP modal state
  const [otp, setOtp] = useState("");

  const handleContinue = () => {
    if (phoneNumber.trim().length === 10) {
      setShowOTPModal(true); // Show OTP modal
    }
  };
  const handleBuyNowClick = () => {
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }
  
    // Close modals and navigate to the delivery page
    setShowModal(false);
    setShowOTPModal(false);
    navigate("/deliveryaddress");
  };
  
  // If no product is passed, navigate back to the product list
  if (!selectedProduct) {
    navigate("/");
    return null;
  }

  // Filter out the selected product to show only recommended ones
  const recommendedProducts = products.filter(
    (product) => product.id !== selectedProduct.id
  );

  return (
    <>
    <Navbar />
    <div className="product-container">
      {/* Selected Product */}
      <img
        src={selectedProduct.image}
        alt={selectedProduct.name}
        className="product-image"
      />
<h2 className="product-title">
  {selectedProduct.name.includes("Chicken Drumstick") ? (
    <>
      Chicken Drumstick <br />
      {selectedProduct.name.replace("Chicken Drumstick", "").trim()}
    </>
  ) : (
    selectedProduct.name
  )}
</h2>
      <div className="price-container">
        <span className="price1">{selectedProduct.price}</span>
        <span className="old-price">{selectedProduct.originalPrice}</span>
      </div>
      {selectedProduct.tag && <div className="offer-tag">{selectedProduct.tag}</div>}
      <p className="stock-status1">{selectedProduct.available ? "In Stock" : "Out of Stock"}</p>
      <p className="delivery-info1">
        Fast delivery - <span className="highlight">Order within 30 mins</span>
      </p>

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

      <div className="button-container">
        <button className="add-to-cart1">ADD TO CART</button>
        <button className="buy-now" onClick={handleBuyNowClick}>BUY IT NOW</button>
        </div>
        {/* {showModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <button className="modal-close" onClick={handleCloseModal}>✖</button>
      <h2 className="modal-title">Login or Signup to <br/> Continue Shopping</h2>
      <div className="modal-input-wrapper">
  <label className="modal-label">PHONE NUMBER</label>
      <div className="modal-input-container">
  <span className="modal-country-code">IN +91</span>
  <input type="text"  className="modal-input" />
</div>      
</div>

      <button className="modal-button">CONTINUE</button>

      <p className="modal-footer">
        By clicking, I accept the Terms and <br/> Conditions & Privacy Policy
      </p>
    </div>
  </div>
)} */}



{showModal && (
  <div className="modal-overlay">
    {!showOTPModal ? (
      // First Modal (Phone Number Input)
      <div className="modal-content">
        <button className="modal-close" onClick={handleCloseModal}>✖</button>
        <h2 className="modal-title">Login or Signup to <br/> Continue Shopping</h2>

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

        <p className="modal-footer">
          By clicking, I accept the Terms and <br /> Conditions & Privacy Policy
        </p>
      </div>
    ) : (
      // Second Modal (OTP Verification)
      <div className="modal-content">
        <button className="modal-close" onClick={handleCloseModal}>✖</button>
        <p className="modal-text">
          Enter OTP sent to <strong>{phoneNumber}</strong>
        </p>

        <button className="modal-change-number" onClick={() => setShowOTPModal(false)}>
          CHANGE NUMBER
        </button>

        <div className="modal-otp-input-container">
        <input
  type="text"
  className="modal-otp-input" 
  value={otp}
  onChange={(e) => {
    const inputVal = e.target.value.replace(/\D/g, "").slice(0, 6); // Only numbers, max 6 digits
    setOtp(inputVal);
  }}
  maxLength={6} // Ensures max 6 digits
  pattern="[0-9]*" // Only numbers allowed
  inputMode="numeric" // Mobile keyboard shows numbers
 
/>
        </div>
        <div>
    {/* <input
      type="text"
      value={otp}
      onChange={(e) => setOtp(e.target.value.slice(0, 6))} // Restrict to 6 digits
      maxLength={6}
    /> */}


    <button className="modal-button" onClick={handleVerifyOTP}>
      VERIFY AND CONTINUE
    </button>
  </div>
        <p className="modal-footer">
          By clicking, I accept the Terms and <br /> Conditions & Privacy Policy
        </p>
      </div>
    )}
  </div>
)}


      <div className="tab-container">
      <span
        className={`tab ${activeTab === "Details" ? "active" : ""}`}
        onClick={() => setActiveTab("Details")}
      >
        Details
      </span>
      <span
        className={`tab ${activeTab === "Reviews" ? "active" : ""}`}
        onClick={() => setActiveTab("Reviews")}
      >
        Reviews
      </span>
    </div>

      <div className="product-description">
        <p>
          I bought meat at their shop. And I saw they provide meat with honesty
          and their meat totally comes from their own farm in a natural and
          organic way.
        </p>
      </div>

      {/* Recommended Products */}
      <h2 className="section-title1">Recommended Products</h2>
      <div className="product-grid1">
        {recommendedProducts.map((product) => (
          <div key={product.id} className="product-card">
            {product.tag && <span className="tag">{product.tag}</span>}
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
              onClick={() => navigate("/productdetails", { state: { product } })}
              style={{ cursor: "pointer" }}
            />
            <h3 className="product-name">{product.name}</h3>

            {product.available ? (
              <div className="price-cart-container">
                <p className="price">
                  {product.price} <span className="original-price">{product.originalPrice}</span>
                </p>
                <button className="add-to-cart">ADD TO CART</button>
              </div>
            ) : (
              <p className="unavailable">Currently unavailable.</p>
            )}
          </div>
        ))}
      </div>
    </div>
    <Testimonials/>
    </>
  );
};

export default ProductDetails;
