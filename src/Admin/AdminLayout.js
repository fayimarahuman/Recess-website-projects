// AdminLayout.jsx
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FiHome, FiBox, FiGrid, FiMessageSquare, FiUser } from 'react-icons/fi';

const AdminLayout = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FiHome /> },
    { name: 'Products', path: '/admin/products', icon: <FiBox /> },
    { name: 'Categories', path: '/admin/categories', icon: <FiGrid /> },
    { name: 'Customers', path: '/admin/customers', icon: <FiUser /> },
    { name: 'Inquiries', path: '/admin/inquiries', icon: <FiMessageSquare /> },
    { name: 'Testimonials', path: '/admin/testimonials', icon: <FiMessageSquare /> },
    { name: 'Profile', path: '/admin/profile', icon: <FiUser /> },
  ];

  return (
    <div style={layoutContainer}>
      <aside style={sidebar}>
        <div style={logoStyle}>💡 Caroline Ways Admin</div>

        <nav style={navMenu}>
          {menuItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                color: isActive ? '#000' : '#fff',
                backgroundColor: isActive ? '#fff' : 'transparent',
                textDecoration: 'none',
                padding: '0.6rem 1rem',
                borderRadius: '6px',
                transition: '0.3s',
                fontWeight: 'bold'
              })}
            >
              {item.icon} {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main style={mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

// --- Styles ---
const layoutContainer = { display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' };
const sidebar = {
  width: '250px',
  backgroundColor: '#FF7F00', // Sidebar is now orange
  padding: '2rem 1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  position: 'fixed',
  height: '100vh',
};
const logoStyle = { color: '#fff', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '2rem' };
const navMenu = { display: 'flex', flexDirection: 'column', gap: '1rem' };
const mainContent = { flex: 1, marginLeft: '250px', padding: '2rem', backgroundColor: '#f5f5f5' };

export default AdminLayout;
