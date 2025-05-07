// AccountSettings.jsx
import React, { useState, useRef, useEffect } from 'react';
import './AccountSettings.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AccountSettings = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    userName: '',
    email: '',
    phone: '',
    avatar: ''
  });

  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profile/1');
        setFormData({
          ...response.data,
          avatar: `http://localhost:5000/${response.data.avatar.replace(/^uploads\//, '')}`
        });
        
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);
  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === 'avatar' && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setAvatarFile(file);
      setFormData((prev) => ({ ...prev, avatar: imageUrl }));
      
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleReset = () => {
    window.location.reload();
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append('fullName', formData.fullName);
      data.append('userName', formData.userName);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      if (avatarFile) {
        data.append('avatar', avatarFile); // Only send file if it exists
      }
  
      await axios.put('http://localhost:5000/api/profile/1', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
        // Immediately update the avatar state in the UI
    if (avatarFile) {
      const updatedAvatarUrl = URL.createObjectURL(avatarFile);
      setFormData((prev) => ({
        ...prev,
        avatar: updatedAvatarUrl, // Update the avatar with the newly uploaded file
      }));
    }
  
    setShowSuccess(true);
   // Navigate to dashboard after 1 second
   setTimeout(() => {
    setShowSuccess(false);
    navigate('/dashboard');
  }, 1000);        } catch (error) {
      console.error('Error updating profile:', error);
      alert('Update failed');
    }
  };
  

  const handleDeleteAccount = () => {
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    navigate('/adminlogin');
  };

  return (
    <div className="account-card">
      <form className="account-form">
        <div className="form-left">
          <div className="form-group1">
            <label>Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
          </div>

          <div className="form-group1">
            <label>User Name</label>
            <input type="text" name="userName" value={formData.userName} onChange={handleChange} />
          </div>

          <div className="form-group1">
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>

          <div className="form-group1">
            <label>Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
          </div>

          <p className="delete-text">
            <span onClick={handleDeleteAccount} className="delete-link">
              Delete Your Account
            </span>
            <br />
            You will receive an email to confirm your decision.
            <br />
            Please note, all boards you created will be permanently erased.
          </p>

          <div className="button-group">
            <button type="button" className="cancel-btns" onClick={handleReset}>
              Cancel
            </button>
            <button type="button" className="save-btns" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>

        <div className="form-right">
        <img
  src={formData.avatar}
  alt="avatar"
  className="avatar-img"
/>


          <input
            type="file"
            name="avatar"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleChange}
          />
          <button type="button" onClick={handleUploadClick} className="upload-btn">
            Upload a picture
          </button>
        </div>
        {showSuccess && (
  <div className="popup-message success">
    Profile updated successfully
  </div>
)}

      </form>
    </div>
  );
};

export default AccountSettings;
