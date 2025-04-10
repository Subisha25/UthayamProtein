import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../products/products.css";
import Navbar from "../navbar/navbar";

const Kadai = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("kadai");
  const [error, setError] = useState("");


  const switches = [
    { label: "all", route: "/all" },
    { label: "chicken", route: "/chicken" },
    { label: "egg", route: "/egg" },
    { label: "kadai", route: "/kadai" },
  ];

  const handleClick = (item) => {
    setActive(item.label);
    navigate(item.route); // 🔥 navigate to the route
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products/");
        console.log("Products Data:", response.data);

        // Keywords to filter products
        const keywords = ["kadai", "kaada", "kaadai"];

        // Filter products that contain any of the keywords in the title
        const kadaiProducts = response.data.filter((product) =>
          keywords.some((keyword) => product.title.toLowerCase().includes(keyword))
        );

        setProducts(kadaiProducts);
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
    <Navbar />
    <div className="allproducts">
    <div className="product-section2">
    <div className="allproducts-container">
      <div className="allproducts-switch-group">
        {switches.map((item) => (
          <span
            key={item.label}
            className={`allproducts-switch-btn ${active === item.label ? "active" : ""}`}
            onClick={() => handleClick(item)}
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>

      <p className="store-title">ONLINE STORE</p>
      <h2 className="section-title2">Kadai Products</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : products.length === 0 ? (
        <p>No matching products found.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {product.tag && <span className="tag">{product.tag}</span>}
              
              <img 
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.title}
                className="product-image"
                onClick={() => navigate("/productdetails", { state: { product } })}
                style={{ cursor: "pointer" }}
              />
              <h3 className="product-name">{product.title}</h3>

              {product.stock ? (
                <div className="price-cart-container">
                  <div className="price-container1">
                    <span className="price2">₹{product.originalRate}</span>
                    <span className="old-price1">₹{product.oldRate}</span>
                  </div>
                  <button 
                    className="add-to-cart"
                    onClick={() => console.log("Adding to cart:", product)}
                  >
                    ADD TO CART
                  </button>
                </div>
              ) : (
                <p className="unavailable">Currently unavailable.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
    </>
  );
};

export default Kadai;
