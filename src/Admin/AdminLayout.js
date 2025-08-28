import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FiHome, FiBox, FiUsers, FiGrid, FiMessageSquare, FiUser } from 'react-icons/fi';

const AdminLayout = () => {
  return (
    <div style={layoutContainer}>
      <aside style={sidebar}>
        <div style={logo}>Caroline <span style={{ color: '#FF7F00' }}>Ways</span></div>
        <nav style={navMenu}>
          <Link to="/admin/dashboard" style={navLink}><FiHome /> Dashboard</Link>
          <Link to="/admin/products" style={navLink}><FiBox /> Products</Link>
          <Link to="/admin/customers" style={navLink}><FiUsers /> Customers</Link>
          <Link to="/admin/categories" style={navLink}><FiGrid /> Categories</Link>
          <Link to="/admin/inquiries" style={navLink}><FiMessageSquare /> Inquiries</Link>
          <Link to="/admin/testimonials" style={navLink}><FiMessageSquare /> Testimonials</Link>
          <Link to="/admin/profile" style={navLink}><FiUser /> Admin</Link>
        </nav>
      </aside>
      <main style={mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

const layoutContainer = {
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5'
};

const sidebar = {
  width: '250px',
  backgroundColor: '#000',
  color: '#fff',
  padding: '2rem 1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem'
};

const logo = {
  fontSize: '1.8rem',
  fontWeight: 'bold',
  color: '#fff',
  textAlign: 'center'
};

const navMenu = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const navLink = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  color: '#fff',
  textDecoration: 'none',
  padding: '0.6rem 1rem',
  borderRadius: '6px',
  transition: 'background-color 0.3s',
  fontSize: '1rem'
};

const mainContent = {
  flex: 1,
  padding: '2rem'
};

export default AdminLayout;
