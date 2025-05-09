import React, { useState } from "react";
import "./payment.css";
import productimage from "../cart/images/product1.png";
import Paytm from '../assets/Frame.png';
import Gpay from '../assets/Frame (1).png';
import Phonepay from '../assets/Frame (2).png';
import COD from '../assets/cash-delivery.avif';
import UPI from '../assets/Frame (3).png';
import { IoIosArrowDown } from "react-icons/io";
import Delivery from '../assets/icon-park-outline_delivery.png';
import { GoArrowLeft } from "react-icons/go";
import Tick from '../assets/tick.png';
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import File from '../assets/material-symbols_add-notes-outline-rounded.png';
import { useCart } from '../context/cartContext';
import QRCode from '../products/images/QR_code_for_mobile_English_Wikipedia.svg';
import { IoIosClose } from "react-icons/io";
import BankSearch from "./netbank";

const PaymentOption = () => {
  const { cartItems, removeFromCart } = useCart();
  const [quantity, setQuantity] = useState(5);
  const [addon, setAddon] = useState(2);
  const [selectedPayment, setSelectedPayment] = useState("paytm");
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const location = useLocation();
  const selectedAddress = location.state?.selectedAddress;
  const itemsToDisplay = location.state?.itemsToShow || cartItems;
  const [showQR, setShowQR] = useState(false);
  const [showBankSearch, setShowBankSearch] = useState(false);

  const toggleBankSearch = () => {
    setShowBankSearch(prev => !prev);
  };

  const handleToggleQR = () => {
    setShowQR(!showQR);
  };

  const DELIVERY_CHARGE = 30;
  const GST_CHARGE = 50;


  const itemTotal = itemsToDisplay.reduce((total, item) => {
    const quantity = item.quantity || 1;
    return total + (item.originalRate * quantity);
  }, 0);

  const totalToPay = itemTotal + DELIVERY_CHARGE + GST_CHARGE;

  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };



  const handleOrder = async () => {
    const formattedItems = itemsToDisplay.map(item => ({
      name: item.title,
      price: item.originalRate,
      quantity: item.quantity || 1,
    }));
  
    const orderData = {
      products: formattedItems,
      address: {
        name: selectedAddress.name,
        phone: selectedAddress.phone,
        street: `${selectedAddress.house}, ${selectedAddress.area}`,  
        city: selectedAddress.city,
        state: selectedAddress.state,
        pincode: selectedAddress.pincode,
      },
      itemTotal,
      deliveryCharge: DELIVERY_CHARGE,
      gstCharge: GST_CHARGE,
      totalAmount: totalToPay, // ✅ match backend key
      paymentMethod: isOn ? "Cash On Delivery" : "Online Payment"
    };
  
    try {
      const response = await fetch("http://localhost:5000/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });
  
      if (response.ok) {
        navigate("/orderconfirmation");
      } else {
        alert("Failed to place order");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong while placing the order.");
    }
  };
  

  // const handleOrder = () => {
  //   if (isOn) {
  //     navigate("/orderconfirmation")
  //     // alert("Order placed successfully!");
  //   }
  // };

  const paymentOptions = [
    { id: "paytm", label: "Paytm", image: Paytm },
    { id: "gpay", label: "Google Pay", image: Gpay },
    { id: "phonepe", label: "PhonePe", image: Phonepay },
    { id: "upi", label: "Pay with any UPI App", image: UPI },
    { id: "cod", label: "Cah On Delivery", image: COD },

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
                <h3>₹{totalToPay}</h3>
                <span>Pay Online</span>
                <span className="pay2tick">
                  <img src={Tick} alt="tick" /></span>
              </div>
              <div className="pay2options">
                <p>Pay by any UPI app</p>
                <div className="pay2paysect" >
                  <div className="pay2upi">
                    <img className="paytmimg" src={Paytm} alt="Paytm" />
                    <img className="payimg" src={Gpay} alt="GPay" />
                    <img className="payimg" src={Phonepay} alt="PhonePe" />
                  </div>
                  <button className="pay2qr"  onClick={handleToggleQR}>View QR Code</button>

                  <div className="cod-container">
      <label className="cod-label">Cash on Delivery</label>
      <label className="switch">
        <input type="checkbox" checked={isOn} onChange={handleToggle} />
        <span className={`slider ${isOn ? "on" : ""}`}></span>
      </label>
      </div>
      <button
        className="pay2qr"
        onClick={handleOrder}
        disabled={!isOn}
      >
      Continue
      </button>
   

                </div>
                <p className="pay2addupi">+ADD UPI ID</p>
              </div>
              <div className="pay2methods">
                <div className="pay2method">
                  <h3>Wallet </h3>
                  <p>PhonePe, Amazon Pay and more</p>
                </div>
                <div
  className="pay2method"
  onClick={() => {
    if (!selectedAddress) {
      alert("Please select a delivery address first.");
      return;
    }

    navigate("/debitcard", {
      state: {
        selectedAddress,
        itemsToShow: itemsToDisplay,
        orderDetails: {
          products: itemsToDisplay.map(item => ({
            name: item.title,
            price: item.originalRate,
            quantity: item.quantity || 1,
          })),
          address: {
            name: selectedAddress.name,
            phone: selectedAddress.phone,
            street: `${selectedAddress.house}, ${selectedAddress.area}`,
            city: selectedAddress.city,
            state: selectedAddress.state,
            pincode: selectedAddress.pincode,
          },
          itemTotal,
          deliveryCharge: DELIVERY_CHARGE,
          gstCharge: GST_CHARGE,
          totalAmount: totalToPay,
          paymentMethod: "Online Payment",
        }
      }
    });
  }}
>



                {/* <div className="pay2method"  onClick={() => navigate("/debitcard")}> */}
                  <h3>Debit/Credit Card</h3>
                  <p>Save and Pay via Cards</p>
                </div>

                <div className="pay2method" onClick={toggleBankSearch}>
                  <h3>Net Banking</h3>
                  <p>Select from a list of banks</p>
                </div>

                {showBankSearch && (
        <div className="bank-search-wrapper" style={{ marginTop: '30px' }}>
          <BankSearch />
        </div>
      )}

              </div>

            </div>


          </div>
          <div className="pay2delivery">

            <div className="pay2header2">
              <h3 className="pay2title">Delivery Address</h3>
              <span className="pay2change" onClick={() => navigate("/selectaddress")}>Change</span>
            </div>

            {showQR && (
        <div className="qr-popup">
          <div className="qr-popup-content">
            <span className="qrclose-btn" onClick={handleToggleQR}><IoIosClose /></span>
            <img src={QRCode} alt="UPI QR Code" className="qr-image" />
            <p className="qr-text">Scan using any UPI app</p>
          </div>
        </div>
      )}

            {selectedAddress ? (
              <>
                <p className="pay2name">
                  {selectedAddress.name} - {selectedAddress.phone}
                </p>

                <p className="pay2address">
                  {selectedAddress.house}, {selectedAddress.area}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
                </p>
              </>
            ) : (
              <p>No address selected.</p>
            )}

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
              <span>₹{itemTotal}</span>
            </div>
            <div className="pay2pricerow">
              <span>Delivery Charge</span>
              <span>₹{DELIVERY_CHARGE}</span>
            </div>
            <div className="pay2pricerow">
              <span>GST Charge</span>
              <span>₹{GST_CHARGE}</span>
            </div>
            <div className="pay2total">
              <span>To Pay</span>
              <span>₹{totalToPay}</span>
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
              <span>₹{totalToPay}</span>
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
            <div className="pay-items"  onClick={() => navigate("/debitcard")}>
              <h3>Debit/Credit Card</h3>
              <p>Save and Pay via Cards</p>
            </div>
            <div className="pay-items1" onClick={toggleBankSearch}>
              <h3>Net Banking</h3>
              <p>Select from a list of banks</p>
            </div>
            {showBankSearch && (
        <div className="bank-search-wrapper" style={{ marginTop: '30px' }}>
          <BankSearch />
        </div>
      )}

          </div>
        </div>

        {/* Price Details */}
        {/* Price Details */}
        <div className="price-section">
          <div className="price-header">
            <h3>Price Details (2 Items)</h3>
            {/* <span className="dropdown-icon"><IoIosArrowDown /> </span> */}
          </div>

          <div className="delivery-address">
            <div className="address-header">

              <div className="delivery">
                <img src={Delivery} />
                <h4>Deliver to</h4>
              </div>
              <span className="change-btn" onClick={() => navigate("/selectaddress")}>Change</span>
            </div>

            {selectedAddress ? (
              <div>
                <p>
                  {selectedAddress.name} - {selectedAddress.phone}
                </p>
                <span className="spanpay">
                  {selectedAddress.house}, {selectedAddress.area}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
                </span>
              </div>
            ) : null}


          </div>
        </div>

        {/* Footer */}
        <div className="payment-footer">
          <div className="paymentprice-details">
            <span className="amount">₹{totalToPay}</span><br />
            <p className="detailed-bill">View Detailed Bill</p>
          </div>

          {selectedPayment === "cod" ? (
  <button className="pay-now-btn" onClick={() => navigate("/orderconfirmation")}>
    Continue
  </button>
) : (
  <button className="pay-now-btn" onClick={() => navigate("/orderconfirmation")}>
    PAY NOW
  </button>
)}

          {/* <button className="pay-now-btn" onClick={() => navigate("/orderconfirmation")}>PAY NOW</button> */}
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
                  <img
                    src={
                      item.image.startsWith("http")
                        ? item.image
                        : `http://localhost:5000/uploads/${item.image}`
                    }
                    alt={item.title}
                    className="item-image2"
                  />

                  {/* <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.title} className="item-image2" /> */}
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

export default PaymentOption;
