import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiBox, FiList, FiMessageSquare } from 'react-icons/fi';

const AdminNavbar = () => {
  return (
    <nav style={navStyle}>
      <div style={logoStyle}>
        💡 <strong style={{ color: '#FF7F00' }}>Caroline Ways</strong>
      </div>
      <ul style={navList}>
        <li><Link to="/admin/dashboard" style={linkStyle}><FiHome style={iconStyle} /> Dashboard</Link></li>
        <li><Link to="/admin/products" style={linkStyle}><FiBox style={iconStyle} /> Products</Link></li>
        <li><Link to="/admin/categories" style={linkStyle}><FiList style={iconStyle} /> Categories</Link></li>
        <li><Link to="/admin/inquiries" style={linkStyle}><FiMessageSquare style={iconStyle} /> Inquiries</Link></li>
        <li><Link to="/admin/testimonials" style={linkStyle}><FiMessageSquare style={iconStyle} /> Testimonials</Link></li>
      </ul>
    </nav>
  );
};

const navStyle = {
  backgroundColor: '#000',
  color: '#fff',
  padding: '1rem 2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
  position: 'fixed',   
  top: 0,          
  left: 0,
  right: 0,
  zIndex: 1000         
};

const logoStyle = {
  fontSize: '1.3rem',
  fontWeight: 'bold'
};

const navList = {
  listStyle: 'none',
  display: 'flex',
  gap: '1.5rem',
  margin: 0,
  padding: 0
};

const linkStyle = {
  color: '#FF7F00',
  textDecoration: 'none',
  fontWeight: '500',
  display: 'flex',
  alignItems: 'center'
};

const iconStyle = {
  marginRight: '0.5rem'
};

export default AdminNavbar;
