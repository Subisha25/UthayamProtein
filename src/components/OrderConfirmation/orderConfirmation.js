import React from "react";
import "./orderConfirmation.css";
import Tick from '../assets/solar_verified-check-bold.png';
const OrderConfirmation = () => {
  return (
    <div className="order-container">
      <div className="order-content">
        <div className="order-icon">
            <img src={Tick}  className="orderimage"/>
        </div>
        <h2>Order Confirmed!</h2>
        <p>Your order is being prepared..</p>
        <p>Estimated time of arrival 40-45 mins</p>
      </div>
    </div>
  );
};

export default OrderConfirmation;
