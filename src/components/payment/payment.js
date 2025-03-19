import React, { useState } from "react";
import "./payment.css";
import Paytm from '../assets/Frame.png';
import Gpay from '../assets/Frame (1).png';
import Phonepay from '../assets/Frame (2).png';
import UPI from '../assets/Frame (3).png';
import { IoIosArrowDown } from "react-icons/io";
import Delivery from '../assets/icon-park-outline_delivery.png';
import { GoArrowLeft } from "react-icons/go";
import Tick from '../assets/tick.png';
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";

const PaymentOption = () => {
  const [selectedPayment, setSelectedPayment] = useState("paytm");
const navigate = useNavigate();

  const paymentOptions = [
    { id: "paytm", label: "Paytm", image: Paytm },
    { id: "gpay", label: "Google Pay", image: Gpay },
    { id: "phonepe", label: "PhonePe", image: Phonepay },
    { id: "upi", label: "Pay with any UPI App", image: UPI },
  ];

  return (
    <>
    <Navbar />
    <div className="payment-container">
      {/* Header */}
      <div className="payment-header">
        <button className="back-btn"><GoArrowLeft /></button>
        <h2>Payment Option</h2>
      </div>

      <div className="payment-box">
        {/* Amount Section */}
        <div className="payment-amount">
            <div className="payment2">
          <span>₹700</span>
          <span className="pay-online">Pay Online</span>
          </div>
          <span className="selected-indicator">✔</span>
        </div>

        {/* Payment Methods */}
        <div className="pay-section">
          <h3>Pay by any UPI app</h3>
          <div className="pay-options">
            {paymentOptions.map(({ id, label, image }) => (
              <div
                key={id}
                className={`pay-item ${selectedPayment === id ? "selected" : ""}`}
                onClick={() => setSelectedPayment(id)}
              >
                <div className="pay-icon-container">
                  <img src={image} alt={label} className="pay-icon" />
                </div>
                <span className="pay-label">{label}</span>
                <span className={`radio-btn ${selectedPayment === id ? "checked" : ""}`}></span>
              </div>
            ))}
          </div>

          <div className="pay-items">
            <h3>Wallet </h3>
          <p>PhonePe, Amazon Pay and more</p>
          </div>
          <div className="pay-items">
            <h3>Debit/Credit Card</h3>
           <p>Save and Pay via Cards</p>
           </div>
          <div className="pay-items1">
            <h3>Net Banking</h3>
             <p>Select from a list of banks</p>
             </div>
        </div>
      </div>

      {/* Price Details */}
     {/* Price Details */}
<div className="price-section">
  <div className="price-header">
    <h3>Price Details (2 Items)</h3>
    <span className="dropdown-icon"><IoIosArrowDown /> </span>
  </div>
  
  <div className="delivery-address">
    <div className="address-header">
       
       <div className="delivery"> 
        <img src={Delivery} />
      <h4>Deliver to</h4>
      </div>
      <span className="change-btn">Change</span>
    </div>
    
    <div>
    <p>Sivakumar - 9877665433 <br/>
   
    <span className="spanpay">612/2, VOC St, K K Nagar, Tiruchirappalli, Tamil Nadu 620021</span></p>
    </div>
  </div>
</div>

      {/* Footer */}
      <div className="payment-footer">
  <div className="paymentprice-details">
    <span className="amount">₹700</span><br/>
    <p className="detailed-bill">View Detailed Bill</p>
  </div>
  <button className="pay-now-btn"  onClick={() => navigate("/orderconfirmation")}>PAY NOW</button>
</div>
    </div>
    </>
  );
};

export default PaymentOption;
