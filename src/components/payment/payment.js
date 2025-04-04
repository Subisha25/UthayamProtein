import React, { useState } from "react";
import "./payment.css";
import productimage from "../cart/images/product1.png";
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
import File from '../assets/material-symbols_add-notes-outline-rounded.png';
// import Tick from '../assets/tick.png';
const PaymentOption = () => {
    const [quantity, setQuantity] = useState(5);
      const [addon, setAddon] = useState(2);
  const [selectedPayment, setSelectedPayment] = useState("paytm");
const navigate = useNavigate();
const [showPopup, setShowPopup] = useState(false); // State for popup visibility

  const paymentOptions = [
    { id: "paytm", label: "Paytm", image: Paytm },
    { id: "gpay", label: "Google Pay", image: Gpay },
    { id: "phonepe", label: "PhonePe", image: Phonepay },
    { id: "upi", label: "Pay with any UPI App", image: UPI },
  ];

  return (
    <>

    <Navbar />

    {/* desktop section */}
    <div className="pay2container">
      <div className="pay2left">
        <div className="pay2box">
          <div className="pay2header">
            <h3 className="pay2title">Product Details</h3>
            <span className="pay2change" 
             onClick={() => setShowPopup(true)}>View/Change</span>
          </div>

          <div className="pay2section">
          <div className="pay2amount">
            <h3>₹700</h3>
            <span>Pay Online</span>
            <span className="pay2tick">
              <img  src={Tick} alt="tick" /></span>
          </div>
          <div className="pay2options">
            <p>Pay by any UPI app</p>
            <div className="pay2paysect" >
            <div className="pay2upi">
              <img className="paytmimg" src={Paytm} alt="Paytm" />
              <img className="payimg" src={Gpay} alt="GPay" />
              <img className="payimg" src={Phonepay} alt="PhonePe" />
            </div>
            <button className="pay2qr">View QR Code</button>
            </div>
            <p className="pay2addupi">+ADD UPI ID</p>
          </div>
          <div className="pay2methods">
            <div className="pay2method">
              <h3>Wallet </h3>
            <p>PhonePe, Amazon Pay and more</p>
            </div>

            <div className="pay2method">
           <h3>Debit/Credit Card</h3>
           <p>Save and Pay via Cards</p>              
           </div>

            <div className="pay2method">
            <h3>Net Banking</h3>
            <p>Select from a list of banks</p>
            </div>

          </div>

          </div>


        </div>
        <div className="pay2delivery">
          <div className="pay2header2">
            <h3 className="pay2title">Delivery Address</h3>
            <span className="pay2change"   onClick={() => navigate("/deliveryaddress")}>Change</span>
          </div>
          <p className="pay2name">Sivakumar - 9877665433</p>
          <p className="pay2address">612/2, VOC St, K K Nagar, Tiruchirappalli, Tamil Nadu 620021</p>
        </div>
      </div>

      <div className="pay2right">
      <div className="pay2suggestion">
        <img src={File} className="pay2icon" />
  <textarea placeholder="Write any suggestions" className="pay2textarea"></textarea>
</div>
        <div className="pay2pricebox">
          <h3 className="pay2pricetitle">Price Details (2 Items)</h3>
          <div className="pay2pricerow">
            <span>Item Total</span>
            <span>₹620</span>
          </div>
          <div className="pay2pricerow">
            <span>Delivery Charge</span>
            <span>₹30</span>
          </div>
          <div className="pay2pricerow">
            <span>GST Charge</span>
            <span>₹50</span>
          </div>
          <div className="pay2total">
            <span>To Pay</span>
            <span>₹700</span>
          </div>
        </div>
      </div>
    </div>


{/* mobilesection */}
    <div className="payment-container">
      {/* Header */}
      <div className="payment-header">
        <button className="back-btn" onClick={() => navigate(-1)}><GoArrowLeft /></button>
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


      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="popup-close" onClick={() => setShowPopup(false)}>X</button>
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
          </div>
        </div>
      )}

    </>
  );
};

export default PaymentOption;
