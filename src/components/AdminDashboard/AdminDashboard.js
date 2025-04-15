import React, { useEffect, useState } from "react";
import '../AdminDashboard/AdminDashboard.css';
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";


const AdminProductDashboard = () => {

  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    originalRate: "",
    oldRate: "",
    stock: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [editId, setEditId] = useState(null);

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
    });
    setPreview(`http://localhost:5000/uploads/${product.image}`);
    setEditId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });
    if (res.ok) fetchProducts();
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard - Products</h1>
      <button className="admin-add-btn" onClick={() => setShowForm(!showForm)}>
        ➕ Add New Product
      </button>

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} required />
          <input type="number" name="originalRate" placeholder="Original Rate" value={formData.originalRate} onChange={handleInputChange} required />
          <input type="number" name="oldRate" placeholder="Old Rate" value={formData.oldRate} onChange={handleInputChange} />
          <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleInputChange} required />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && <img src={preview} alt="Preview" className="admin-image-preview" />}
          <button type="submit" className="admin-submit-btn">
            {editId ? "Update" : "Add"} Product
          </button>
        </form>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
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
              <td>{p.title}</td>
              <td>{p.originalRate}</td>
              <td>{p.oldRate}</td>
              <td>{p.stock}</td>
              <td>
                <Link className="admin-edit-btn" onClick={() => handleEdit(p)}><FaUserEdit /></Link>
                <Link className="admin-delete-btn" onClick={() => handleDelete(p.id)}><MdDelete /></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductDashboard;
