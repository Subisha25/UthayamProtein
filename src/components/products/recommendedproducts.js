
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../products/products.css";
// // import Quality from "../quality/quality";
// import Testimonials from "../testimonials/testimonials";
// // import Banner from "../banner/banner";

// const Recommendedproducts = () => {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//     const [showAll, setShowAll] = useState(false); // State to track whether all products should be shown

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/products/");
//         console.log("Products Data:", response.data); // Debug log
//         setProducts(response.data);
//       } catch (err) {
//         console.error("Failed to load products:", err);
//         setError("Failed to load products.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);
//    // Show only first 6 products initially
//    const displayedProducts = showAll ? products : products.slice(0, 6);


//   return (
//     <>
//       {/* <Banner /> */}
//       <div className="product-section">
//         {/* <p className="store-title">ONLINE STORE</p> */}
//         <h2 className="section-title2">Recommended Products</h2>

//         {loading ? (
//           <p>Loading products...</p>
//         ) : error ? (
//           <p className="error">{error}</p>
//         ) : (
//           <div className="product-grid">
//             {displayedProducts.map((product) => (
//               <div key={product.id} className="product-card">
//                 {product.tag && <span className="tag">{product.tag}</span>}
//                 <img
//                   src={`http://localhost:5000/uploads/${product.image}`}
//                   alt={product.title}  
//                   className="product-image"
//                   onClick={() => navigate("/productdetails", { state: { product } })}
//                   style={{ cursor: "pointer" }}
//                 />
//                 <h3 className="product-name">{product.title}</h3>

//                 {product.stock ? (
//                   <div className="price-cart-container">
//                         <div className="price-container1">
//             <span className="price2">₹{product.originalRate}</span>
//             <span className="old-price1">₹{product.oldRate}</span>
//           </div>
//                     <button className="add-to-cart">ADD TO CART</button>
//                   </div>
//                 ) : (
//                   <p className="unavailable">Currently unavailable.</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

// {!showAll && products.length > 6 && (
//           <button className="view-all" onClick={() => setShowAll(true)}>
//             View All Products
//           </button>
//         )}      </div>
//       {/* <Quality /> */}
//       <Testimonials />
//     </>
//   );
// };

// export default Recommendedproducts;
  
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../products/products.css";
import Testimonials from "../testimonials/testimonials";
import { useCart } from '../context/cartContext'; // ✅ import useCart

const Recommendedproducts = () => {
  const navigate = useNavigate();
  const { addToCartBtn } = useCart(); // ✅ access cart context

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products/");
        console.log("Products Data:", response.data);
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

  const displayedProducts = showAll ? products : products.slice(0, 6);

  // ✅ Add to cart handler
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

  return (
    <>
      <div className="product-section">
        <h2 className="section-title2">Recommended Products</h2>

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
                    <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
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

        {!showAll && products.length > 6 && (
          <button className="view-all" onClick={() => setShowAll(true)}>
            View All Products
          </button>
        )}
      </div>

      <Testimonials />
    </>
  );
};

export default Recommendedproducts;
