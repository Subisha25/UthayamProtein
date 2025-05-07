// import React, { useState } from "react";
// import { FaUserEdit, FaPlus } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import '../AdminDashboard/categorylist.css';
// import Kadai  from "../assets/644d019e6bea212e59978666a637b810.jpg";
// import Chicken from '../assets/yellow-chicken-with-short-feathers-clip-art-58762.jpg';
// import Egg from '../assets/chicken-clip-art-fried-egg-basket-png-favpng-y1tLZHP1QurBw5UTGb9PqML1X.jpg';

// function CategoryList() {
//   const [data, setData] = useState([
//     { id: 1, name: "Chicken", stock: 100, image: Chicken },
//     { id: 2, name: "Egg", stock: 200, image: Egg },
//     { id: 3, name: "Kadai", stock: 50, image: Kadai },
//   ]);

//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({ name: "", stock: "", image: null });
//   const [previewImage, setPreviewImage] = useState(null);

//   const handleEdit = (item) => {
//     console.log("Edit:", item);
//     setFormData({ name: item.name, stock: item.stock, image: null });
//     // setPreviewImage(`http://localhost:5000/uploads/${item.image}`);
//     setPreviewImage(`${item.image}`)
//     setShowForm(true);
//   };

//   const handleDelete = (item) => {
//     console.log("Delete:", item);
//     const filteredData = data.filter((d) => d.id !== item.id);
//     setData(filteredData);
//   };

//   const handleAdd = () => {
//     setFormData({ name: "", stock: "", image: null });
//     setPreviewImage(null);
//     setShowForm(true);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({ ...formData, image: file });
//       setPreviewImage(URL.createObjectURL(file));
//     }
//   };

//   const handleFormSubmit = () => {
//     if (!formData.name || !formData.stock || !formData.image) {
//       alert("Please fill all fields!");
//       return;
//     }

//     const newItem = {
//       id: data.length + 1,
//       name: formData.name,
//       stock: formData.stock,
//       image: formData.image.name,
//     };

//     setData([...data, newItem]);
//     setShowForm(false);
//   };

//   return (
//     <div className="admin-container">
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <h2 className="admin-title">Category List</h2>
//         <button onClick={handleAdd} className="admin-add-btn" style={{ fontSize: "20px", padding: "8px", background: "#FFC000", color: "black", border: "none" }}>
//           <FaPlus />
//         </button>
//       </div>

//       <table className="admin-table" style={{ width: "100%", marginTop: "20px" }}>
//         <thead>
//           <tr>
//             <th>S.No</th>
//             <th>Image</th>
//             <th>Category Name</th>
//             <th>Stock</th>
//             <th colSpan="2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => (
//             <tr key={item.id}>
//               <td>{index + 1}</td>
//               <td>
//                 <img
//                 src={item.image}
//                 //   src={`http://localhost:5000/uploads/${item.image}`}
//                   alt={item.name}
//                   style={{ width: "50px", height: "50px", objectFit: "cover" }}
//                 />
//               </td>
//               <td>{item.name}</td>
//               <td>{item.stock}</td>
//               <td>
//                 <span className="admin-edit-btn" onClick={() => handleEdit(item)}>
//                   <FaUserEdit />
//                 </span>
//               </td>
//               <td>
//                 <span className="admin-delete-btn" onClick={() => handleDelete(item)}>
//                   <MdDelete />
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//     {/* Popup Form */}
//     {showForm && (
//         <div className="popup-overlay">
//           <div className="popup-form">
//             <button onClick={() => setShowForm(false)} className="popup-close-btn">
//               ✖
//             </button>
//             <h3 className="popup-title">Add Category</h3>

//             <div className="category-form">
//               <div className="category-form-group">
//                 <label>Category Name</label>
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   className="category-input"
//                 />
//               </div>

//               <div className="category-form-group">
//                 <label>Stock</label>
//                 <input
//                   type="number"
//                   value={formData.stock}
//                   onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
//                   className="category-input"
//                 />
//               </div>

