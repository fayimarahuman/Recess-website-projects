import React, { useState } from 'react';
import Chandeliers from '../assets/c3.jpg';
import WallLights from '../assets/wl4.jpg';
import PendantLight from '../assets/pl1.jpg';


const initialCategories = [
  {
    id: 1,
    name: 'Chandeliers',
    scent: 'Elegant Glow',
    image: Chandeliers,
    sold: 45,
    remaining: 10
  },
  {
    id: 2,
    name: 'Pendant Lights',
    scent: 'Warm Ambience',
    image: PendantLight,
    sold: 38,
    remaining: 15
  },
  {
    id: 3,
    name: 'Wall Lights',
    scent: 'Soft Radiance',
    image: WallLights,
    sold: 22,
    remaining: 8
  },
  {
    id: 4,
    name: 'Outdoor Lights',
    scent: 'Cool Twilight',
    image: 'https://images.unsplash.com/photo-1601121140273-bc69efc14f1d?auto=format&fit=crop&w=600&q=60',
    sold: 30,
    remaining: 20
  }
];

const Categories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [form, setForm] = useState({ id: null, name: '', scent: '', image: '', sold: 0, remaining: 0 });

  const handleDelete = (id) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const handleEdit = (category) => {
    setForm(category);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id) {
      setCategories(categories.map(c => (c.id === form.id ? form : c)));
    } else {
      setCategories([...categories, { ...form, id: Date.now() }]);
    }
    setForm({ id: null, name: '', scent: '', image: '', sold: 0, remaining: 0 });
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h2 style={{ color: '#FF7F00' }}>🗂️ Light Categories</h2>

      <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '12px', marginBottom: '2rem', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}>
        <h3>{form.id ? 'Edit Category' : 'Add New Category'}</h3>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Category Name" required style={inputStyle} />
        <input name="scent" value={form.scent} onChange={handleChange} placeholder="Scent Description" required style={inputStyle} />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" required style={inputStyle} />
        <input name="sold" type="number" value={form.sold} onChange={handleChange} placeholder="Sold Units" style={inputStyle} />
        <input name="remaining" type="number" value={form.remaining} onChange={handleChange} placeholder="Stock Remaining" style={inputStyle} />
        <button type="submit" style={submitStyle}>{form.id ? 'Update Category' : 'Add Category'}</button>
      </form>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {categories.map(category => (
          <div key={category.id} style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', textAlign: 'center' }}>
            <img src={category.image} alt={category.name} style={{ width: '10%', height: '180px', borderRadius: '10px', objectFit: 'cover', marginBottom: '1rem' }} />
            <h4 style={{ color: '#000' }}>{category.name}</h4>
            <p style={{ color: '#777', fontSize: '0.9rem' }}>{category.scent}</p>
            <p style={{ color: '#555', fontSize: '0.85rem' }}><strong>Sold:</strong> {category.sold}</p>
            <p style={{ color: '#555', fontSize: '0.85rem' }}><strong>Remaining:</strong> {category.remaining}</p>
            <button onClick={() => handleEdit(category)} style={editStyle}>Edit</button>
            <button onClick={() => handleDelete(category.id)} style={deleteStyle}>Delete</button>
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

export default Categories;