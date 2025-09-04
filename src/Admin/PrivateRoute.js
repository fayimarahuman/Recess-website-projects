import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user || !user.is_admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default PrivateRoute;
