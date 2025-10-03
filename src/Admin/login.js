// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setAuthToken } from "../api/client";
import "../styles/login.css"; // make sure this import exists

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/admin/login", {
        email: form.email,
        password: form.password,
      });

      const token = res.data.access_token;
      const admin = res.data.admin;

      if (!admin.is_admin) {
        setError("Access denied. Only admins can log in.");
        return;
      }

      setAuthToken(token); // store token in localStorage & api headers
      localStorage.setItem("user", JSON.stringify(admin));

      navigate("/admin/dashboard");
    } catch (err) {
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
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;


