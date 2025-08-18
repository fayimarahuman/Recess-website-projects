import React, { useState } from 'react';
import chandelier2 from '../assets/IMG-20250725-WA0052.jpg';
import chandelier3 from '../assets/IMG-20250725-WA0053.jpg';
import chandelier1 from '../assets/IMG-20250725-WA0054.jpg';
import chandelier4 from '../assets/IMG-20250725-WA0055.jpg';

const initialProducts = [
  {
    id: 1,
    name: 'Modern Chandelier',
    description: 'An elegant chandelier perfect for large living rooms.',
    image: chandelier1,
    sales: 34,
    stock: 12
  },
  {
    id: 2,
    name: 'Minimalist Pendant Light',
    description: 'A sleek hanging pendant light ideal for kitchens.',
    image: chandelier2,
    sales: 21,
    stock: 8
  },
  {
    id: 3,
    name: 'Classic Wall Sconce',
    description: 'A timeless wall sconce that adds warmth to any room.',
    image: chandelier3,
    sales: 15,
    stock: 5
  },
  {
    id: 4,
    name: 'Elegant Crystal Chandelier',
    description: 'A stunning crystal chandelier for a touch of luxury.',
    image: chandelier4,
    sales: 10,
    stock: 2
  }
];


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

const deleteStyle = {
  marginTop: '1rem',
  marginRight: '0.5rem',
  backgroundColor: '#d9534f',
  color: '#fff',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  cursor: 'pointer'
};

const editStyle = {
  marginTop: '1rem',
  backgroundColor: '#000',
  color: '#fff',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  cursor: 'pointer'
};

const AdminProducts = () => {
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState({ id: null, name: '', description: '', image: '', sales: 0, stock: 0 });

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleEdit = (product) => {
    setForm(product);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id) {
      setProducts(products.map(p => (p.id === form.id ? form : p)));
    } else {
      setProducts([...products, { ...form, id: Date.now() }]);
    }
    setForm({ id: null, name: '', description: '', image: '', sales: 0, stock: 0 });
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <h2 style={{ color: '#FF7F00', marginBottom: '2rem' }}>💡 Product Listings</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', backgroundColor: '#fff', padding: '1rem', borderRadius: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}>
        <h3>{form.id ? 'Edit Product' : 'Add New Product'}</h3>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name" required style={inputStyle} />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" required style={inputStyle} />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" required style={inputStyle} />
        <input name="sales" type="number" value={form.sales} onChange={handleChange} placeholder="Sales" style={inputStyle} />
        <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock" style={inputStyle} />
        <button type="submit" style={submitStyle}>{form.id ? 'Update Product' : 'Add Product'}</button>
      </form>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {products.map(product => (
          <div key={product.id} style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)', transition: 'transform 0.2s ease-in-out' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '1.25rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: '#000' }}>{product.name}</h3>
              <p style={{ color: '#666', fontSize: '0.95rem' }}>{product.description}</p>
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.85rem', color: '#333' }}><strong>Sales:</strong> {product.sales}</span>
                <span style={{ fontSize: '0.85rem', color: '#333' }}><strong>Stock:</strong> {product.stock}</span>
              </div>
              <button 
                onClick={() => handleDelete(product.id)}
                style={deleteStyle}
              >
                Delete
              </button>
              <button 
                onClick={() => handleEdit(product)}
                style={editStyle}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;