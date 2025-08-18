import React, { useState } from 'react';

const initialInquiries = [
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
];

const Inquiries = () => {
  const [inquiries, setInquiries] = useState(initialInquiries);

  const handleClose = (id) => {
    const updated = inquiries.map((inq) =>
      inq.id === id ? { ...inq, status: 'Closed' } : inq
    );
    setInquiries(updated);
  };

  const handleDelete = (id) => {
    setInquiries(inquiries.filter((inq) => inq.id !== id));
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h2 style={{ color: '#ff7f00', marginBottom: '1.5rem' }}>📬 Customer Inquiries</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.75rem' }}>
          <thead>
            <tr>
              <th style={headerStyle}>Name</th>
              <th style={headerStyle}>Email</th>
              <th style={headerStyle}>Message</th>
              <th style={headerStyle}>Status</th>
              <th style={headerStyle}>Actions</th>
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


