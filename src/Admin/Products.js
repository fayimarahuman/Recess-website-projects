import React, { useEffect, useState } from "react";
import { api } from "../api/client";
import chandelier1 from '../assets/IMG-20250725-WA0054.jpg';
import chandelier2 from '../assets/IMG-20250725-WA0052.jpg';
import chandelier3 from '../assets/IMG-20250725-WA0053.jpg';
import chandelier4 from '../assets/IMG-20250725-WA0055.jpg';

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

const defaultImages = [chandelier1, chandelier2, chandelier3, chandelier4];

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    description: "",
    image: "",
    stock: "",
    category_id: ""
  });

  // Fetch products and categories
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/product/get/all");
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories/all");
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await api.put(`/product/update/${form.id}`, form);
      } else {
        await api.post("/product/create", form);
      }
      setForm({ id: null, name: "", description: "", image: "", stock: "", category_id: "" });
      fetchProducts();
      alert("Product saved successfully!");
    } catch (err) {
      console.error("Error saving product", err);
      alert("Failed to save product");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/product/delete/${id}`);
      fetchProducts();
      alert("Product deleted successfully!");
    } catch (err) {
      console.error("Error deleting product", err);
      alert("Failed to delete product");
    }
  };

  const handleEdit = (product) => {
    setForm({
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      stock: product.stock,
      category_id: product.category_id || ""
    });
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <h2 style={{ color: '#FF7F00', marginBottom: '2rem' }}>💡 Product Listings</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', backgroundColor: '#fff', padding: '1rem', borderRadius: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}>
        <h3>{form.id ? 'Edit Product' : 'Add New Product'}</h3>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          style={inputStyle}
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
          style={inputStyle}
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          style={inputStyle}
        />
        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          style={inputStyle}
        />

        <select
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          required
          style={{ ...inputStyle, appearance: "none", paddingRight: "2rem" }}
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <button type="submit" style={submitStyle}>{form.id ? 'Update Product' : 'Add Product'}</button>
      </form>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {products.map(product => (
          <div key={product.id} style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)', transition: 'transform 0.2s ease-in-out' }}>
            <img
              src={product.image || defaultImages[product.id % defaultImages.length]}
              alt={product.name}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <div style={{ padding: '1.25rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: '#000' }}>{product.name}</h3>
              <p style={{ color: '#666', fontSize: '0.95rem' }}>{product.description}</p>
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.85rem', color: '#333' }}><strong>Stock:</strong> {product.stock}</span>
                <span style={{ fontSize: '0.85rem', color: '#333' }}><strong>Price:</strong> {product.price}</span>
                <span style={{ fontSize: '0.85rem', color: '#333' }}>
                  <strong>Category:</strong> {categories.find(cat => cat.id === product.category_id)?.name || "N/A"}
                </span>
              </div>
              <button onClick={() => handleDelete(product.id)} style={deleteStyle}>Delete</button>
              <button onClick={() => handleEdit(product)} style={editStyle}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
