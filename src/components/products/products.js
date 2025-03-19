import React from "react";
import { useNavigate } from "react-router-dom";
import "../products/products.css";
import Quality from "../quality/quality";
import Testimonials from "../testimonials/testimonials";
import image1 from "../products/images/Mask group (1).png";
import image2 from "../products/images/Mask group (2).png";
import image3 from "../products/images/Mask group (3).png";
import image4 from "../products/images/Mask group (4).png";
import image5 from "../products/images/Mask group (5).png";
import image6 from "../products/images/Mask group (6).png";
import Banner from "../banner/banner";

const products = [
  {
    id: 1,
    name: "Chicken Drumstick Sampler Pack – 5 Pcs",
    price: "₹260",
    originalPrice: "₹300",
    image: image1,
    tag: "Limited time Offer",
    available: true,
  },
  {
    id: 2,
    name: "Roast Chicken",
    price: "",
    originalPrice: "",
    image: image2,
    available: false,
  },
  {
    id: 3,
    name: "Chicken Chunks",
    price: "₹250",
    originalPrice: "₹290",
    image: image3,
    tag: "Popular",
    available: true,
  },
  {
    id: 4,
    name: "Egg (Nattukoli) – 10 Ns",
    price: "₹150",
    originalPrice: "₹180",
    image: image4,
    available: true,
  },
  {
    id: 5,
    name: "Chicken Leg – 1 KG",
    price: "₹220",
    originalPrice: "₹190",
    image: image5,
    available: true,
  },
  {
    id: 6,
    name: "Whole Chicken Roaster (Without Skin)",
    price: "₹250",
    originalPrice: "₹280",
    image: image6,
    available: true,
  },
];

const Products = () => {
  const navigate = useNavigate();

  return (
    <>
    <Banner/>
      <div className="product-section">
        <p className="store-title">ONLINE STORE</p>
        <h2 className="section-title2">Our Popular Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {product.tag && <span className="tag">{product.tag}</span>}
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
                onClick={() => navigate("/productdetails", { state: { product } })}
                style={{ cursor: "pointer" }}
              />
              <h3 className="product-name">{product.name}</h3>

              {product.available ? (
                <div className="price-cart-container">
                  <p className="price">
                    {product.price} <span className="original-price">{product.originalPrice}</span>
                  </p>
                  <button className="add-to-cart">ADD TO CART</button>
                </div>
              ) : (
                <p className="unavailable">Currently unavailable.</p>
              )}
            </div>
          ))}
        </div>
        <button className="view-all">View All Products</button>
      </div>
      <Quality />
      <Testimonials />
    </>
  );
};

export default Products;
