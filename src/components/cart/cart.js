// import React, { useEffect, useState } from "react";
// import "../orderdetails/orderdetails.css";
// import { FaRegFileAlt } from "react-icons/fa";
// import Delivery from '../assets/icon-park-outline_delivery.png';
// import { useNavigate } from "react-router-dom";
// import Navbar from "../navbar/navbar";
// import { useCart } from '../context/cartContext';
// import Products from "../products/products";
// import axios from "axios";

// const Cart = () => {
//   const { cartItems, removeFromCart } = useCart();
//   const [fetchedCartItems, setFetchedCartItems] = useState([]);

//   const [quantity, setQuantity] = useState(5);
//   const [addon, setAddon] = useState(2);
//   const navigate = useNavigate();
//   const DELIVERY_CHARGE = 30;
//   const GST_CHARGE = 50;

//   // Calculate total from cartItems
// // const itemTotal = cartItems.reduce((total, item) => {
// //   const quantity = item.quantity || 1;
// //   return total + (item.originalRate * quantity);
// // }, 0);

// const itemTotal = fetchedCartItems.reduce((total, item) => {
//   const quantity = item.quantity || 1;
//   return total + (item.originalRate * quantity);
// }, 0);
// const totalToPay = itemTotal + DELIVERY_CHARGE + GST_CHARGE;

// // const getCartItems = async () => {
// //   const cartId = localStorage.getItem("cartId");
// //   const res = await axios.get(`http://localhost:5000/api/cart/${cartId}`);
// //   console.log("Cart Items", res.data);
// // };



// useEffect(() => {
//   const fetchCartItems = async () => {
//     const cartId = localStorage.getItem("cartId");
//     if (!cartId) return;

//     try {
//       const res = await axios.get(`http://localhost:5000/api/cart/${cartId}`);
//       setFetchedCartItems(res.data); // ✅ store it in state
//     } catch (err) {
//       console.error("Error fetching cart items", err);
//     }
//   };

//   fetchCartItems();
// }, []);

//   return (
//     <>
//     <Navbar />

//     <div className="cart-container2">

//         <div className="left2">
//       <header className="cart-header2">
//          Cart Details
//       </header>


//       <div className="cart-items2">


//       {fetchedCartItems.map((item, index) => (
//         <div className="cart-item2" key={index}>
//           <img src={item.image} alt={item.title} className="item-image2" />

// <div className="item-details2">
//             <h3>{item.title}</h3>
//             <div className="price2">
//               <p className="current-price2">₹{item.originalRate}</p>
//               <p className="old-price2">₹{item.oldRate}</p>
//             </div>
//             <div className="dropdown-container2">
//               <select className="dropdown-select2">
//                 {[1, 2, 3, 4, 5].map((num) => (
//                   <option key={num} value={num}>
//                     {num} PCS
//                   </option>
//                 ))}
//               </select>
//               <select className="dropdown-select2">
//                 {[0, 1, 2, 3].map((num) => (
//                   <option key={num} value={num}>
//                     Add On ({num})
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <p className="removep" onClick={() => removeFromCart(item.id)}>REMOVE</p>
//           </div>
//         </div>
//       ))}
//       </div>
//       <button className="cartpay-now-btn2" 
//        onClick={() => navigate("/selectaddress", { state: { itemsToShow: fetchedCartItems } })}>Continue to Select Delivery address</button>

//       </div>

//       <div className="right2">
//       <div className="suggestion-container2">
//         <FaRegFileAlt className="suggestion-icon2" />
//         <textarea placeholder="Write any suggestions" className="suggestion-input2" />
//       </div>

//       <div className="price-details2">
//         <h3>Price Details ({fetchedCartItems.length} Items)</h3>

//         <div className="price-row2">
//           <p>Item Total</p>
//           <p>₹{itemTotal}</p>
//           </div>
//         <div className="price-row2">
//           <p>Delivery Charge</p>
//           <p>₹{DELIVERY_CHARGE}</p>
//           </div>
//         <div className="price-row2">
//           <p>GST Charge</p>
//           <p>₹{GST_CHARGE}</p>
//           </div>
//         {/* <hr /> */}
//         <div className="total-amount2">
//           <p>To Pay</p>
//           <p>₹{totalToPay}</p>
//           </div>
//         {/* <hr /> */}
//       </div>

// </div>
// <button className="cartpay-now-btn3" 
//  onClick={() => navigate("/selectaddress")}>Continue to Select Delivery address</button>

//     </div>
//     </>
//   );
// };

// export default Cart;

