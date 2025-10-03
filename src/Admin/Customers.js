// src/pages/Customers.jsx
import React, { useState, useEffect } from 'react';
import { api, setAuthToken } from '../api/client'; // your axios instance

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState('');
  const [error, setError] = useState('');

  // ---------------------- FETCH CUSTOMERS FROM BACKEND ----------------------
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) setAuthToken(token); // set token in axios headers

        const res = await api.get('/customer/get/all'); 
        // consuming GET /customer/get/all
        setCustomers(res.data.customers);
      } catch (err) {
        console.error('Error fetching customers:', err.response?.data || err.message);
      }
    };

    fetchCustomers();
  }, []);

  // ---------------------- ADD CUSTOMER ----------------------
  const addCustomer = async () => {
    if (!newCustomer) return;
    setError('');

    try {
      const res = await api.post('/customer/create', { name: newCustomer });
      // consuming POST /customer/create
      setCustomers([...customers, { id: res.data.customer_id, name: newCustomer }]);
      setNewCustomer('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding customer');
    }
  };

  // ---------------------- DELETE CUSTOMER ----------------------
  const deleteCustomer = async (id) => {
    try {
      await api.delete(`/customer/delete/${id}`); 
      // consuming DELETE /customer/delete/:id
      setCustomers(customers.filter(c => c.id !== id));
    } catch (err) {
      console.error('Error deleting customer:', err.response?.data || err.message);
    }
  };

  // ---------------------- UPDATE CUSTOMER ----------------------
  const updateCustomer = async (id, name) => {
    try {
      const updatedName = prompt('Update customer name:', name);
      if (!updatedName) return;

      await api.put(`/customer/update/${id}`, { name: updatedName });
      // consuming PUT /customer/update/:id

      setCustomers(customers.map(c => c.id === id ? { ...c, name: updatedName } : c));
    } catch (err) {
      console.error('Error updating customer:', err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h2 style={{ color: '#FF7F00' }}>Customers</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        type="text"
        placeholder="Enter customer name"
        value={newCustomer}
        onChange={(e) => setNewCustomer(e.target.value)}
        style={{ padding: '0.5rem', marginRight: '0.5rem' }}
      />
      <button onClick={addCustomer} style={addBtn}>Add</button>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTd}>#</th>
            <th style={thTd}>Customer Name</th>
            <th style={thTd}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c, idx) => (
            <tr key={c.id}>
              <td style={thTd}>{idx + 1}</td>
              <td style={thTd}>{c.name}</td>
              <td style={thTd}>
                <button onClick={() => updateCustomer(c.id, c.name)} style={actionBtn}>Edit</button>
                <button onClick={() => deleteCustomer(c.id)} style={actionBtn}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const addBtn = { padding: '0.5rem', backgroundColor: '#FF7F00', color: '#fff', border: 'none' };
const thTd = { border: '1px solid #ddd', padding: '0.5rem', textAlign: 'left' };
const actionBtn = { marginRight: '0.5rem', padding: '0.3rem 0.6rem', backgroundColor: '#FF7F00', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' };
const tableStyle = { width: '100%', marginTop: '1rem', borderCollapse: 'collapse' };

export default Customers;
