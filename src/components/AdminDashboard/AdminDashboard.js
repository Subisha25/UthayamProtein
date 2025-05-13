import React, { useEffect, useState } from "react";
import '../AdminDashboard/AdminDashboard.css';
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";
import Breadcrumb from "./Breadcrumb";

const AdminProductDashboard = () => {

  const [categories, setCategories] = useState([]);


  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    originalRate: "",
    oldRate: "",
    stock: "",
    image: null,
    category: "", 
  });
  const [preview, setPreview] = useState(null);
  const [editId, setEditId] = useState(null);
  const [confirmEditPopup, setConfirmEditPopup] = useState({ visible: false, product: null });
  const [confirmDeletePopup, setConfirmDeletePopup] = useState({ visible: false, productId: null });

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:5000/api/categories");
    const data = await res.json();
    setCategories(data);
  };
  
  useEffect(() => {
    fetchProducts();
    fetchCategories(); // ← fetch categories on mount
  }, []);
  

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http://localhost:5000/api/products/update/${editId}`
      : "http://localhost:5000/api/products/create";

    const form = new FormData();
    form.append("title", formData.title);
    form.append("originalRate", formData.originalRate);
    form.append("oldRate", formData.oldRate);
    form.append("stock", formData.stock);
    form.append("category", formData.category);

    if (formData.image) form.append("image", formData.image);

    const res = await fetch(url, {
      method,
      body: form,
    });

    if (res.ok) {
      setFormData({ title: "", originalRate: "", oldRate: "", stock: "", image: null });
      setPreview(null);
      setEditId(null);
      setShowForm(false);
      fetchProducts();
    }
  };

  const handleEdit = (product) => {
    setFormData({
      title: product.title,
      originalRate: product.originalRate,
      oldRate: product.oldRate,
      stock: product.stock,
      image: null,
      category: product.category || "", // ← added this line
    });
    setPreview(`http://localhost:5000/uploads/${product.image}`);
    setEditId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    // const confirm = window.confirm("Are you sure you want to delete this product?");
    // if (!confirm) return;

    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });
    if (res.ok) fetchProducts();
  };

  return (
    <div className="admin-container">
                  <Breadcrumb current="Product List" />

      <h1 className="admin-title">Admin Dashboard - Products</h1>
      <button className="admin-add-btn" onClick={() => setShowForm(!showForm)}>
        <FaPlus className="faplus"/> Add New Product
      </button>

      {showForm && (
        <div class="form-wrapper"  style={{ position: 'relative' }}>
          
        <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form-header">
        <div></div> {/* placeholder to push the close icon to the right */}
        <Link className="admin-close" onClick={() => setShowForm(false)}>
          <RxCross2 size={22} />
        </Link>
      </div>
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} required />
          <select
  name="category"
  className="select-input"
  value={formData.category}
  onChange={handleInputChange}
  required
>
  <option value="">Select Category</option>
  {categories.map((item) => (
    <option key={item.id} value={item.category_name}>
      {item.category_name}
    </option>
  ))}
</select>

          <input type="number" name="originalRate" placeholder="Original Rate" value={formData.originalRate} onChange={handleInputChange} required />
          <input type="number" name="oldRate" placeholder="Old Rate" value={formData.oldRate} onChange={handleInputChange} />
          <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleInputChange} required />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && <img src={preview} alt="Preview" className="admin-image-preview" />}
          <button type="submit" className="admin-submit-btn">
            {editId ? "Update" : "Add"} Product
          </button>
        </form>
        </div>
      )}

{!showForm && (
  <table className="admin-table">
    <thead>
      <tr>
        <th>Image</th>
        <th>Category</th>
        <th>Title</th>
        <th>Original Rate</th>
        <th>Old Rate</th>
        <th>Stock</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {products.map((p) => (
        <tr key={p.id}>
          <td><img src={`http://localhost:5000/uploads/${p.image}`} className="admin-table-img" /></td>
          <td>{p.category}</td>

          <td>{p.title}</td>
          <td>{p.originalRate}</td>
          <td>{p.oldRate}</td>
          <td>{p.stock}</td>
          <td>
          <Link
  className="admin-edit-btn"
  onClick={() => setConfirmEditPopup({ visible: true, product: p })}
>
  <FaUserEdit />
</Link>
<Link
  className="admin-delete-btn"
  onClick={() => setConfirmDeletePopup({ visible: true, productId: p.id })}
>
  <MdDelete />
</Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}

{confirmEditPopup.visible && (
  <div className="admin-popup-overlay">
    <div className="admin-popup">
      <button
        className="admin-popup-close"
        onClick={() => setConfirmEditPopup({ visible: false, product: null })}
      >
        <RxCross2 size={20} />
      </button>

      <div className="admin-popup-header">
        <p>Do you want to edit this product?</p>
      </div>

      <div className="admin-popup-buttons">
        <button
          className="admin-popup-cancel"
          onClick={() => setConfirmEditPopup({ visible: false, product: null })}
        >
          Cancel
        </button>
        <button
          className="admin-popup-confirm"
          onClick={() => {
            handleEdit(confirmEditPopup.product);
            setConfirmEditPopup({ visible: false, product: null });
          }}
        >
          Edit
        </button>
      </div>
    </div>
  </div>
)}



{confirmDeletePopup.visible && (
  <div className="admin-popup-overlay">
    <div className="admin-popup">
    <button
        className="admin-popup-close"
        onClick={() => setConfirmDeletePopup({ visible: false, product: null })}
      >
        <RxCross2 size={20} />
      </button>

      <div className="admin-popup-header">
      <p>Are you sure you want to delete this product?</p>
      </div>

      <div className="admin-popup-buttons">
        <button
          className="admin-popup-cancel"
          onClick={() => setConfirmDeletePopup({ visible: false, productId: null })}
        >
          Cancel
        </button>
        <button
          className="admin-popup-confirm delete"
          onClick={async () => {
            await handleDelete(confirmDeletePopup.productId);
            setConfirmDeletePopup({ visible: false, productId: null });
          }}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

   
    </div>
  );
};

export default AdminProductDashboard;
