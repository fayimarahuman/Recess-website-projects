import React, { useEffect, useState } from 'react';
import { api } from "../api/client";

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

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ id: null, name: '', description: '', image: '', sold: 0, remaining: 0 });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories/all");
      setCategories(res.data.categories || res.data || []); // handles both API response formats
      setError("");
    } catch (err) {
      setCategories([]);
      setError("Error fetching categories");
      console.error("Error fetching categories", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.description || !form.image) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      if (form.id) {
        await api.put(`/categories/update/${form.id}`, form);
        setSuccess("Category updated successfully!");
      } else {
        await api.post("/categories/create", form);
        setSuccess("Category added successfully!");
      }
      setForm({ id: null, name: '', description: '', image: '', sold: 0, remaining: 0 });
      fetchCategories();
    } catch (err) {
      console.error("Error adding/updating category", err);
      if (err.response?.data?.error?.includes("Duplicate entry")) {
        setError("Category name already exists. Please use a unique name.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Error adding category");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/categories/delete/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category", err);
    }
  };

  const handleEdit = (category) => {
    setForm({
      id: category.id,
      name: category.name,
      description: category.description,
      image: category.image,
      sold: category.sold,
      remaining: category.remaining
    });
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h2 style={{ color: '#FF7F00' }}>🗂️ Light Categories</h2>

      <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '12px', marginBottom: '2rem', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}>
        <h3>{form.id ? 'Edit Category' : 'Add New Category'}</h3>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Category Name" required style={inputStyle} />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" required style={inputStyle} />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" required style={inputStyle} />
        <input name="sold" type="number" value={form.sold} onChange={handleChange} placeholder="Sold Units" style={inputStyle} />
        <input name="remaining" type="number" value={form.remaining} onChange={handleChange} placeholder="Stock Remaining" style={inputStyle} />
        <button type="submit" style={submitStyle}>{form.id ? 'Update Category' : 'Add Category'}</button>
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
        {success && <p style={{ color: "green", marginTop: "1rem" }}>{success}</p>}
      </form>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {categories.map(category => (
          <div key={category.id} style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', textAlign: 'center' }}>
            <img src={category.image} alt={category.name} style={{ width: '100%', height: '180px', borderRadius: '10px', objectFit: 'cover', marginBottom: '1rem' }} />
            <h4 style={{ color: '#000' }}>{category.name}</h4>
            <p style={{ color: '#777', fontSize: '0.9rem' }}>{category.description}</p>
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

export default Categories;
