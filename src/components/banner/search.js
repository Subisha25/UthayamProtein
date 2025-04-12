// src/pages/SearchPage.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialQuery = location.state?.query || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = async (query) => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/products/?search=${query}`);
      const filtered = response.data.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults(searchQuery);
  }, [searchQuery]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClose = () => {
    navigate(-1); // go back to previous page
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          className="search-input"
          placeholder="Search products..."
          autoFocus
        />
        <button className="close-btn2" onClick={handleClose}>✖</button>
      </div>

      {loading && <div className="search-loading">Loading...</div>}

      {searchQuery && searchResults.length > 0 && (
        <div className="search-results">
          <div className="search-results-grid">
            {searchResults.map((product) => (
              <div key={product.id} className="search-product-card">
                {product.tag && <span className="tag">{product.tag}</span>}
                <img
                  src={`http://localhost:5000/uploads/${product.image}`}
                  alt={product.title}
                  className="search-product-image"
                />
                <h3 className="search-product-name">{product.title}</h3>
                {product.stock ? (
                  <div className="search-price-cart-container">
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
        </div>
      )}

      {searchQuery && searchResults.length === 0 && !loading && (
        <div className="no-results">No products found matching "{searchQuery}"</div>
      )}
    </div>
  );
};

export default Search;
