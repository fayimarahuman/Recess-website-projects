import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";

// ...existing code...
function Login({ onLogin }) {
  const [form, setForm] = useState({email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/auth/admin/login",
        { email: form.email, password: form.password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const token = res.data.access_token;
      const admin = res.data.admin;

      if (!admin.is_admin) {
        setError("Access denied. Only admins can log in.");
        return;
      }

      localStorage.setItem('adminToken', token);
      localStorage.setItem('user', JSON.stringify(admin));

      if (onLogin) onLogin(admin);
      navigate("/admin/dashboard");
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Admin Dashboard Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email}
              onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={form.password}
              onChange={handleChange} required />
          </div>
          <button type="submit" className="login-button">Login</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
// ...existing code...

export default Login;