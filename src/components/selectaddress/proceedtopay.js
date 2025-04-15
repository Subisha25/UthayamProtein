import React, { useState } from "react";
import "./selectaddress.css"; // Import the CSS file
import Icon from '../assets/material-symbols_add-notes-outline-rounded.png';
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import { useCart } from '../context/cartContext';

const ProceedtoPay = () => {
  const { cartItems, removeFromCart } = useCart();
  const location = useLocation();
  const { selectedAddress } = location.state || {};
    const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const itemsToDisplay = location.state?.itemsToShow || cartItems;

  const DELIVERY_CHARGE = 30;
  const GST_CHARGE = 50;
  // const itemsToDisplay = itemsFromState || cartItems;

  const itemTotal = itemsToDisplay.reduce((total, item) => {
    const quantity = item.quantity || 1;
    return total + (item.originalRate * quantity);
  }, 0);
  
  const totalToPay = itemTotal + DELIVERY_CHARGE + GST_CHARGE;

  return (
    <>
      <Navbar />
      <div className="selectadd-container">
        {/* Left Side - Product Details, Delivery Address, Payment */}
        <div className="selectadd-left">
          {/* Product Details */}
          <div className="selectadd-section">
            <h2 className="selectadd-title">Product Details</h2>
            <span className="selectadd-view-change" onClick={() => setShowPopup(true)}>View/Change</span>
          </div>

          {/* Delivery Address */}
          <div className="selectadd1-section">
            <div className="selectadd-header">
              <h2 className="selectadd-title">Delivery Address</h2>
              <span className="selectadd-add-new"
                onClick={() => navigate("/deliveryaddress")}
              >ADD NEW ADDRESS</span>
            </div>

            {selectedAddress && (
              <div className="selectadd-address-box">
                <h3 className="selectadd-address-name">{selectedAddress.name} – {selectedAddress.phone}</h3>
                <p className="selectadd-address-text">
                  {selectedAddress.house}, {selectedAddress.area}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
                </p>
              </div>
            )}


            {/* <div className="selectadd-address-box">
            <h3 className="selectadd-address-name">Sivakumar – 9877665433</h3>
            <p className="selectadd-address-text">
              612/2, VOC St, K K Nagar, Tiruchirappalli, Tamil Nadu 620021
            </p>
          </div> */}

          </div>

          {/* Payment Section */}
          <div className="proceedpay2-section">
            <h2 className="selectadd-title">Payment</h2>
            <button
              className="selectadd-proceed-btn"
              // onClick={() => navigate("/paymentoption", { state: { selectedAddress } })}
              onClick={() => navigate("/paymentoption", {
                state: {
                  selectedAddress,
                  itemsToShow: itemsToDisplay
                }
              })}
            >
              Proceed to Pay
            </button>


          </div>
        </div>

        {/* Right Side - Suggestions Box & Price Details */}
        <div className="selectadd-right">
          {/* Suggestions Box */}
          <div className="selectadd-suggestions">
            <img src={Icon} className="selectaddimage" />
            <input
              type="text"
              className="selectadd-suggestion-input"
              placeholder="Write any suggestions"
              disabled={false} // Change to true if you want it disabled
            />
          </div>



          {/* Price Details */}
          <div className="selectadd-price-details">
            <h3 className="selectadd-price-title">Price Details (2 Items)</h3>
            <div className="selectadd-price-row">
              <span>Item Total</span>
              <span>₹{itemTotal}</span>
            </div>
            <div className="selectadd-price-row">
              <span>Delivery Charge</span>
              <span>₹{DELIVERY_CHARGE}</span>
            </div>
            <div className="selectadd-price-row">
              <span>GST Charge</span>
              <span>₹{GST_CHARGE}</span>
            </div>
            <div className="selectadd-total">
              <span>To Pay</span>
              <span>₹{totalToPay}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="popup-close" onClick={() => setShowPopup(false)}>X</button>
            <div className="cart-items2">

              {/* First Product */}

              {itemsToDisplay.map((item, index) => (
  <div className="cart-item2" key={index}>
    <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.title} className="item-image2" />
    <div className="item-details2">
      <h3>{item.title}</h3>
      <div className="price2">
        <p className="current-price2">₹{item.originalRate}</p>
        <p className="old-price2">₹{item.oldRate}</p>
      </div>
      <div className="dropdown-container2">
        <select className="dropdown-select2">
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num} PCS</option>
          ))}
        </select>
        <select className="dropdown-select2">
          {[0, 1, 2, 3].map((num) => (
            <option key={num} value={num}>Add On ({num})</option>
          ))}
        </select>
      </div>
    </div>
  </div>
))}

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProceedtoPay;
