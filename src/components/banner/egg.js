import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../products/products.css";
import Navbar from "../navbar/navbar";

const Egg = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [active, setActive] = useState("egg");


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

        // Filter only products that contain "egg" in the title (case-insensitive)
        const eggProducts = response.data.filter((product) =>
          product.title.toLowerCase().includes("egg")
        );

        setProducts(eggProducts);
        setFilteredProducts(eggProducts);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Determine which products to display
  const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, 6);

  return (
    <>
    <Navbar/>
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
        <h2 className="section-title2">Egg Products</h2>

        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="product-grid">
            {displayedProducts.map((product) => (
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
                    <button className="add-to-cart">ADD TO CART</button>
                  </div>
                ) : (
                  <p className="unavailable">Currently unavailable.</p>
                )}
              </div>
            ))}
          </div>
        )}

        {!showAll && filteredProducts.length > 6 && (
          <button className="view-all" onClick={() => setShowAll(true)}>
            View All Products
          </button>
        )}
      </div>
      </div>
    </>
  );
};

export default Egg;