//               <div className="category-form-group">
//                 <label>Upload Image</label>
//                 <input
//                   type="file"
//                   onChange={handleImageChange}
//                   className="category-input"
//                 />
//               </div>

//               {previewImage && (
//                 <div className="category-image-preview">
//                   <img src={previewImage} alt="Preview" />
//                 </div>
//               )}

//               <button onClick={handleFormSubmit} className="category-submit-btn">
//                 Submit
//               </button>
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CategoryList;



// import React, { useEffect, useState } from "react";
// import { FaUserEdit, FaPlus } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import '../AdminDashboard/categorylist.css';
// import axios from "axios";

// function CategoryList() {
//   const [data, setData] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({ id: null, name: "", stock: "", image: null });
//   const [previewImage, setPreviewImage] = useState(null);
//   const [isEditMode, setIsEditMode] = useState(false);

//   // Fetch all categories when component loads
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/categories");
//       setData(res.data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const handleEdit = (item) => {
//     setFormData({ id: item.id, name: item.category_name, stock: item.stock, image: null });
//     setPreviewImage(`http://localhost:5000/uploads/${item.image}`);
//     setShowForm(true);
//     setIsEditMode(true);
//   };

//   const handleDelete = async (item) => {
//     if (window.confirm("Are you sure you want to delete this category?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/categories/${item.id}`);
//         fetchCategories(); // Refresh list
//       } catch (error) {
//         console.error("Error deleting category:", error);
//       }
//     }
//   };

  

//   const handleAdd = () => {
//     setFormData({ id: null, name: "", stock: "", image: null });
//     setPreviewImage(null);
//     setShowForm(true);
//     setIsEditMode(false);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({ ...formData, image: file });
//       setPreviewImage(URL.createObjectURL(file));
//     }
//   };

//   const handleFormSubmit = async () => {
//     if (!formData.name || !formData.stock || (!formData.image && !isEditMode)) {
//       alert("Please fill all fields!");
//       return;
//     }

//     const apiUrl = "http://localhost:5000/api/categories";
//     const submitData = new FormData();
//     submitData.append("category_name", formData.name);
//     submitData.append("stock", formData.stock);

//     if (formData.image) {
//       submitData.append("image", formData.image);
//     }

//     try {
//       if (isEditMode) {
//         await axios.put(`${apiUrl}/${formData.id}`, submitData);
//       } else {
//         await axios.post(apiUrl, submitData);
//       }
//       fetchCategories(); // Refresh after add/update
//       setShowForm(false);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   return (
//     <div className="admin-container">
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <h2 className="admin-title">Category List</h2>
//         <button onClick={handleAdd} className="admin-add-btn" style={{ fontSize: "20px", padding: "8px", background: "#FFC000", color: "black", border: "none" }}>
//           <FaPlus />
//         </button>
//       </div>

//       <table className="admin-table" style={{ width: "100%", marginTop: "20px" }}>
//         <thead>
//           <tr>
//             <th>S.No</th>
//             <th>Image</th>
//             <th>Category Name</th>
//             <th>Stock</th>
//             <th colSpan="2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => (
//             <tr key={item.id}>
//               <td>{index + 1}</td>
//               <td>
//                 <img
//                   src={`http://localhost:5000/uploads/${item.image}`}
//                   alt={item.category_name}
//                   style={{ width: "50px", height: "50px", objectFit: "cover" }}
//                 />
//               </td>
//               <td>{item.category_name}</td>
//               <td>{item.stock}</td>
//               <td>
//                 <span className="admin-edit-btn" onClick={() => handleEdit(item)}>
//                   <FaUserEdit />
//                 </span>
//               </td>
//               <td>
//                 <span className="admin-delete-btn" onClick={() => handleDelete(item)}>
//                   <MdDelete />
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Popup Form */}
//       {showForm && (
//         <div className="popup-overlay">
//           <div className="popup-form">
//             <button onClick={() => setShowForm(false)} className="popup-close-btn">✖</button>
//             <h3 className="popup-title">{isEditMode ? "Edit Category" : "Add Category"}</h3>

