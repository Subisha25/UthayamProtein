import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import Recommendedproducts from "./recommendedproducts";
import "../products/productdetails.css";
import thumb1 from "../products/images/Mask group (1).png";
import thumb2 from "../products/images/Mask group (2).png";
import thumb3 from "../products/images/Mask group (3).png";


const ProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedProduct = location.state?.product;
  const [activeTab, setActiveTab] = useState("Details");
  const selectedProducts = {
    image: "images/main.jpg",
    thumbnailImages: [thumb1, thumb2, thumb3] // Use imported images

  };
  
  if (!selectedProduct) {
    navigate("/");
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="product-container">
        {/* Product Image Gallery */}
        <div className="image-gallery-wrapper">
        <div className="image-gallery">
  {/* Main Image (Centered) */}
  <div className="main-image-container">
    <img
      src={`http://localhost:3000/${selectedProduct.image}`}
      alt={selectedProduct.name}
      className="main-image"
    />
  </div>

  {/* Thumbnails (Aligned to the Left) */}
  <div className="thumbnail-container">
    {selectedProducts.thumbnailImages.map((thumbnail, index) => (
      <img 
        key={index} 
        src={thumbnail} 
        alt="thumbnail" 
        className="thumbnail" 
      />
    ))}
  </div>
</div>
  {/* Add to Cart & Buy Now Buttons */}
  <div className="button-container">
            <button className="add-to-cart-btn">ADD TO CART</button>
            <button className="buy-now-btn">BUY IT NOW</button>
          </div>


</div>




        {/* Product Details */}
        <div className="product-details">
          
        <h2 className="product-title">{selectedProduct.title}</h2>
        <div className="price-container">
            <span className="price1">₹{selectedProduct.rate}</span>
            <span className="old-price">₹{selectedProduct.originalPrice}</span>
          </div>
          {selectedProduct.tag && <div className="offer-tag">Limited time Offer</div>}
          <p className="stock-status">In Stock</p>

          <label className="dropdown-label">Pieces</label>
          <select className="dropdown">
            <option>5 PCS</option>
            <option>10 PCS</option>
            <option>15 PCS</option>
          </select>

          <label className="dropdown-label">Bought together (Optional)</label>
          <select className="dropdown1">
            <option>Select your Add On</option>
            <option>Spices</option>
            <option>Marination</option>
          </select>
{/* Mobile Buttons (below dropdowns) */}
<div className="mobile-button-container">
  <button className="add-to-cart-btn">ADD TO CART</button>
  <button className="buy-now-btn">BUY IT NOW</button>
</div>

     

          {/* Tabs for Details and Reviews */}
          <div className="tab-container">
            <span
              className={activeTab === "Details" ? "tab active" : "tab"}
              onClick={() => setActiveTab("Details")}
            >
              Details
            </span>
            <span
              className={activeTab === "Reviews" ? "tab active" : "tab"}
              onClick={() => setActiveTab("Reviews")}
            >
              Reviews
            </span>
          </div>
          <div className="product-description">
            {activeTab === "Details" ? (
              <p>
                I bought meat at their shop. They provide fresh, organic meat
                sourced from their farm.
              </p>
            ) : (
              <p>
                The quality is excellent! Fresh, organic, and tastes amazing.
                Organic meat sourced from their farm.
              </p>
            )}
          </div>
        </div>
      </div>
      <Recommendedproducts />
    </>
  );
};

export default ProductDetails;
