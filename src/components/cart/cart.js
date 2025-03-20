import React, { useState } from "react";
import "./style.css";
import productimage from "./images/product1.png";
import { FaRegFileAlt } from "react-icons/fa";
import Delivery from '../assets/icon-park-outline_delivery.png';
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";


const Cart = () => {
  const [quantity, setQuantity] = useState(5);
  const [addon, setAddon] = useState(2);
  const navigate = useNavigate();

  return (
    <>
    <Navbar />
    <div className="cart-container">
      <header className="cart-header">
        <span className="back-arrow"  onClick={() => navigate(-1)}>←</span> Cart
      </header>

      <div className="delivery-info">2 Items – Delivery within 40 - 45 mins</div>

      <div className="cart-items">
        {/* First Product */}
        <div className="cart-item">
          <img src={productimage} alt="Chicken Drumstick" className="item-image" />
          <div className="item-details">
            <h3>Chicken Drumstick Sampler...</h3>
            <div className="price">
              <p className="current-price">₹260</p>
              <p className="old-price">₹300</p>
            </div>
            <div className="dropdown-container">
              <select className="dropdown-select" value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} PCS
                  </option>
                ))}
              </select>
              <select className="dropdown-select" value={addon} onChange={(e) => setAddon(e.target.value)}>
                {[0, 1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    Add On ({num})
                  </option>
                ))}
              </select>
               {/* Custom Red Arrow */}
      <div className="custom-arrow"></div>
            </div>
          </div>
        </div>
        <div className="cart-item">
          <img src={productimage} alt="Chicken Drumstick" className="item-image" />
          <div className="item-details">
            <h3>Chicken Drumstick Sampler...</h3>
            <div className="price">
              <p className="current-price">₹260</p>
              <p className="old-price">₹300</p>
            </div>
            <div className="dropdown-container">
              <select className="dropdown-select" value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} PCS
                  </option>
                ))}
              </select>
              <select className="dropdown-select" value={addon} onChange={(e) => setAddon(e.target.value)}>
                {[0, 1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    Add On ({num})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="suggestion-container">
        <FaRegFileAlt className="suggestion-icon" />
        <textarea placeholder="Write any suggestions" className="suggestion-input" />
      </div>

      <div className="price-details">
        <h3>Price Details (2 Items)</h3>
        <div className="price-row">
          <p>Item Total</p>
          <p>₹620</p>
        </div>
        <div className="price-row">
          <p>Delivery Charge</p>
          <p>₹30</p>
        </div>
        <div className="price-row">
          <p>GST Charge</p>
          <p>₹50</p>
        </div>
        {/* <hr /> */}
        <div className="total-amount">
          <p>To Pay</p>
          <p>₹700</p>
        </div>
        {/* <hr /> */}
      </div>
      <div className="cartdelivery-address">
    <div className="cartaddress-header">
       
       <div className="cartdelivery"> 
        <img src={Delivery} />
      <h4>Deliver to</h4>
      </div>
      <span className="cartchange-btn">Change</span>
    </div>
    
    <div>
    <p>Sivakumar - 9877665433 <br/>
   
    <span className="cartspanpay">612/2, VOC St, K K Nagar, Tiruchirappalli, Tamil Nadu 620021</span></p>
    </div>
  </div>

  <div className="cartpayment-footer">
  <div className="cartprice-details">
    <span className="cartamount">₹700</span>
    <span className="cartdetailed-bill">View Detailed Bill</span>
  </div>
  <button className="cartpay-now-btn"  onClick={() => navigate("/paymentoption")}>MAKE PAYMENT</button>
</div>
      {/* <button className="delivery-button">ADD DELIVERY ADDRESS</button> */}
    </div>
    </>
  );
};

export default Cart;
