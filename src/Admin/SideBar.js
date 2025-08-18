import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiPackage,
  FiUsers,
  FiGrid,
  FiMail,
  FiMessageSquare,
} from 'react-icons/fi';
import logo from '../assets/logo.png'; 

const Sidebar = () => {
  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: <FiHome /> },
    { path: '/admin/products', label: 'Products', icon: <FiPackage /> },
    { path: '/admin/customers', label: 'Customers', icon: <FiUsers /> },
    { path: '/admin/categories', label: 'Categories', icon: <FiGrid /> },
    { path: '/admin/inquiries', label: 'Inquiries', icon: <FiMail /> },
    { path: '/admin/testimonials', label: 'Testimonials', icon: <FiMessageSquare /> },
  ];

  return (
    <div style={{
      width: '300px',
      backgroundColor: '#c6c1b6ff',
      color: '#fac124ff',
      minHeight: '50vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '4rem 4rem',
    }}>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <img
          src={logo}
          alt="Caroline Ways"
          style={{ width: '120px', borderRadius: '6px' }}
        />
        <h2 style={{ color: '#ff7f00', fontSize: '1.2rem', marginTop: '0.5rem' }}>Caroline Ways Admin Panel</h2>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {menuItems.map(({ path, label, icon }) => (
          <NavLink
            to={path}
            key={label}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem',
              color: isActive ? '#ff7f00' : 'white',
              backgroundColor: isActive ? '#333' : 'transparent',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 500,
            })}
          >
            {icon}
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
