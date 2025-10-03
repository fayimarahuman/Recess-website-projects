import React, { useState, useEffect } from 'react';
import { api, setAuthToken } from '../api/client'; // Your API client

const Products = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', category: 'Lighting' });

  const categories = ['Lighting', 'Decor', 'Furniture'];

  // ---------------------- FETCH PRODUCTS ----------------------
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token'); // get token from localStorage
        if (token) setAuthToken(token); // set token in headers

        const res = await api.get('/product/get/all'); // consuming GET /product/get/all
        setProducts(res.data.products); // update state with API response
      } catch (err) {
        console.error('Error fetching products:', err.response?.data || err.message);
      }
    };

    fetchProducts();
  }, []);

  // ---------------------- ADD PRODUCT ----------------------
  const addProduct = async () => {
    if (!form.name) return;
    try {
      const res = await api.post('/product/create', form); // consuming POST /product/create
      setProducts([...products, { id: res.data.product_id, ...form }]); // add new product to state
      setForm({ name: '', description: '', category: 'Lighting' });
    } catch (err) {
      console.error('Error adding product:', err.response?.data || err.message);
    }
  };

  // ---------------------- DELETE PRODUCT ----------------------
  const deleteProduct = async (id) => {
    try {
      await api.delete(`/product/delete/${id}`); // consuming DELETE /product/delete/:id
      setProducts(products.filter(p => p.id !== id)); // remove deleted product from state
    } catch (err) {
      console.error('Error deleting product:', err.response?.data || err.message);
    }
  };

  // ---------------------- UPDATE PRODUCT ----------------------
  const updateProduct = async (product) => {
    const name = prompt('Product Name:', product.name);
    const description = prompt('Description:', product.description);
    const category = prompt('Category:', product.category);
    if (!name || !description || !category) return;

    try {
      await api.put(`/product/update/${product.id}`, { name, description, category }); // consuming PUT /product/update/:id
      setProducts(products.map(p => p.id === product.id ? { ...p, name, description, category } : p));
    } catch (err) {
      console.error('Error updating product:', err.response?.data || err.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#FF7F00' }}>Products</h2>
      <input type="text" placeholder="Product Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={input} />
      <input type="text" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={input} />
      <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={input}>
        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>
      <button onClick={addProduct} style={addBtn}>Add</button>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTd}>#</th>
            <th style={thTd}>Name</th>
            <th style={thTd}>Description</th>
            <th style={thTd}>Category</th>
            <th style={thTd}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, idx) => (
            <tr key={p.id}>
              <td style={thTd}>{idx + 1}</td>
              <td style={thTd}>{p.name}</td>
              <td style={thTd}>{p.description}</td>
              <td style={thTd}>{p.category}</td>
              <td style={thTd}>
                <button onClick={() => updateProduct(p)} style={actionBtn}>Edit</button>
                <button onClick={() => deleteProduct(p.id)} style={actionBtn}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const input = { padding: '0.5rem', marginRight: '0.5rem', marginTop: '0.5rem' };
const addBtn = { padding: '0.5rem', backgroundColor: '#FF7F00', color: '#fff', border: 'none', marginTop: '0.5rem' };
const thTd = { border: '1px solid #ddd', padding: '0.5rem', textAlign: 'left' };
const actionBtn = { marginRight: '0.5rem', padding: '0.3rem 0.6rem', backgroundColor: '#FF7F00', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' };
const tableStyle = { width: '100%', marginTop: '1rem', borderCollapse: 'collapse' };

export default Products;
