import React, { useEffect, useState } from "react";
import { api } from "../api/client";

const cardStyle = {
  backgroundColor: '#fff',
  padding: '1.5rem',
  borderRadius: '12px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
  textAlign: 'center'
};

const imgStyle = {
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginBottom: '1rem'
};

const deleteBtnStyle = {
  marginTop: '1rem',
  backgroundColor: '#d9534f',
  color: '#fff',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  cursor: 'pointer'
};

const editBtnStyle = {
  marginTop: '1rem',
  marginRight: '0.5rem',
  backgroundColor: '#000',
  color: '#fff',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  cursor: 'pointer'
};

const initialTestimonials = [
  {
    id: 1,
    name: 'Alice Johnson',
    role: 'Interior Designer',
    message: 'The chandelier I ordered exceeded expectations. Excellent quality and service!',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5
  },
  {
    id: 2,
    name: 'Mark Benson',
    role: 'Architect',
    message: 'The lighting options available are stunning. Highly recommend!',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4
  }
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    role: "",
    message: "",
    image: "",
    rating: 5
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await api.get("/testimonials");
      setTestimonials(res.data.testimonials || []);
    } catch (err) {
      setTestimonials(initialTestimonials);
      console.error("Error fetching testimonials", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await api.put(`/testimonials/${form.id}`, form);
      } else {
        await api.post("/testimonials", form);
      }
      setForm({ id: null, name: "", role: "", message: "", image: "", rating: 5 });
      fetchTestimonials();
    } catch (err) {
      console.error("Error saving testimonial", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/testimonials/${id}`);
      fetchTestimonials();
    } catch (err) {
      console.error("Error deleting testimonial", err);
    }
  };

  const handleEdit = (t) => {
    setForm(t);
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h2 style={{ color: '#ff7f00', marginBottom: '2rem' }}>🌟 Customer Testimonials</h2>

      {/* Create/Edit Form */}
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '12px', marginBottom: '2rem', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}>
        <h3>{form.id ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
        <input
          name="name"
          type="text"
          placeholder="Customer Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <input
          name="role"
          type="text"
          placeholder="Role (e.g. Architect)"
          value={form.role}
          onChange={handleChange}
          required
          style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <textarea
          name="message"
          placeholder="Testimonial Message"
          value={form.message}
          onChange={handleChange}
          required
          style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', minHeight: '80px' }}
        />
        <input
          name="image"
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <select name="rating" value={form.rating} onChange={handleChange} style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}>
          <option value={5}>⭐⭐⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={1}>⭐</option>
        </select>
        <button type="submit" style={{ padding: '0.6rem 1rem', backgroundColor: '#ff7f00', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          {form.id ? 'Update Testimonial' : 'Add Testimonial'}
        </button>
      </form>

      {/* Testimonials Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {testimonials.map(t => (
          <div key={t.id} style={cardStyle}>
            <img src={t.image || "https://randomuser.me/api/portraits/lego/1.jpg"} alt={t.name} style={imgStyle} />
            <h3 style={{ margin: '0.5rem 0' }}>{t.name}</h3>
            <p style={{ color: '#888', fontStyle: 'italic' }}>{t.role}</p>
            <p style={{ marginTop: '1rem' }}>{t.message}</p>
            <p style={{ color: '#ff7f00', fontWeight: 'bold', marginTop: '0.5rem' }}>
              {"⭐".repeat(t.rating || 5)}
            </p>
            <button onClick={() => handleEdit(t)} style={editBtnStyle}>Edit</button>
            <button onClick={() => handleDelete(t.id)} style={deleteBtnStyle}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
