import React from 'react';

const Admin = () => {
  return (
    <div style={pageContainer}>
      <div style={card}>
        <h2 style={heading}>👩🏽‍💼 Admin Profile</h2>
        <div style={profileRow}>
          <img
            src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=200&q=80"
            alt="Admin Profile"
            style={avatar}
          />
          <div style={infoSection}>
            <h3 style={name}>Caroline M.</h3>
            <p style={email}>admin@carolineways.com</p>
            <p style={role}>System Administrator</p>
          </div>
        </div>

        <div style={actions}>
          <button style={editButton}>Edit Profile</button>
          <button style={logoutButton}>Logout</button>
        </div>
      </div>

      <div style={card}>
        <h2 style={heading}>⚙️ Admin Tools</h2>
        <ul style={toolList}>
          <li>🗂 View All Data Tables</li>
          <li>📊 View Dashboard Analytics</li>
          <li>🔐 Manage Permissions</li>
          <li>📥 Handle System Inquiries</li>
          <li>💡 Customize Website Content</li>
        </ul>
      </div>
    </div>
  );
};

const pageContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '2rem',
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f5f5f5',
  minHeight: '100vh'
};

const card = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  padding: '2rem'
};

const heading = {
  marginBottom: '1rem',
  color: '#000',
  borderBottom: '2px solid #FF7F00',
  paddingBottom: '0.5rem'
};

const profileRow = {
  display: 'flex',
  alignItems: 'center',
  gap: '1.5rem'
};

const avatar = {
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  objectFit: 'cover',
  border: '3px solid #FF7F00'
};

const infoSection = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.2rem'
};

const name = {
  fontSize: '1.4rem',
  color: '#000'
};

const email = {
  fontSize: '0.95rem',
  color: '#666'
};

const role = {
  fontSize: '0.95rem',
  color: '#FF7F00',
  fontWeight: 'bold'
};

const actions = {
  display: 'flex',
  gap: '1rem',
  marginTop: '1.5rem'
};

const editButton = {
  backgroundColor: '#000',
  color: '#fff',
  padding: '0.6rem 1.2rem',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

const logoutButton = {
  backgroundColor: '#FF7F00',
  color: '#fff',
  padding: '0.6rem 1.2rem',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

const toolList = {
  listStyle: 'none',
  padding: 0,
  marginTop: '1rem',
  color: '#333',
  lineHeight: 1.8
};

export default Admin;
