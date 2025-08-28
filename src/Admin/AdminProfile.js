import React, { useState } from 'react';

const AdminProfile = () => {
  const [admin, setAdmin] = useState({
    name: 'Caroline M.',
    email: 'admin@carolineways.com',
    role: 'System Administrator'
  });

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(admin);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setAdmin(formData);
    setEditing(false);
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={heading}>👤 Admin Profile</h2>
        <img
          src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=200&q=80"
          alt="Admin Avatar"
          style={avatar}
        />

        {editing ? (
          <div style={formSection}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={input}
              placeholder="Full Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={input}
              placeholder="Email"
            />
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={input}
              placeholder="Role"
            />
            <button style={saveBtn} onClick={handleSave}>Save</button>
          </div>
        ) : (
          <div style={profileInfo}>
            <h3>{admin.name}</h3>
            <p>{admin.email}</p>
            <p style={{ color: '#FF7F00', fontWeight: 'bold' }}>{admin.role}</p>
            <button style={editBtn} onClick={() => setEditing(true)}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

const container = {
  display: 'flex',
  justifyContent: 'center',
  padding: '2rem',
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f7f7f7',
  minHeight: '100vh'
};

const card = {
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center'
};

const heading = {
  fontSize: '1.5rem',
  marginBottom: '1.5rem',
  color: '#000'
};

const avatar = {
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  marginBottom: '1rem',
  border: '3px solid #FF7F00'
};

const profileInfo = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const editBtn = {
  marginTop: '1rem',
  backgroundColor: '#000',
  color: '#fff',
  border: 'none',
  padding: '0.6rem 1.2rem',
  borderRadius: '6px',
  cursor: 'pointer'
};

const saveBtn = {
  marginTop: '1rem',
  backgroundColor: '#FF7F00',
  color: '#fff',
  border: 'none',
  padding: '0.6rem 1.2rem',
  borderRadius: '6px',
  cursor: 'pointer'
};

const formSection = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const input = {
  padding: '0.6rem 1rem',
  borderRadius: '6px',
  border: '1px solid #ccc'
};

export default AdminProfile;
