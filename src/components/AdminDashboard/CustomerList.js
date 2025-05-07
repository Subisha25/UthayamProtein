import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./CustomerList.css";
import Breadcrumb from "./Breadcrumb";
const initialCustomersData = [
  {
    id: 1,
    name: "Ravi Kumar",
    phone: "9876543210",
    address1: "No.10, Anna Nagar,Near City Center,Chennai",
    address2: "",
    address3: "",
    state: "Tamil Nadu",
  },
  {
    id: 2,
    name: "Meena Raj",
    phone: "8765432190",
    address1: "15/2, KK Nagar,Opposite Bus Stand,Madurai",
    address2: "",
    address3: "",
    state: "Tamil Nadu",
  },
  {
    id: 3,
    name: "Suresh Babu",
    phone: "7654321980",
    address1: "23, Gandhipuram,Near Railway Station,Coimbatore",
    address2: "",
    address3: "",
    state: "Tamil Nadu",
  },
  {
    id: 4,
    name: "Divya",
    phone: "9988776655",
    address1: "7, Salem Town,Near New Bus Stand,Salem",
    address2: "",
    address3: "",
    state: "Tamil Nadu",
  },
];

const CustomerList = () => {
  const [customers, setCustomers] = useState(initialCustomersData);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      setCustomers(customers.filter((customer) => customer.id !== id));
    }
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((cust) =>
        cust.id === editingCustomer.id ? editingCustomer : cust
      )
    );
    setEditingCustomer(null);
  };

  const handleClose = () => {
    setEditingCustomer(null);
  };

  return (
    <div className="customer-wrapper">
                  <Breadcrumb current="Customer List" />
      
      <div className="header-bar">
        <h2 className="table-title">Customer List</h2>
      </div>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Serial No</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address 1</th>
            <th>Address 2</th>
            <th>Address 3</th>
            <th>State</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer.id}>
              <td>{index + 1}</td>
              <td>{customer.name}</td>
              <td>{customer.phone}</td>
              <td>{customer.address1}</td>
              <td>{customer.address2}</td>
              <td>{customer.address3}</td>
              <td>{customer.state}</td>
              <td className="action-icons">
                <FaEdit
                  className="icon edit-icon"
                  title="Edit"
                  onClick={() => handleEdit(customer)}
                />
                <FaTrash
                  className="icon delete-icon"
                  title="Delete"
                  onClick={() => handleDelete(customer.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Modal */}
      {editingCustomer && (
        <div className="modal-overlay2">
          <div className="modal2">
            <h2>Edit Customer</h2>
            <input
              type="text"
              name="name"
              value={editingCustomer.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <input
              type="text"
              name="phone"
              value={editingCustomer.phone}
              onChange={handleChange}
              placeholder="Phone"
            />
            <input
              type="text"
              name="address1"
              value={editingCustomer.address1}
              onChange={handleChange}
              placeholder="Address 1"
            />
            <input
              type="text"
              name="address2"
              value={editingCustomer.address2}
              onChange={handleChange}
              placeholder="Address 2"
            />
            <input
              type="text"
              name="address3"
              value={editingCustomer.address3}
              onChange={handleChange}
              placeholder="Address 3"
            />
            <input
              type="text"
              name="state"
              value={editingCustomer.state}
              onChange={handleChange}
              placeholder="State"
            />
            <div className="modal-buttons2">
              <button className="update-btn2" onClick={handleUpdate}>
                Update
              </button>
              <button className="cancel-btn2" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
