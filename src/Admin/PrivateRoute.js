// PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

// This is a simple auth check function
// Replace it with your actual login/auth logic
const isAdminLoggedIn = () => {
  // Example: check localStorage for a token
  return localStorage.getItem('adminToken') !== null;
};

const PrivateRoute = ({ children }) => {
  if (!isAdminLoggedIn()) {
    // Redirect to login page if admin is not logged in
    return <Navigate to="/login" replace />;
  }

  // Render the child components if admin is logged in
  return children;
};

export default PrivateRoute;
