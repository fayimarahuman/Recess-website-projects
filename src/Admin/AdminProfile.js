import React, { useState, useEffect } from 'react';
import { api, setAuthToken } from '../api/client'; // Your API client

const AdminProfile = () => {
  const [admin, setAdmin] = useState({
    name: '',
    email: '',
    role: '',
    avatar: ''
  });

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(admin);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // ---------------------- FETCH ADMIN PROFILE ----------------------
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (token) setAuthToken(token); // add token to headers

        const res = await api.get('/admin/profile'); // consuming GET /admin/profile
        setAdmin(res.data);
        setFormData(res.data);
      } catch (err) {
        console.error('Error fetching admin profile:', err.response?.data || err.message);
      }
    };

    fetchProfile();
  }, []);

  // ---------------------- SAVE ADMIN PROFILE ----------------------
  const handleSave = async () => {
    if (password && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      if (token) setAuthToken(token);

      // API call to update profile
      await api.put('/admin/profile/update', {
        ...formData,
        password: password || undefined
      });

      setAdmin({ ...formData, password: '' });
      setEditing(false);
      setPassword('');
      setConfirmPassword('');
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err.response?.data || err.message);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: URL.createObjectURL(file) });
      // In a real backend, you would upload the file as FormData
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={heading}>👤 Admin Profile</h2>

        <img
          src={formData.avatar || "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=200&q=80"}
          alt="Admin Avatar"
          style={avatar}
        />

        {editing && (
          <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ marginBottom: '1rem' }} />
        )}

        {editing ? (
          <div style={formSection}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} style={input} placeholder="Full Name" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} style={input} placeholder="Email" />
            <input type="text" name="role" value={formData.role} onChange={handleChange} style={input} placeholder="Role" />
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} style={input} placeholder="New Password" />
            <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={input} placeholder="Confirm Password" />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button style={saveBtn} onClick={handleSave}>Save</button>
              <button style={cancelBtn} onClick={() => { setEditing(false); setFormData(admin); setPassword(''); setConfirmPassword(''); }}>Cancel</button>
            </div>
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

// --- Styles (same as before) ---
const container = { display: 'flex', justifyContent: 'center', padding: '2rem', fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' };
const card = { backgroundColor: '#000', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', width: '100%', maxWidth: '400px', textAlign: 'center', color: '#fff' };
const heading = { fontSize: '1.5rem', marginBottom: '1.5rem', color: '#FF7F00' };
const avatar = { width: '100px', height: '100px', borderRadius: '50%', marginBottom: '1rem', border: '3px solid #FF7F00' };
const profileInfo = { display: 'flex', flexDirection: 'column', gap: '0.5rem' };
const editBtn = { marginTop: '1rem', backgroundColor: '#FF7F00', color: '#000', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' };
const saveBtn = { marginTop: '1rem', backgroundColor: '#FF7F00', color: '#000', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' };
const cancelBtn = { marginTop: '1rem', backgroundColor: '#555', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', cursor: 'pointer' };
const formSection = { display: 'flex', flexDirection: 'column', gap: '1rem' };
const input = { padding: '0.6rem 1rem', borderRadius: '6px', border: '1px solid #ccc' };

export default AdminProfile;
