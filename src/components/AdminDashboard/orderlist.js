import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./orderlist.css";
import Breadcrumb from "./Breadcrumb";

const ordersData = [
  {
    id: 1,
    customerName: "Ravi Kumar",
    phone: "9876543210",
    address: "Chennai, Tamil Nadu",
    productName: "Chicken Chunks",
    productPrice: 250,
    deliveryCharge: 50,
    orderDate: "2025-04-20",
  },
  {
    id: 2,
    customerName: "Meena Raj",
    phone: "8765432190",
    address: "Madurai, Tamil Nadu",
    productName: "Egg (Nattukoli) – 10 Ns",
    productPrice: 150,
    deliveryCharge: 30,
    orderDate: "2025-04-18",
  },
  {
    id: 3,
    customerName: "Suresh Babu",
    phone: "7654321980",
    address: "Coimbatore, Tamil Nadu",
    productName: "Chicken Leg – 1 KG",
    productPrice: 220,
    deliveryCharge: 40,
    orderDate: "2025-04-15",
  },
  {
    id: 4,
    customerName: "Divya",
    phone: "9988776655",
    address: "Salem, Tamil Nadu",
    productName: "Roast Chicken",
    productPrice: 300,
    deliveryCharge: 50,
    orderDate: "2025-04-10",
  },
];

const OrderList = () => {
  return (
    <div className="order-wrapper">
                  <Breadcrumb current="Order List" />

      <div className="header-bar">
        <h2 className="table-title">Order List</h2>
      </div>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Serial No</th>
            <th>Customer Name</th>
            <th>Phone</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Delivery Charge</th>
            <th>Total Amount</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ordersData.map((order, index) => {
            const totalAmount = order.productPrice + order.deliveryCharge;
            return (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.customerName}</td>
                <td>{order.phone}</td>
                <td>{order.productName}</td>
                <td>₹{order.productPrice}</td>
                <td>₹{order.deliveryCharge}</td>
                <td>₹{totalAmount}</td>
                <td>{order.orderDate}</td>
                <td className="action-icons">
                  <FaEdit className="icon edit-icon" title="Edit" />
                  <FaTrash className="icon delete-icon" title="Delete" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
