// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setAuthToken } from "../api/client"; // use Axios instance
import "../styles/login.css";

function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Update form fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ Use api instance (already has baseURL and withCredentials)
      const res = await api.post("/auth/admin/login", {
        email: form.email,
        password: form.password,
      });

      console.log("Login response:", res.data); // debug

      const { access_token: token, admin } = res.data;

      // Allow only admin or super_admin
      if (!["admin", "super_admin"].includes(admin.role)) {
        setError("Access denied. Only admins can log in.");
        return;
      }

      // Store token and user info
      setAuthToken(token); // stores token & attaches it to future requests
      localStorage.setItem("user", JSON.stringify(admin));

      if (onLogin) onLogin(admin);

      // Redirect to admin dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Login error:", err.response || err);
      setError(err.response?.data?.error || "Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Admin Dashboard Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-button">Login</button>

          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
