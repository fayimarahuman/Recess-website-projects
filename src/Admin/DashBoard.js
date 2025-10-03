import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { api, setAuthToken } from '../api/client';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCustomers: 0,
    openInquiries: 0,
    totalTestimonials: 0,
    salesData: [],
    categoryData: [],
  });

  // ---------------------- FETCH DASHBOARD STATS ----------------------
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) setAuthToken(token);

        // fetch products, customers, inquiries, testimonials
        const [productsRes, customersRes, inquiriesRes, testimonialsRes] = await Promise.all([
          api.get('/product/get/all'),      // consuming GET /product/get/all
          api.get('/customer/get/all'),     // consuming GET /customer/get/all
          api.get('/inquiry/get/all'),      // consuming GET /inquiry/get/all
          api.get('/testimonial/get/all'),  // consuming GET /testimonial/get/all
        ]);

        const sales = productsRes.data.products.map(p => p.soldCount || 0); // example sales data
        const categories = ['Lighting', 'Decor', 'Furniture']; // can also fetch dynamically
        const categoryCounts = categories.map(cat => productsRes.data.products.filter(p => p.category === cat).length);

        setStats({
          totalProducts: productsRes.data.products.length,
          totalCustomers: customersRes.data.customers.length,
          openInquiries: inquiriesRes.data.inquiries.length,
          totalTestimonials: testimonialsRes.data.testimonials.length,
          salesData: sales,
          categoryData: categoryCounts,
        });

      } catch (err) {
        console.error('Error fetching dashboard stats:', err.response?.data || err.message);
      }
    };

    fetchStats();
  }, []);

  const salesChart = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{ label: 'Products Sold', data: stats.salesData, backgroundColor: '#FF7F00' }],
  };

  const categoryChart = {
    labels: ['Lighting', 'Decor', 'Furniture'],
    datasets: [{ label: 'Products by Category', data: stats.categoryData, backgroundColor: ['#FF7F00', '#FFA500', '#FFD580'] }],
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#FF7F00' }}>Welcome to Caroline Ways Admin Dashboard</h2>
      <p style={{ color: '#444' }}>Manage your products, inquiries, and insights here.</p>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
        {[
          { title: 'Total Products', value: stats.totalProducts },
          { title: 'Total Customers', value: stats.totalCustomers },
          { title: 'Open Inquiries', value: stats.openInquiries },
          { title: 'Testimonials', value: stats.totalTestimonials },
        ].map((item, idx) => (
          <div key={idx} style={statCard}>
            <h4 style={{ color: '#000' }}>{item.title}</h4>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FF7F00' }}>{item.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
        <div style={chartCard}>
          <h4>Sales Statistics</h4>
          <Bar data={salesChart} />
        </div>
        <div style={chartCard}>
          <h4>Products by Category</h4>
          <Pie data={categoryChart} />
        </div>
      </div>
    </div>
  );
};

const statCard = { flex: '1', minWidth: '200px', background: '#fff', padding: '1rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center' };
const chartCard = { flex: 1, minWidth: '300px', background: '#fff', padding: '1rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' };

export default Dashboard;