import React, { useEffect, useState } from "react";
import "../cart/cart.css";
import { FaRegFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import { useCart } from "../context/cartContext";
import axios from "axios";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const [fetchedCartItems, setFetchedCartItems] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const navigate = useNavigate();
  const DELIVERY_CHARGE = 30;
  const GST_CHARGE = 50;

  // Calculate total from cartItems
  const itemTotal = fetchedCartItems.reduce((total, item) => {
    const quantity = item.quantity || 1;
    return total + (item.originalRate * quantity);
  }, 0);
  const totalToPay = itemTotal + DELIVERY_CHARGE + GST_CHARGE;

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartId = localStorage.getItem("cartId");
      if (!cartId) return;

      try {
        const res = await axios.get(`http://localhost:5000/api/cart/${cartId}`);
        setFetchedCartItems(res.data); // ✅ store it in state
      } catch (err) {
        console.error("Error fetching cart items", err);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveClick = (item) => {
    setItemToRemove(item);  // Store the item to remove
    setIsPopupVisible(true); // Show the popup
  };

  const handleConfirmRemove = async () => {
    const cartId = localStorage.getItem("cartId");  // Assuming cartId is stored in localStorage
    if (!cartId || !itemToRemove) return;

    try {
      // Make the DELETE request to the backend
      await axios.delete(`http://localhost:5000/api/cart/${cartId}/item/${itemToRemove.id}`);

      // Update UI (remove item from the local state)
      setFetchedCartItems(fetchedCartItems.filter(item => item.id !== itemToRemove.id));
      setIsPopupVisible(false);  // Close the popup after item is removed
    } catch (err) {
      console.error("Error removing item", err);
    }
  };


  const handleCancelRemove = () => {
    setIsPopupVisible(false); // Hide the popup
  };

  return (
    <>
      <Navbar />
      <div className="cart-container2">
        <div className="left2">
          <header className="cart-header2">Cart Details</header>

          <div className="cart-items2">
            {fetchedCartItems.map((item, index) => (
              <div className="cart-item2" key={index}>
                <img src={item.image} alt={item.title} className="item-image2" />
                <div className="item-details2">
                  <h3>{item.title}</h3>
                  <div className="price2">
                    <p className="current-price2">₹{item.originalRate}</p>
                    <p className="old-price2">₹{item.oldRate}</p>
                  </div>
                  <div className="dropdown-container2">
                    <select className="dropdown-select2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num} PCS
                        </option>
                      ))}
                    </select>
                    <select className="dropdown-select2">
                      {[0, 1, 2, 3].map((num) => (
                        <option key={num} value={num}>
                          Add On ({num})
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="removep" onClick={() => handleRemoveClick(item)}>REMOVE</p>
                </div>
              </div>
            ))}
          </div>
          {fetchedCartItems.length > 0 ? (
            <button
              className="cartpay-now-btn2"
              onClick={() =>
                navigate("/selectaddress", { state: { itemsToShow: fetchedCartItems } })
              }
            >
              Continue to Select Delivery address
            </button>
          ) : (
            <p className="empty-cart-message2">No items in cart page</p>
          )}

          {/* <button className="cartpay-now-btn2" onClick={() => navigate("/selectaddress", { state: { itemsToShow: fetchedCartItems } })}>Continue to Select Delivery address</button> */}
        </div>

        <div className="right2">
          <div className="suggestion-container2">
            <FaRegFileAlt className="suggestion-icon2" />
            <textarea placeholder="Write any suggestions" className="suggestion-input2" />
          </div>

          <div className="price-details2">
            <h3>Price Details ({fetchedCartItems.length} Items)</h3>
            <div className="price-row2">
              <p>Item Total</p>
              <p>₹{fetchedCartItems.length > 0 ? itemTotal : 0}</p>
            </div>
            <div className="price-row2">
              <p>Delivery Charge</p>
              <p>₹{fetchedCartItems.length > 0 ? DELIVERY_CHARGE : 0}</p>
            </div>
            <div className="price-row2">
              <p>GST Charge</p>
              <p>₹{fetchedCartItems.length > 0 ? GST_CHARGE : 0}</p>
            </div>
            <div className="total-amount2">
              <p>To Pay</p>
              <p>₹{fetchedCartItems.length > 0 ? totalToPay : 0}</p>
            </div>
          </div>
        </div>

        {fetchedCartItems.length > 0 ? (
          <button
            className="cartpay-now-btn3"
            onClick={() =>
              navigate("/selectaddress", { state: { itemsToShow: fetchedCartItems } })
            }
          >
            Continue to Select Delivery address
          </button>
        ) : (
          <p className="empty-cart-message">No items in cart page</p>
        )}

        {/* <button className="cartpay-now-btn3" onClick={() => navigate("/selectaddress")}>Continue to Select Delivery address</button> */}
      </div>

      {/* Popup Modal */}
      {isPopupVisible && (
        <div className="popup">
          <div className="popup-contentremove">
            <h3>Are you sure you want to remove this item from your cart?</h3>
            <div className="popup-buttons">
              <button onClick={handleCancelRemove}>Cancel</button>
              <button onClick={handleConfirmRemove}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
