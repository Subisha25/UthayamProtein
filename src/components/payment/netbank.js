import React, { useState } from 'react';
import '../payment/netbank.css';
import { RiArrowDropDownFill } from "react-icons/ri";
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
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredBanks = banks.filter(bank =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (url) => {
    window.open(url, '_blank');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
    <Navbar />
    <div className="netbank-container">
      <div className="netbank-box">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Select your bank"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="netbank-input"
            readOnly // Make it read-only to prevent typing
          />
          <span className="dropdown-icon" onClick={toggleDropdown}>
            <RiArrowDropDownFill />
          </span>
        </div>

        {showDropdown && (
          <ul className="netbank-list">
            {filteredBanks.map((bank, index) => (
              <li
                key={index}
                onClick={() => handleClick(bank.url)}
                className="netbank-item"
              >
                {bank.name}
              </li>
            ))}
            {filteredBanks.length === 0 && (
              <li className="netbank-no-results">No banks found</li>
            )}
          </ul>
        )}
      </div>
    </div>
    </>
  );
};

export default BankSearch;
