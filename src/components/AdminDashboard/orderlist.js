// import React, { useEffect, useState } from "react";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import "./orderlist.css";
// import Breadcrumb from "./Breadcrumb";
// import axios from "axios";
// import { HiMiniNumberedList } from "react-icons/hi2";
// import { FaUsers } from "react-icons/fa";
// import { FaPhoneAlt } from "react-icons/fa";
// import { AiFillProduct } from "react-icons/ai";
// import { IoIosPricetags } from "react-icons/io";
// import { TbTruckDelivery } from "react-icons/tb";
// import Action from '../assets/double-tap.png';
// import GST from '../assets/save (1).png';
// import Total from '../assets/price-tag.png';
// import Price from '../assets/best-price.png';


// const OrderList = () => {
//   const [ordersData, setOrdersData] = useState([]);

//   const handleDelete = async (orderId) => {
//     try {
//       // Call the DELETE API to delete the order
//       await axios.delete(`http://localhost:5000/orders/orders/${orderId}`);
      
//       // Remove the deleted order from the state
//       setOrdersData((prevOrders) => prevOrders.filter(order => order.id !== orderId));
      
//       console.log(`Order with ID ${orderId} deleted successfully.`);
//     } catch (error) {
//       console.error("Error deleting order:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/orders");
//         console.log("data : ", response.data);
//         setOrdersData(response.data); // Make sure this matches your backend return format
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div className="order-wrapper">
//       <Breadcrumb current="Order List" />
//       <div className="header-bar">
//         <h2 className="table-title">Order List</h2>
//       </div>

//       <table className="styled-table">
//         <thead>
//           <tr>
//             <th><HiMiniNumberedList  className="order-icon" /></th>
//             <th><FaUsers  className="order-icon"/></th>
//             <th><FaPhoneAlt  className="order-icon"/></th>
//             <th>Product Name</th>
//             <th><img src={Total} alt="" className="order-icons" /></th>
//             <th><TbTruckDelivery  className="order-icon"/></th>
//             <th><img src={GST} alt="" className="order-icons"/></th>
//             <th><img src={Price} alt="" className="order-icons" /></th>
           
//             <th><img src={Action} alt="" className="order-icons" /></th>
//           </tr>
//         </thead>
//         <tbody>
//           {ordersData.map((order, index) => {
//             const totalAmount = order.totalAmount ?? 0;
//             const deliveryCharge = order.deliveryCharge ?? 0;
//             const productName = order.products?.[0]?.name || "-";
//             const productPrice = order.products?.[0]?.price || 0;
//             const customerName = order.address?.name || "-";
//             const gstCharge = order.gstCharge ?? 0 ;
//             const phone = order.address?.phone || "-";
            
//             const createdAt = new Date(order.createdAt).toLocaleDateString();

//             return (
//               <tr key={order.id}>
//                 <td>{index + 1}</td>
//                 <td>{customerName}</td>
//                 <td>{phone}</td>
//                 <td>{productName}</td>
//                 <td>₹{productPrice}</td>
//                 <td>₹{deliveryCharge}</td>
//                 <td>₹{gstCharge}</td>

//                 <td>₹{totalAmount}</td>
//                 <td className="action-icons">
//                   <FaEdit className="icon edit-icon" title="Edit" />
//                   <FaTrash className="icon delete-icon" title="Delete"  onClick={() => handleDelete(order.id)}  />
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default OrderList;


import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./orderlist.css";
import Breadcrumb from "./Breadcrumb";
import axios from "axios";
import { HiMiniNumberedList } from "react-icons/hi2";
import { FaUsers, FaPhoneAlt } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import Action from '../assets/double-tap.png';
import GST from '../assets/save (1).png';
import Total from '../assets/price-tag.png';
import Price from '../assets/best-price.png';
import Delivery from '../assets/box (1).png';





const OrderList = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/orders");
        setOrdersData(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowPopup(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/orders/orders/${deleteId}`);
      setOrdersData((prevOrders) => prevOrders.filter(order => order.id !== deleteId));
      setShowPopup(false);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="order-wrapper">
      <Breadcrumb current="Order List" />
      <div className="header-bar">
        <h2 className="table-title">Order List</h2>
      </div>

      <table className="styled-table">
        <thead>
          <tr>
            <th><HiMiniNumberedList className="order-icon" /></th>
            <th><FaUsers className="order-icon" /></th>
            <th><FaPhoneAlt className="order-icon" /></th>
            <th>Product Name</th>
            <th><img src={Total} alt="" className="order-icons" /></th>
            <th><img src={Delivery} alt="" className="order-icons" /></th>
            <th><img src={GST} alt="" className="order-icons" /></th>
            <th><img src={Price} alt="" className="order-icons" /></th>
            <th><img src={Action} alt="" className="order-icons" /></th>
          </tr>
        </thead>
        <tbody>
          {ordersData.map((order, index) => {
            const totalAmount = order.totalAmount ?? 0;
            const deliveryCharge = order.deliveryCharge ?? 0;
            const productName = order.products?.[0]?.name || "-";
            const productPrice = order.products?.[0]?.price || 0;
            const customerName = order.address?.name || "-";
            const gstCharge = order.gstCharge ?? 0;
            const phone = order.address?.phone || "-";

            return (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{customerName}</td>
                <td>{phone}</td>
                <td>{productName}</td>
                <td>₹{productPrice}</td>
                <td>₹{deliveryCharge}</td>
                <td>₹{gstCharge}</td>
                <td>₹{totalAmount}</td>
                <td className="action-icons">
                  {/* <FaEdit className="icon edit-icon" title="Edit" /> */}
                  <FaTrash
                    className="icon delete-icon"
                    title="Delete"
                    onClick={() => confirmDelete(order.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showPopup && (
  <div className="orderlist-popup-overlay">
    <div className="orderlist-popup">
      <span
        className="orderlist-popup-close"
        onClick={() => setShowPopup(false)}
        title="Close"
      >
        &times;
      </span>
      <p>Are you sure you want to delete this order?</p>
      <div className="orderlist-popup-buttons">
        <button className="orderlist-btn orderlist-confirm" onClick={handleDelete}>
          Yes
        </button>
        <button className="orderlist-btn orderlist-cancel" onClick={() => setShowPopup(false)}>
          No
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default OrderList;
