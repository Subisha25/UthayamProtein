
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../products/products.css";
// import Quality from "../quality/quality";
import Testimonials from "../testimonials/testimonials";
// import Banner from "../banner/banner";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products/");
        console.log("Products Data:", response.data); // Debug log
        setProducts(response.data);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {/* <Banner /> */}
      <div className="product-section">
        {/* <p className="store-title">ONLINE STORE</p> */}
        <h2 className="section-title2">Recommended Products</h2>

        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                {product.tag && <span className="tag">{product.tag}</span>}
                <img
                  src={`http://localhost:3000/${product.image}`}
                  alt={product.title}  
                  className="product-image"
                  onClick={() => navigate("/productdetails", { state: { product } })}
                  style={{ cursor: "pointer" }}
                />
                <h3 className="product-name">{product.title}</h3>

                {product.stock ? (
                  <div className="price-cart-container">
                    <p className="price">
                      {product.rate} <span className="original-price"></span>
                    </p>
                    <button className="add-to-cart">ADD TO CART</button>
                  </div>
                ) : (
                  <p className="unavailable">Currently unavailable.</p>
                )}
              </div>
            ))}
          </div>
        )}

        <button className="view-all">View All Products</button>
      </div>
      {/* <Quality /> */}
      <Testimonials />
    </>
  );
};

export default Products;
  