//             <div className="category-form">
//               <div className="category-form-group">
//                 <label>Category Name</label>
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   className="category-input"
//                 />
//               </div>

//               <div className="category-form-group">
//                 <label>Stock</label>
//                 <input
//                   type="number"
//                   value={formData.stock}
//                   onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
//                   className="category-input"
//                 />
//               </div>

//               <div className="category-form-group">
//                 <label>Upload Image</label>
//                 <input
//                   type="file"
//                   onChange={handleImageChange}
//                   className="category-input"
//                 />
//               </div>

//               {previewImage && (
//                 <div className="category-image-preview">
//                   <img src={previewImage} alt="Preview" />
//                 </div>
//               )}

//               <button onClick={handleFormSubmit} className="category-submit-btn">
//                 {isEditMode ? "Update" : "Submit"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CategoryList;


import React, { useEffect, useState } from "react";
import { FaUserEdit, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "../AdminDashboard/categorylist.css";
import axios from "axios";
import Breadcrumb from "./Breadcrumb";

function CategoryList() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: "", stock: "", image: null });
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setData(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData({ id: item.id, name: item.category_name, stock: item.stock, image: null });
    setPreviewImage(`http://localhost:5000/uploads/${item.image}`);
    setShowForm(true);
    setIsEditMode(true);
  };

  const handleDelete = async (item) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`http://localhost:5000/api/categories/${item.id}`);
        fetchCategories();
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const handleAdd = () => {
    setFormData({ id: null, name: "", stock: "", image: null });
    setPreviewImage(null);
    setShowForm(true);
    setIsEditMode(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async () => {
    if (!formData.name || !formData.stock || (!formData.image && !isEditMode)) {
      alert("Please fill all fields!");
      return;
    }

    const apiUrl = "http://localhost:5000/api/categories";
    const submitData = new FormData();
    submitData.append("category_name", formData.name);
    submitData.append("stock", formData.stock);

    if (formData.image) {
      submitData.append("image", formData.image);
    }

    try {
      if (isEditMode) {
        await axios.put(`${apiUrl}/${formData.id}`, submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post(apiUrl, submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      fetchCategories();
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="admin-container">
            <Breadcrumb current="category List" />
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 className="admin-title">Category List</h2>
        <button onClick={handleAdd} className="admin-add-btn" style={{ fontSize: "20px", padding: "8px", background: "#FFC000", color: "black", border: "none" }}>
          <FaPlus />
        </button>
      </div>

      <table className="admin-table" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Image</th>
            <th>Category Name</th>
            <th>Stock</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={`http://localhost:5000/uploads/${item.image}`}
                  alt={item.category_name}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </td>
              <td>{item.category_name}</td>
              <td>{item.stock}</td>
              <td>
                <span className="admin-edit-btn" onClick={() => handleEdit(item)}>
                  <FaUserEdit />
                </span>
              </td>
              <td>
                <span className="admin-delete-btn" onClick={() => handleDelete(item)}>
                  <MdDelete />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Form */}
      {showForm && (
        <div className="popup-overlay">
          <div className="popup-form">
            <button onClick={() => setShowForm(false)} className="popup-close-btn">✖</button>
            <h3 className="popup-title">{isEditMode ? "Edit Category" : "Add Category"}</h3>

            <div className="category-form">
              <div className="category-form-group">
                <label>Category Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="category-input"
                />
              </div>

              <div className="category-form-group">
                <label>Stock</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="category-input"
                />
              </div>

              <div className="category-form-group">
                <label>Upload Image</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="category-input"
                />
              </div>

              {previewImage && (
                <div className="category-image-preview">
                  <img src={previewImage} alt="Preview" />
                </div>
              )}

              <button onClick={handleFormSubmit} className="category-submit-btn">
                {isEditMode ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryList;
