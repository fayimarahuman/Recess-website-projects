import React, { useState, useEffect } from 'react';
import { api } from '../api/client';

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await api.get("/inquiry/all");
      setInquiries(res.data.inquiries || []);
    } catch (err) {
      // fallback to demo data if backend fails
      setInquiries([
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Do you offer installation services?',
          status: 'Open'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          message: 'Can I customize the chandelier length?',
          status: 'Open'
        }
      ]);
    }
  };

  const handleClose = async (id) => {
    try {
      await api.put(`/inquiries/${id}`, { status: "Closed" });
      fetchInquiries();
    } catch (err) {
      // fallback for demo
      setInquiries(inquiries.map((inq) =>
        inq.id === id ? { ...inq, status: 'Closed' } : inq
      ));
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/inquiries/${id}`);
      fetchInquiries();
    } catch (err) {
      // fallback for demo
      setInquiries(inquiries.filter((inq) => inq.id !== id));
    }
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h2 style={{ color: '#ff7f00', marginBottom: '1.5rem' }}>📬 Customer Inquiries</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'separate', borderSpacing: '0 0.75rem' }}>
          <thead>
            <tr>
              <th style={{ ...headerStyle, width: '15%' }}>Name</th>
              <th style={{ ...headerStyle, width: '20%' }}>Email</th>
              <th style={{ ...headerStyle, width: '35%' }}>Message</th>
              <th style={{ ...headerStyle, width: '10%' }}></th>
              <th style={{ ...headerStyle, width: '20%' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq) => (
              <tr key={inq.id} style={rowStyle}>
                <td style={cellStyle}>{inq.name}</td>
                <td style={cellStyle}>{inq.email}</td>
                <td style={cellStyle}>{inq.message}</td>
                <td style={{ ...cellStyle, fontWeight: 'bold', color: inq.status === 'Open' ? '#28a745' : '#888' }}>{inq.status}</td>
                <td style={cellStyle}>
                  {inq.status === 'Open' && (
                    <button onClick={() => handleClose(inq.id)} style={buttonStyle('#ff7f00')}>Close</button>
                  )}
                  <button onClick={() => handleDelete(inq.id)} style={buttonStyle('#d9534f')}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const headerStyle = {
  textAlign: 'left',
  padding: '1rem',
  backgroundColor: '#000',
  color: '#fff',
  borderTopLeftRadius: '6px',
  borderTopRightRadius: '6px'
};

const rowStyle = {
  backgroundColor: '#fff',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)'
};

const cellStyle = {
  padding: '1rem',
  borderBottom: '1px solid #eee'
};

const buttonStyle = (bgColor) => ({
  backgroundColor: bgColor,
  color: '#fff',
  border: 'none',
  padding: '0.5rem 0.75rem',
  borderRadius: '4px',
  marginRight: '0.5rem',
  cursor: 'pointer'
});

export default Inquiries;