// import React from "react";
// import "./selectaddress.css"; // Import the CSS file
// import Icon from '../assets/material-symbols_add-notes-outline-rounded.png';
// import { useNavigate } from "react-router-dom";
// import Navbar from "../navbar/navbar";


// const SelectAddress = () => {

//   const navigate = useNavigate();


//   return (
//     <>
//     <Navbar />
   
//     <div className="selectadd-container">
//       {/* Left Side - Product Details, Delivery Address, Payment */}
//       <div className="selectadd-left">
//         {/* Product Details */}
//         <div className="selectadd-section">
//           <h2 className="selectadd-title">Product Details</h2>
//           <span className="selectadd-view-change">View/Change</span>
//         </div>

//         {/* Delivery Address */}
//         <div className="selectadd1-section">
//           <div className="selectadd-header">
//             <h2 className="selectadd-title">Delivery Address</h2>
//             <span className="selectadd-add-new"      
//              onClick={() => navigate("/deliveryaddress")}
//             >ADD NEW ADDRESS</span>
//           </div>
//           <div className="selectadd-address-box">
//             <h3 className="selectadd-address-name">Sivakumar – 9877665433</h3>
//             <p className="selectadd-address-text">
//               612/2, VOC St, K K Nagar, Tiruchirappalli, Tamil Nadu 620021
//             </p>
//             <button className="selectadd-deliver-btn"  onClick={() => navigate("/proceedtopay")}>Deliver to this address</button>
//           </div>
//         </div>

//         {/* Payment Section */}
//         <div className="selectadd2-section">
//           <h2 className="selectadd-title">Payment</h2>
//           {/* <button className="selectadd-proceed-btn"       
//           onClick={() => navigate("/paymentoption")}
//           >Proceed to Pay</button> */}

//         </div>
//       </div>

//       {/* Right Side - Suggestions Box & Price Details */}
//       <div className="selectadd-right">
//         {/* Suggestions Box */}
//         <div className="selectadd-suggestions">
//           <img src={Icon} className="selectaddimage"/>
//           <input
//   type="text"
//   className="selectadd-suggestion-input"
//   placeholder="Write any suggestions"
//   disabled={false} // Change to true if you want it disabled
// />
//         </div>

       

//         {/* Price Details */}
//         <div className="selectadd-price-details">
//           <h3 className="selectadd-price-title">Price Details (2 Items)</h3>
//           <div className="selectadd-price-row">
//             <span>Item Total</span> <span>₹620</span>
//           </div>
//           <div className="selectadd-price-row">
//             <span>Delivery Charge</span> <span>₹30</span>
//           </div>
//           <div className="selectadd-price-row">
//             <span>GST Charge</span> <span>₹50</span>
//           </div>
//           <div className="selectadd-total">
//             <span>To Pay</span> <span>₹700</span>
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default SelectAddress;


import React, { useState } from "react";
// import '../orderdetails/orderdetails.css';
import productimage from "../cart/images/product1.png";
import "./selectaddress.css"; // Import the CSS file
import Icon from "../assets/material-symbols_add-notes-outline-rounded.png";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";

const SelectAddress = () => {
    const [quantity, setQuantity] = useState(5);
    const [addon, setAddon] = useState(2);
   
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility

  return (
    <>
      <Navbar />

      <div className="selectadd-container">
        {/* Left Side - Product Details, Delivery Address, Payment */}
        <div className="selectadd-left">
          {/* Product Details */}
          <div className="selectadd-section">
            <h2 className="selectadd-title">Product Details</h2>
            <span 
              className="selectadd-view-change" 
              onClick={() => setShowPopup(true)}
            >
              View/Change
            </span>
          </div>

          {/* Delivery Address */}
          <div className="selectadd1-section">
            <div className="selectadd-header">
              <h2 className="selectadd-title">Delivery Address</h2>
              <span className="selectadd-add-new"      
                onClick={() => navigate("/deliveryaddress")}
              >
                ADD NEW ADDRESS
              </span>
            </div>
            <div className="selectadd-address-box">
              <h3 className="selectadd-address-name">Sivakumar – 9877665433</h3>
              <p className="selectadd-address-text">
                612/2, VOC St, K K Nagar, Tiruchirappalli, Tamil Nadu 620021
              </p>
              <button 
                className="selectadd-deliver-btn"  
                onClick={() => navigate("/proceedtopay")}
              >
                Deliver to this address
              </button>
            </div>
          </div>

          {/* Payment Section */}
          <div className="selectadd2-section">
            <h2 className="selectadd-title">Payment</h2>
          </div>
        </div>

        {/* Right Side - Suggestions Box & Price Details */}
        <div className="selectadd-right">
          {/* Suggestions Box */}
          <div className="selectadd-suggestions">
            <img src={Icon} className="selectaddimage" alt="icon" />
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
              <span>Item Total</span> <span>₹620</span>
            </div>
            <div className="selectadd-price-row">
              <span>Delivery Charge</span> <span>₹30</span>
            </div>
            <div className="selectadd-price-row">
              <span>GST Charge</span> <span>₹50</span>
            </div>
            <div className="selectadd-total">
              <span>To Pay</span> <span>₹700</span>
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

export default SelectAddress;
