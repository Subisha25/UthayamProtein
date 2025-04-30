import React from "react";
import "../AdminDashboard/storeinformation.css";
import Chicken from '../assets/Uthayam_Protein_Logo_PNG 1.png';
import { FaUserEdit} from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const StoreInformation = () => {
  return (
    <div className="store-info-container">
      <div className="store-info-card">
        <div className="store-info-header">
        <h1 className="store-name">Uthayam Protein</h1>

          <div className="store-info-header-actions">
              <FaUserEdit  className="edit-button"/> 
          
              <MdDelete  className="delete-button"/>
          
          </div>
        </div>

        <div className="store-details">
          <div className="detail-items">
            <h3 className="detail-title2">Store Logo</h3>
            <img
              src={Chicken}
              alt="Store Logo"
              className="store-logo"
            />
          </div>

          <div className="detail-item">
            <h3 className="detail-title">Phone Number:</h3>
            <p className="detail-info">+123 456 7890</p>
          </div>
          <div className="detail-item">
            <h3 className="detail-title">Opening Hours:</h3>
            <p className="detail-info">24 Hours</p>
          </div>
          <div className="detail-item">
            <h3 className="detail-title">Payment Methods:</h3>
            <p className="detail-info">Online, Cash on Delivery</p>
          </div>
          <div className="detail-item">
            <h3 className="detail-title">Address:</h3>
            <p className="detail-info">123 Street, City, Country</p>
          </div>
          <div className="detail-item">
            <h3 className="detail-title">Email:</h3>
            <p className="detail-info">info@storename.com</p>
          </div>
          <div className="detail-item">
            <h3 className="detail-title">Domain:</h3>
            <p className="detail-info">www.storename.com</p>
          </div>
          <div className="detail-item">
            <h3 className="detail-title">Currency:</h3>
            <p className="detail-info">USD</p>
          </div>
          <div className="detail-item">
            <h3 className="detail-title">Language:</h3>
            <p className="detail-info">English</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreInformation;
