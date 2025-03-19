import React from "react";
import "./deliveryAddress.css";
import { FaArrowLeft } from "react-icons/fa";
import location_icon from "./images/duo-icons_location.png";
import contact_icon from "./images/Vector.png";
import { MdMyLocation } from "react-icons/md";

const DeliveryAddress = () => {
  return (
    <div className="cart-container">
      <div className="container">
        {/* Header */}
        <header className="cart-header">
          <span className="back-arrow">
            <FaArrowLeft />
          </span>
          Add Delivery Address
        </header>

        {/* Address Details Section */}
        <div className="section">
          <div className="address">
            <img src={location_icon} alt="location_icon" className="location-img" />
            Address Details
          </div>
          <button className="location-btn">
            <span className="icon">
              <MdMyLocation />
            </span>
            Use My Location
          </button>

          <div className="input-field">
            <input type="text" placeholder="HOUSE NO / FLAT NO / BUILDING NAME" />
            <input type="text" placeholder="AREA / ROAD / COLONY NAME" />
            <input type="text" placeholder="PINCODE" />
            <div className="city-state">
              <input type="text" placeholder="CITY" />
              <input type="text" placeholder="STATE" />
            </div>
            <input type="text" placeholder="LANDMARK" />
          </div>
        </div>

        {/* Contact Person Section */}
        <div className="section contact">
          <div className="section-title">
            <img src={contact_icon} alt="contact_icon" className="contact_icon" />
            Contact Person
          </div>
          <input type="text" placeholder="NAME" />
          <input type="text" placeholder="PHONE NUMBER" />
        </div>

        {/* Save Address Button */}
        <button className="save-btn">SAVE DELIVERY ADDRESS AND CONTINUE</button>
      </div>
    </div>
  );
};

export default DeliveryAddress;
