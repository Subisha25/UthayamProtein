// DebitCardForm.js
import React, { useState } from 'react';
import '../payment/debitcard.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/navbar';


const DebitCardForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);


  const formatCardNumber = (value) => {
    return value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d{1,2})/, '$1/$2')
      .substr(0, 5);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Enter a valid 16-digit card number';
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      newErrors.expiry = 'Enter expiry in MM/YY format';
    }

    if (!/^\d{3}$/.test(cvv)) {
      newErrors.cvv = 'Enter a valid 3-digit CVV';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate("/orderconfirmation");
        },3000); // Show popup for 3 seconds
      }
      
  };

  return (
    
    <>
    <Navbar />
    <div className='debit-border'></div>
    <div className="debit-form-container">
      <h2 className="debit-name">Debit Card Payment</h2>
      <form onSubmit={handleSubmit} className="debit-form">
        <label className="debit-label">Card Number</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
          maxLength="19"
          placeholder="1234 5678 9012 3456"
          className="debit-input"
        />
        {errors.cardNumber && <p className="debit-error">{errors.cardNumber}</p>}

        <label className="debit-label">Expiry Date (MM/YY)</label>
        <input
          type="text"
          value={expiry}
          onChange={(e) => setExpiry(formatExpiry(e.target.value))}
          maxLength="5"
          placeholder="08/27"
          className="debit-input"
        />
        {errors.expiry && <p className="debit-error">{errors.expiry}</p>}

        <label className="debit-label">CVV</label>
        <input
          type="password"
          value={cvv}
          onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substr(0, 3))}
          maxLength="3"
          placeholder="•••"
          className="debit-input"
        />
        {errors.cvv && <p className="debit-error">{errors.cvv}</p>}

        <button type="submit" className="debit-btn">Pay Now</button>
      </form>
    </div>


    {showPopup && (
  <div className="debit-popup-overlay">
    <div className="debit-popup">
      <div className="debit-popup-icon">
        <div className="debit-checkmark"></div>
      </div>
      <p className="debit-popup-message">Payment Submitted Successfully!</p>
      {/* <button className="debit-popup-close" onClick={() => setShowPopup(false)}>×</button> */}
    </div>
  </div>
)}

    </>
  );
};

export default DebitCardForm;
