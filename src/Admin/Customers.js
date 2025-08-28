import React, { useState } from 'react';

const initialCustomers = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    location: 'Kampala',
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 2,
    name: 'Brian Kamya',
    email: 'brian@example.com',
    location: 'Entebbe',
    image: 'https://randomuser.me/api/portraits/men/35.jpg'
  }
];

const Customers = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [form, setForm] = useState({ id: null, name: '', email: '', location: '', image: '' });

  const handleDelete = (id) => {
    setCustomers(customers.filter(customer => customer.id !== id));
  };

  const handleEdit = (customer) => {
    setForm(customer);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id) {
      setCustomers(customers.map(c => (c.id === form.id ? form : c)));
    } else {
      setCustomers([...customers, { ...form, id: Date.now() }]);
    }
    setForm({ id: null, name: '', email: '', location: '', image: '' });
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h2 style={{ color: '#FF7F00' }}>👤 Customer Management</h2>

      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '1rem', borderRadius: '12px', marginBottom: '2rem', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}>
        <h3>{form.id ? 'Edit Customer' : 'Add New Customer'}</h3>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required style={inputStyle} />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required style={inputStyle} />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required style={inputStyle} />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" required style={inputStyle} />
        <button type="submit" style={submitStyle}>{form.id ? 'Update Customer' : 'Add Customer'}</button>
      </form>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {customers.map(customer => (
          <div key={customer.id} style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', textAlign: 'center' }}>
            <img src={customer.image} alt={customer.name} style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem' }} />
            <h4 style={{ color: '#000' }}>{customer.name}</h4>
            <p style={{ color: '#555', margin: '0.25rem 0' }}>{customer.email}</p>
            <p style={{ color: '#777' }}>{customer.location}</p>
            <button onClick={() => handleEdit(customer)} style={editStyle}>Edit</button>
            <button onClick={() => handleDelete(customer.id)} style={deleteStyle}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const inputStyle = {
  display: 'block',
  width: '100%',
  marginBottom: '0.75rem',
  padding: '0.6rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '0.95rem'
};

const submitStyle = {
  padding: '0.6rem 1rem',
  backgroundColor: '#FF7F00',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const editStyle = {
  marginTop: '1rem',
  marginRight: '0.5rem',
  backgroundColor: '#000',
  color: '#fff',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  cursor: 'pointer'
};

const deleteStyle = {
  marginTop: '1rem',
  backgroundColor: '#d9534f',
  color: '#fff',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  cursor: 'pointer'
};

export default Customers;
