import React from 'react';
import { FaMoneyBill, FaShoppingCart, FaUsers, FaGift } from 'react-icons/fa';
import './DashboardContent.css'; // we'll write styles here

const cards = [
  {
    title: 'Order Total',
    value: '10',
    percent: 'Saved 23%',
    bgColor: '#3B82F6',
    icon: <FaShoppingCart />,
  },
  {
    title: 'Product Total',
    value: '7',
    percent: 'Saved 23%',
    bgColor: '#60A5FA',
    icon:<FaMoneyBill /> ,
  },
  {
    title: 'Customer Total',
    value: '15',
    percent: 'Saved 20%',
    bgColor: '#A78BFA',
    icon: <FaUsers />,
  },

];

const DashboardContent = () => {
  return (
    <div className="dashboard-grid">
      {cards.map((card, index) => (
        <div className="dashboard-card" style={{ backgroundColor: card.bgColor }} key={index}>
          <div className="dashboard-card-icon">{card.icon}</div>
          <div className="dashboard-card-title">{card.title}</div>
          <div className="dashboard-card-value">{card.value}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardContent;
