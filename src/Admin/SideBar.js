// Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Products', path: '/admin/products' },
    { name: 'Categories', path: '/admin/categories' },
    { name: 'Inquiries', path: '/admin/inquiries' },
    { name: 'Testimonials', path: '/admin/testimonials' },
    { name: 'Profile', path: '/admin/profile' },
  ];

  return (
    <div style={sidebar}>
      <div style={profile}>
        <img
          src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=200&q=80"
          alt="Admin"
          style={avatar}
        />
        <h3 style={{ color: '#fff', marginTop: '0.5rem' }}>Caroline M.</h3>
      </div>

      <nav style={nav}>
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            style={({ isActive }) => ({
              ...linkStyle,
              backgroundColor: isActive ? '#FF7F00' : 'transparent',
            })}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

const sidebar = {
  width: '220px',
  minHeight: '100vh',
  backgroundColor: '#FF7F00',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'fixed',
};

const profile = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '2rem',
};

const avatar = {
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  border: '3px solid #fff',
};

const nav = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
};

const linkStyle = {
  padding: '0.8rem 1rem',
  marginBottom: '0.5rem',
  color: '#fff',
  textDecoration: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
};

export default Sidebar;
