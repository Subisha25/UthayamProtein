import React, { useEffect, useState } from 'react';
import { FaMoneyBill, FaShoppingCart, FaUsers } from 'react-icons/fa';
import './DashboardContent.css';
import OrderChart from './OrderChart';
import YearlyOrderChart from './YearlyOrderChart';
import Breadcrumb from './Breadcrumb';
import axios from 'axios';

const DashboardContent = () => {
  const [orderCount, setOrderCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);



  useEffect(() => {
    const fetchCount = async () => {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProductCount(data.length);
    };
    fetchCount();
  }, []);
  

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/delivery-address/");
        const data = await res.json();
        setCustomerCount(data.length);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
  
    fetchCustomers();
  }, []);
  

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/orders');
        setOrderCount(response.data.length);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const cards = [
    {
      title: 'Order Total',
      value: orderCount.toString(),
      percent: 'Saved 23%',
      bgColor: '#3B82F6',
      icon: <FaShoppingCart />,
    },
    {
      title: 'Product Total',
      value: productCount.toString(),
      percent: 'Saved 23%',
      bgColor: '#60A5FA',
      icon: <FaMoneyBill />,
    },
    {
      title: 'Customer Total',
      value: customerCount.toString(),
      percent: 'Saved 20%',
      bgColor: '#A78BFA',
      icon: <FaUsers />,
    },
  ];

  return (
    <>
      <Breadcrumb current="Dashboard" />
      <div className="dashboard-grid">
        {cards.map((card, index) => (
          <div className="dashboard-card" style={{ backgroundColor: card.bgColor }} key={index}>
            <div className="dashboard-card-icon">{card.icon}</div>
            <div className="dashboard-card-title">{card.title}</div>
            <div className="dashboard-card-value">{card.value}</div>
          </div>
        ))}
      </div>
      <OrderChart />
      <YearlyOrderChart />
    </>
  );
};

export default DashboardContent;
