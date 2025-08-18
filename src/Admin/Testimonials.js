import React, { useState } from 'react';

const initialTestimonials = [
  {
    id: 1,
    name: 'Alice Johnson',
    role: 'Interior Designer',
    message: 'The chandelier I ordered exceeded expectations. Excellent quality and service!',
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 2,
    name: 'Mark Benson',
    role: 'Architect',
    message: 'The lighting options available are stunning. Highly recommend!',
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  }
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);

  const handleDelete = (id) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h2 style={{ color: '#ff7f00', marginBottom: '2rem' }}>🌟 Customer Testimonials</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {testimonials.map(t => (
          <div key={t.id} style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', textAlign: 'center' }}>
            <img src={t.image} alt={t.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem' }} />
            <h3 style={{ margin: '0.5rem 0' }}>{t.name}</h3>
            <p style={{ color: '#888', fontStyle: 'italic' }}>{t.role}</p>
            <p style={{ marginTop: '1rem' }}>{t.message}</p>
            <button onClick={() => handleDelete(t.id)} style={{ marginTop: '1rem', backgroundColor: '#d9534f', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
