import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FiHome, FiBox, FiGrid, FiMessageSquare, FiUser } from 'react-icons/fi';
import AdminNavbar from './AdminNavbar';

const AdminLayout = () => {
  return (
    <div style={layoutContainer}>
      {/* ✅ Top Navbar */}
      <div style={topNavbarWrapper}>
        <AdminNavbar />
      </div>

      {/* ✅ Sidebar + Main Content */}
      <div style={contentWrapper}>
        {/* Sidebar */}
        <aside style={sidebar}>
          <div style={logo}>Caroline <span style={{ color: '#FF7F00' }}>Ways</span></div>
          <nav style={navMenu}>
            <Link to="/admin/dashboard" style={navLink}><FiHome /> Dashboard</Link>
            <Link to="/admin/products" style={navLink}><FiBox /> Products</Link>
            <Link to="/admin/categories" style={navLink}><FiGrid /> Categories</Link>
            <Link to="/admin/inquiries" style={navLink}><FiMessageSquare /> Inquiries</Link>
            <Link to="/admin/testimonials" style={navLink}><FiMessageSquare /> Testimonials</Link>
            <Link to="/admin/profile" style={navLink}><FiUser /> Admin</Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main style={mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

/* Styles */
const layoutContainer = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const topNavbarWrapper = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
};

const contentWrapper = {
  display: 'flex',
  flex: 1,
  marginTop: '70px', 
};

const sidebar = {
  width: '250px',
  backgroundColor: '#000',
  color: '#fff',
  padding: '2rem 1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  minHeight: 'calc(100vh - 70px)',
};

const logo = {
  fontSize: '1.8rem',
  fontWeight: 'bold',
  color: '#fff',
  textAlign: 'center',
};

const navMenu = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
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
  fontSize: '1rem',
};

const mainContent = {
  flex: 1,
  padding: '2rem',
  backgroundColor: '#f5f5f5',
};

export default AdminLayout;
