import React, { useState } from "react";
import "../orderdetails/orderdetails.css";
import { FaRegFileAlt } from "react-icons/fa";
import Delivery from '../assets/icon-park-outline_delivery.png';
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import { useCart } from '../context/cartContext';
import Products from "../products/products";


const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  const [quantity, setQuantity] = useState(5);
  const [addon, setAddon] = useState(2);
  const navigate = useNavigate();
  const DELIVERY_CHARGE = 30;
  const GST_CHARGE = 50;

  // Calculate total from cartItems
const itemTotal = cartItems.reduce((total, item) => {
  const quantity = item.quantity || 1;
  return total + (item.originalRate * quantity);
}, 0);

const totalToPay = itemTotal + DELIVERY_CHARGE + GST_CHARGE;



  return (
    <>
    <Navbar />
   
    <div className="cart-container2">

        <div className="left2">
      <header className="cart-header2">
         Cart Details
      </header>


      <div className="cart-items2">
     

{cartItems.map((item, index) => (
        <div className="cart-item2" key={index}>
          <img src={item.image} alt={item.title} className="item-image2" />

<div className="item-details2">
            <h3>{item.title}</h3>
            <div className="price2">
              <p className="current-price2">₹{item.originalRate}</p>
              <p className="old-price2">₹{item.oldRate}</p>
            </div>
            <div className="dropdown-container2">
              <select className="dropdown-select2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} PCS
                  </option>
                ))}
              </select>
              <select className="dropdown-select2">
                {[0, 1, 2, 3].map((num) => (
                  <option key={num} value={num}>
                    Add On ({num})
                  </option>
                ))}
              </select>
            </div>
            <p className="removep" onClick={() => removeFromCart(item.id)}>REMOVE</p>
          </div>
        </div>
      ))}
      </div>
      <button className="cartpay-now-btn2" 
       onClick={() => navigate("/selectaddress", { state: { itemsToShow: cartItems } })}>Continue to Select Delivery address</button>

      </div>

      <div className="right2">
      <div className="suggestion-container2">
        <FaRegFileAlt className="suggestion-icon2" />
        <textarea placeholder="Write any suggestions" className="suggestion-input2" />
      </div>

      <div className="price-details2">
        <h3>Price Details ({cartItems.length} Items)</h3>

        <div className="price-row2">
          <p>Item Total</p>
          <p>₹{itemTotal}</p>
          </div>
        <div className="price-row2">
          <p>Delivery Charge</p>
          <p>₹{DELIVERY_CHARGE}</p>
          </div>
        <div className="price-row2">
          <p>GST Charge</p>
          <p>₹{GST_CHARGE}</p>
          </div>
        {/* <hr /> */}
        <div className="total-amount2">
          <p>To Pay</p>
          <p>₹{totalToPay}</p>
          </div>
        {/* <hr /> */}
      </div>
    
</div>
<button className="cartpay-now-btn3" 
 onClick={() => navigate("/selectaddress")}>Continue to Select Delivery address</button>

    </div>
    </>
  );
};

export default Cart;
