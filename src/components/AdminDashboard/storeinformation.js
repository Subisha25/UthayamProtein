
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../AdminDashboard/storeinformation.css";
import Chicken from '../assets/Uthayam_Protein_Logo_PNG 1.png';
import { FaUserEdit,  FaTimes } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Breadcrumb from "./Breadcrumb";
const StoreInformation = () => {
  const [storeData, setStoreData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, storeLogo: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };
  
  const [formData, setFormData] = useState({
    phone: "",
    openingHours: "",
    paymentMethods: "",
    address: "",
    email: "",
    domain: "",
    currency: "",
    language: "",
    storeLogo: null,
  });

  const fetchStore = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/store");
      if (res.data && res.data.length > 0) {
        setStoreData(res.data[0]); // Assuming only one store
        setFormData(res.data[0]);
      }
    } catch (err) {
      console.error("Failed to fetch store", err);
    }
  };

  useEffect(() => {
    fetchStore();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  

  const handleUpdate = async () => {
    try {
      const form = new FormData();
      for (let key in formData) {
        form.append(key, formData[key]);
      }

      await axios.put(`http://localhost:5000/api/store/${storeData.id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setShowEditForm(false);
      fetchStore();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/store/${storeData.id}`);
      setStoreData(null);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (!storeData) return <div>Loading...</div>;

  return (
    <>
                      <Breadcrumb current="Store Information" />

    <div className="store-info-container">

      <div className="store-info-card">
        <div className="store-info-header">
          <h1 className="store-name">Uthayam Protein</h1>
          <div className="store-info-header-actions">
            <FaUserEdit className="edit-button" onClick={() => setShowEditForm(true)} />
            <MdDelete className="delete-button" onClick={() => setShowDeleteConfirm(true)} />
          </div>
        </div>

        <div className="store-details">
          <div className="detail-items">
            <h3 className="detail-title2">Store Logo</h3>
            <img src={`http://localhost:5000/${storeData.storeLogo}`} alt="Store Logo" className="store-logo" />
          </div>

          <div className="detail-item"><h3>Phone Number:</h3><p>{storeData.phone}</p></div>
          <div className="detail-item"><h3>Opening Hours:</h3><p>{storeData.openingHours}</p></div>
          <div className="detail-item"><h3>Payment Methods:</h3><p>{storeData.paymentMethods}</p></div>
          <div className="detail-item"><h3>Address:</h3><p>{storeData.address}</p></div>
          <div className="detail-item"><h3>Email:</h3><p>{storeData.email}</p></div>
          <div className="detail-item"><h3>Domain:</h3><p>{storeData.domain}</p></div>
          <div className="detail-item"><h3>Currency:</h3><p>{storeData.currency}</p></div>
          <div className="detail-item"><h3>Language:</h3><p>{storeData.language}</p></div>
        </div>
      </div>

      {showEditForm && (
        <div className="storeinfo-popup-overlay">
          <div className="storeinfo-popup-form">
            <div className="popup-header">
              <h2>Edit Store Info</h2>
              <FaTimes 
                className="close-popup"
                onClick={() => setShowEditForm(false)}
              />
            </div>
      
            <div className="storeinfo-form-scroll"> {/* This is the new scrollable wrapper */}

          <div className="storeinfo-form-wrapper">
            {[
              ["phone", "Phone Number"],
              ["openingHours", "Opening Hours"],
              ["paymentMethods", "Payment Methods"],
              ["address", "Address"],
              ["email", "Email"],
              ["domain", "Domain"],
              ["currency", "Currency"],
              ["language", "Language"]
            ].map(([key, label], index) => (
              index % 2 === 0 ? (
                <div className="storeinfo-form-row" key={key}>
                  <div className="storeinfo-form-group">
                    <label>{label}</label>
                    <input type="text" name={key} value={formData[key] || ""} onChange={handleChange} />
                  </div>
                  {index + 1 < 8 && (
                    <div className="storeinfo-form-group">
                      <label>{[
                        ["phone", "Phone Number"],
                        ["openingHours", "Opening Hours"],
                        ["paymentMethods", "Payment Methods"],
                        ["address", "Address"],
                        ["email", "Email"],
                        ["domain", "Domain"],
                        ["currency", "Currency"],
                        ["language", "Language"]
                      ][index + 1][1]}</label>
                      <input
                        type="text"
                        name={[
                          "phone",
                          "openingHours",
                          "paymentMethods",
                          "address",
                          "email",
                          "domain",
                          "currency",
                          "language"
                        ][index + 1]}
                        value={formData[
                          [
                            "phone",
                            "openingHours",
                            "paymentMethods",
                            "address",
                            "email",
                            "domain",
                            "currency",
                            "language"
                          ][index + 1]
                        ] || ""}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </div>
              ) : null
            ))}
      
            <div className="storeinfo-form-row">
              <div className="storeinfo-form-group" style={{ flex: 1 }}>
                <label>Store Logo</label>
                <input type="file" onChange={handleFileChange} />
                <div>
      <img
        src={
          previewImage
            ? previewImage
            : `http://localhost:5000/${storeData.storeLogo}`
        }
        alt="Store Logo Preview"
        style={{
          width: "50px",
          height: "50px",
          objectFit: "cover",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
    </div>     
          </div>
            </div>

          </div>
      </div>
          <div className="storeinfo-form-actions">
            <button onClick={() => setShowEditForm(false)}>Cancel</button>
            <button onClick={handleUpdate}>Save</button>
          </div>
        </div>
      </div>
      
      )}

{showDeleteConfirm && (
  <div className="storeinfo-popup-overlay2">
    <div className="storeinfo-popup-form2">
      <div className="popup-header2">
        <FaTimes className="close-popup2" onClick={() => setShowDeleteConfirm(false)} />
      </div>
      <p className="popup-message2">Are you sure you want to delete this store information?</p>
      <div className="storeinfo-form-actions2">
        <button className="delete-btn2" onClick={() => { handleDelete(); setShowDeleteConfirm(false); }}>
          Delete
        </button>
      </div>
    </div>
  </div>
)}



    </div>
    </>

  );
};

export default StoreInformation;
