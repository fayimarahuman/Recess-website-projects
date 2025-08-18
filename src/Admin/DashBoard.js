import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const salesData = [
  { month: 'Jan', sales: 400 },
  { month: 'Feb', sales: 300 },
  { month: 'Mar', sales: 500 },
  { month: 'Apr', sales: 700 },
  { month: 'May', sales: 600 },
  { month: 'Jun', sales: 800 },
];

const customerSources = [
  { name: 'Online', value: 400 },
  { name: 'Walk-in', value: 300 },
  { name: 'Referral', value: 300 },
];

const categorySales = [
  { name: 'Chandeliers', sales: 240 },
  { name: 'Wall Lights', sales: 139 },
  { name: 'Outdoor', sales: 980 },
  { name: 'Pendant Lights', sales: 390 },
];

const COLORS = ['#FF7F00', '#000000', '#FFA500'];

const Dashboard = () => {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h2 style={{ color: '#FF7F00' }}>Welcome to Caroline Ways Admin Dashboard</h2>
      <p style={{ color: '#444' }}>Manage your lighting products, customer inquiries, and business insights here.</p>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
        {[
          { title: 'Total Products', value: 154 },
          { title: 'Total Customers', value: 320 },
          { title: 'Open Inquiries', value: 12 },
          { title: 'Testimonials', value: 45 },
        ].map((item, idx) => (
          <div key={idx} style={{ flex: '1', minWidth: '200px', background: '#fff', padding: '1rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h4 style={{ color: '#000' }}>{item.title}</h4>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FF7F00' }}>{item.value}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div>
          <h3>Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#FF7F00" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3>Customer Sources</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={customerSources} dataKey="value" nameKey="name" outerRadius={80} fill="#8884d8" label>
                {customerSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3>Category Sales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categorySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#000" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Overview</h3>
        <p style={{ maxWidth: '700px' }}>
          This dashboard provides a quick glance at the company’s inventory, customer base, sales performance,
          and engagement. You can manage your product listings, review testimonials, monitor inquiries, and
          view customer trends all in one place.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
