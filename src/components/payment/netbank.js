import React, { useState } from 'react';
import '../payment/netbank.css';
import Navbar from '../navbar/navbar';

const banks = [
  { name: 'State Bank of India', url: 'https://www.onlinesbi.sbi/' },
  { name: 'HDFC Bank', url: 'https://www.hdfcbank.com/' },
  { name: 'ICICI Bank', url: 'https://www.icicibank.com/' },
  { name: 'Axis Bank', url: 'https://www.axisbank.com/' },
  { name: 'Kotak Mahindra Bank', url: 'https://www.kotak.com/' },
  { name: 'Bank of Baroda', url: 'https://www.bankofbaroda.in/' },
  { name: 'Canara Bank', url: 'https://www.canarabank.com/' },
  { name: 'Punjab National Bank', url: 'https://www.pnbindia.in/' },
  { name: 'IndusInd Bank', url: 'https://www.indusind.com/' },
  { name: 'Yes Bank', url: 'https://www.yesbank.in/' },
];

const BankSearch = () => {
  const [selectedUrl, setSelectedUrl] = useState('');

  const handleContinue = () => {
    if (selectedUrl) {
      window.open(selectedUrl, '_blank');
    } else {
      alert('Please select a bank before continuing.');
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="netbank-container2">
        <div className="netbank-box2">
          <ul className="netbank-list2">
            {banks.map((bank, index) => (
              <li key={index} className="netbank-item2">
                <label className="bank-label2">
                  <input
                    type="radio"
                    name="bank"
                    className="radio-bank2"
                    onChange={() => setSelectedUrl(bank.url)}
                  />
                  {bank.name}
                </label>
              </li>
            ))}
          </ul>
          <div className="continue-wrapper2">
            <button className="continue-btn2" onClick={handleContinue}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BankSearch;
