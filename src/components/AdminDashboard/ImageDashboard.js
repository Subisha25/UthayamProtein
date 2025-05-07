import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../AdminDashboard/ImageDashboard.css';
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Breadcrumb from './Breadcrumb';
const ImageDashboard = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // State for handling delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // 🔃 Fetch images on mount
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/images');
      setData(res.data);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  // 🧹 Delete image
  const handleDelete = async () => {
    if (itemToDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/images/${itemToDelete.id}`);
        fetchImages(); // Refresh after delete
        setShowDeleteConfirm(false); // Close the confirmation popup
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setUpdatedTitle(item.title);
    setPreviewImage(`http://localhost:5000/uploads/${item.image}`); // Ensure correct URL is set for preview
    setShowForm(true);
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file)); // Show preview of the selected file
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    // formData.append('title', updatedTitle);
    if (selectedFile) {
      formData.append('image', selectedFile);
    }
  
    try {
      await axios.put(`http://localhost:5000/api/images/${currentItem.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setShowForm(false);
      fetchImages(); // Refresh list
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  // Handle opening the delete confirmation popup
  const openDeleteConfirm = (item) => {
    setItemToDelete(item);
    setShowDeleteConfirm(true);
  };

  return (
    <div className="admin-container">
      <Breadcrumb current="Image List" />
      <h2 className="admin-title">Dashboard Table</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Title</th>
            <th>Image</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td><img src={`http://localhost:5000/uploads/${item.image}`} alt="item" className="admin-table-img" /></td>
              <td><span className="admin-edit-btn" onClick={() => handleEdit(item)}><FaUserEdit /></span></td>
              <td><span className="admin-delete-btn" onClick={() => openDeleteConfirm(item)}><MdDelete /></span></td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="admin-popup-overlay">
          <div className="admin-popup1">
            <button className="admin-popup-close1" onClick={() => setShowForm(false)}>✖</button>
            <div className="admin-popup-header1">
              <h3>Edit Item</h3>
            </div>
            <div className="admin-form1">
              <label>Title:</label>
              <input type="text" value={updatedTitle}/>
              <label>Upload Image:</label>
              <input type="file" onChange={handleImageChange} />
              {previewImage && <img src={previewImage} alt="preview" className="admin-image-preview1" />}
              <button className="admin-submit-btn1" onClick={handleUpdate}>Update</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Popup for Deleting */}
      {showDeleteConfirm && (
  <div className="dashdelete-overlay">
    <div className="dashdelete-popup">
      <button className="dashdelete-close" onClick={() => setShowDeleteConfirm(false)}>✖</button>
      <div className="dashdelete-header">
        <h3>Are you sure you want to delete this item?</h3>
      </div>
      <div className="dashdelete-actions">
        <button className="dashdelete-btn cancel" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
        <button className="dashdelete-btn delete" onClick={handleDelete}>Yes, Delete</button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ImageDashboard;
