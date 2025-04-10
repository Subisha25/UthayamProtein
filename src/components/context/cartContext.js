// import React, { createContext, useContext, useState } from 'react';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCartBtn = (product) => {
//     setCartItems((prev) => [...prev, product]);
//   };

//   const removeFromCart = (productId) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== productId));
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCartBtn, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);



// import React, { createContext, useContext, useState, useEffect } from 'react';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   // ✅ Load cart items from backend (GET)
//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const res = await fetch('http://localhost:5000/api/products'); // changed here
//         const data = await res.json();
//         setCartItems(data);
//       } catch (err) {
//         console.error('Failed to fetch cart items', err);
//       }
//     };
//     fetchCartItems();
//   }, []);

//   // ✅ Add to cart (POST to /products/create)
//   const addToCartBtn = async (product) => {
//     const isAlreadyInCart = cartItems.find(item => item.id === product.id);
//     if (isAlreadyInCart) return;

//     const newItem = { ...product, quantity: 1 };
//     setCartItems((prev) => [...prev, newItem]);

//     try {
//       await fetch('http://localhost:5000/api/products/create', { // changed here
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newItem),
//       });
//     } catch (err) {
//       console.error('Failed to add item to backend cart', err);
//     }
//   };

//   // ✅ Remove from cart (if needed – optional backend route)
//   const removeFromCart = async (productId) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== productId));

//     try {
//       await fetch(`http://localhost:5000/api/products/${productId}`, {
//         method: 'DELETE',
//       });
//     } catch (err) {
//       console.error('Failed to remove item from backend cart', err);
//     }
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCartBtn, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);


import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ✅ Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // ✅ Save cart items to localStorage whenever cartItems changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('cartItems'); // Clean up if cart is empty
    }
  }, [cartItems]);

  const addToCartBtn = async (product) => {
    const isAlreadyInCart = cartItems.find(item => item.id === product.id);
    if (isAlreadyInCart) return;

    const newItem = { ...product, quantity: 1 };
    const updatedCart = [...cartItems, newItem];
    setCartItems(updatedCart);

    try {
      await fetch('http://localhost:5000/api/products/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });
    } catch (err) {
      console.error('Failed to add item to backend cart', err);
    }
  };

  const removeFromCart = async (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);

    try {
      await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.error('Failed to remove item from backend cart', err);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCartBtn, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
