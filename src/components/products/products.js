import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../products/products.css";
import Quality from "../quality/quality";
import Testimonials from "../testimonials/testimonials";
import Banner from "../banner/banner";
import { useCart } from '../context/cartContext';
import Navbar from "../navbar/navbar";

const Products = () => {
  const { addToCartBtn } = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [active, setActive] = useState("all");

const switches = [
    { label: "all", route: "/products" },
    { label: "chicken", route: "/chicken" },
    { label: "egg", route: "/egg" },
    { label: "kadai", route: "/kadai" },
  ];

  const handleClick = (item) => {
    setActive(item.label);
    navigate(item.route); // 🔥 navigate to the route
  };


  const handleAddToCart = (product) => {
    const cartProduct = {
      id: product.id,
      image: `http://localhost:5000/uploads/${product.image}`,
      title: product.title,
      originalRate: product.originalRate,
      oldRate: product.oldRate,
    };
    addToCartBtn(cartProduct);
  };




  useEffect(() => {
    const fetchProducts = async () => {
      
      try {
        const response = await axios.get("http://localhost:5000/api/products/");
        console.log("Products Data:", response.data);
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle search results from Banner component
  const handleSearch = (results, query) => {
    setSearchQuery(query);
    
    if (query && results.length > 0) {
      setFilteredProducts(results);
      setSearchMode(true);
    } else {
      setFilteredProducts(products);
      setSearchMode(false);
    }
  };

  // Determine which products to display
  const displayedProducts = searchMode 
    ? filteredProducts 
    : (showAll ? products : products.slice(0, 6));

  // Add to cart functionality (stub - implement as needed)
  const addToCart = (product) => {
    console.log("Adding to cart:", product);
    // Implement cart functionality here
  };

  return (
    <>
      {/* <Banner onSearch={handleSearch} showSearchResults={searchMode} /> */}
     

      <div className={`product-section ${searchMode ? 'search-results-view' : ''}`}>
        {!searchMode && (
          <>
            <p className="store-title">ONLINE STORE</p>
            <h2 className="section-title2">Our Popular Products</h2>
          </>
        )}

        {searchMode && (
          <h2 className="search-results-title">
            {searchQuery ? `Search Results for "${searchQuery}"` : "All Products"}
          </h2>
        )}

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
                    {/* // Use handleAddToCart in button */}
                    <button  className="add-to-cart" onClick={() => handleAddToCart(product)}>ADD TO CART</button>
                    {/* <button 
                      className="add-to-cart"
                      onClick={() => addToCart(product)}
                    >
                      ADD TO CART
                    </button> */}
                  </div>
                ) : (
                  <p className="unavailable">Currently unavailable.</p>
                )}
              </div>
            ))}
          </div>
        )}

        {!searchMode && !showAll && products.length > 6 && (
          <button className="view-all" onClick={() => setShowAll(true)}>
            View All Products
          </button>
        )}
      </div>
      
      {/* {!searchMode && (
        <>
          <Quality />
          <Testimonials />
        </>
      )} */}
    </>
  );
};

export default Products;