import React, { useState, useEffect } from 'react';
import { api, setAuthToken } from '../api/client';

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [newInquiry, setNewInquiry] = useState('');

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) setAuthToken(token);

        const res = await api.get('/inquiry/get/all'); // consuming GET /inquiry/get/all
        setInquiries(res.data.inquiries);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    fetchInquiries();
  }, []);

  const addInquiry = async () => {
    if (!newInquiry) return;
    try {
      const res = await api.post('/inquiry/create', { message: newInquiry }); // POST
      setInquiries([...inquiries, { id: res.data.inquiry_id, message: newInquiry }]);
      setNewInquiry('');
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const updateInquiry = async (id, message) => {
    const updatedMessage = prompt('Update inquiry:', message);
    if (!updatedMessage) return;
    try {
      await api.put(`/inquiry/update/${id}`, { message: updatedMessage }); // PUT
      setInquiries(inquiries.map(i => i.id === id ? { ...i, message: updatedMessage } : i));
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const deleteInquiry = async (id) => {
    try {
      await api.delete(`/inquiry/delete/${id}`); // DELETE
      setInquiries(inquiries.filter(i => i.id !== id));
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#FF7F00' }}>Customer Inquiries</h2>
      <input type="text" placeholder="Enter inquiry message" value={newInquiry} onChange={e => setNewInquiry(e.target.value)} style={{ padding: '0.5rem', marginRight: '0.5rem', width: '50%' }} />
      <button onClick={addInquiry} style={addBtn}>Add</button>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTd}>#</th>
            <th style={thTd}>Message</th>
            <th style={thTd}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((i, idx) => (
            <tr key={i.id}>
              <td style={thTd}>{idx + 1}</td>
              <td style={thTd}>{i.message}</td>
              <td style={thTd}>
                <button onClick={() => updateInquiry(i.id, i.message)} style={actionBtn}>Edit</button>
                <button onClick={() => deleteInquiry(i.id)} style={actionBtn}>Delete</button>
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

export default Inquiries;
