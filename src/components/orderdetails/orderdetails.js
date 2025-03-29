import React, { useState } from "react";
import "./orderdetails.css";
import productimage from "../cart/images/product1.png";
import { FaRegFileAlt } from "react-icons/fa";
import Delivery from '../assets/icon-park-outline_delivery.png';
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";


const OrderDetails = () => {
  const [quantity, setQuantity] = useState(5);
  const [addon, setAddon] = useState(2);
  const navigate = useNavigate();

  return (
    <>
    <Navbar />
    <div className="cart-container2">

        <div className="left2">
      <header className="cart-header2">
        {/* <span className="back-arrow2"  onClick={() => navigate(-1)}>←</span> */}
         Order Details
      </header>

      {/* <div className="delivery-info2">2 Items – Delivery within 40 - 45 mins</div> */}

      <div className="cart-items2">
        {/* First Product */}
        <div className="cart-item2">
          <img src={productimage} alt="Chicken Drumstick" className="item-image2" />
          <div className="item-details2">
            <h3>Chicken Drumstick Sampler Pack - 5 Pcs</h3>
            <div className="price2">
              <p className="current-price2">₹260</p>
              <p className="old-price2">₹300</p>
            </div>
            <div className="dropdown-container2">
              <select className="dropdown-select2" value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} PCS
                  </option>
                ))}
              </select>
              <select className="dropdown-select2" value={addon} onChange={(e) => setAddon(e.target.value)}>
                {[0, 1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    Add On ({num})
                  </option>
                ))}
              </select>
               {/* Custom Red Arrow */}
      {/* <div className="custom-arrow2"></div> */}
            </div>
<p className="removep">REMOVE</p>
          </div>
          
        </div>


        <div className="cart-item2">
          <img src={productimage} alt="Chicken Drumstick" className="item-image2" />
          <div className="item-details2">
            <h3>Chicken Drumstick Sampler Pack - 5 Pcs</h3>
            <div className="price2">
              <p className="current-price2">₹260</p>
              <p className="old-price2">₹300</p>
            </div>
            <div className="dropdown-container2">
              <select className="dropdown-select2" value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} PCS
                  </option>
                ))}
              </select>
              <select className="dropdown-select2" value={addon} onChange={(e) => setAddon(e.target.value)}>
                {[0, 1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    Add On ({num})
                  </option>
                ))}
              </select>
            </div>
            <p className="removep">REMOVE</p>
          </div>
        </div>
      </div>
      <button className="cartpay-now-btn2"  onClick={() => navigate("/selectaddress")}>Continue to Select Delivery address</button>

      </div>

      <div className="right2">
      <div className="suggestion-container2">
        <FaRegFileAlt className="suggestion-icon2" />
        <textarea placeholder="Write any suggestions" className="suggestion-input2" />
      </div>

      <div className="price-details2">
        <h3>Price Details (2 Items)</h3>
        <div className="price-row2">
          <p>Item Total</p>
          <p>₹620</p>
        </div>
        <div className="price-row2">
          <p>Delivery Charge</p>
          <p>₹30</p>
        </div>
        <div className="price-row2">
          <p>GST Charge</p>
          <p>₹50</p>
        </div>
        {/* <hr /> */}
        <div className="total-amount2">
          <p>To Pay</p>
          <p>₹700</p>
        </div>
        {/* <hr /> */}
      </div>
      {/* <div className="cartdelivery-address2">
    <div className="cartaddress-header2">
       
       <div className="cartdelivery2"> 
        <img src={Delivery} />
      <h4>Deliver to</h4>
      </div>
      <span className="cartchange-btn2">Change</span>
    </div>
    
    <div>
    <p>Sivakumar - 9877665433 <br/>
   
    <span className="cartspanpay2">612/2, VOC St, K K Nagar, Tiruchirappalli, Tamil Nadu 620021</span></p>
    </div>
  </div> */}
{/* 
  <div className="cartpayment-footer2">
  <div className="cartprice-details2">
    <span className="cartamount2">₹700</span>
    <span className="cartdetailed-bill2">View Detailed Bill</span>
  </div>
  <button className="cartpay-now-btn2"  onClick={() => navigate("/paymentoption")}>MAKE PAYMENT</button>
</div> */}

</div>
<button className="cartpay-now-btn3"  onClick={() => navigate("/selectaddress")}>Continue to Select Delivery address</button>

      {/* <button className="delivery-button">ADD DELIVERY ADDRESS</button> */}
    </div>
    </>
  );
};

export default OrderDetails;
