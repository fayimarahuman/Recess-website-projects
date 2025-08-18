import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import PrivateRoute from './PrivateRoute';

import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import Customers from '../pages/Customers';
import Categories from '../pages/Categories';
import Inquiries from '../pages/Inquiries';
import Testimonials from '../pages/Testimonials';
import AdminProfile from '../pages/AdminProfile';


const AdminRoutes = () => {
  return (
    <Routes>
     <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="customers" element={<Customers />} />
        <Route path="categories" element={<Categories />} />
        <Route path="inquiries" element={<Inquiries />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;