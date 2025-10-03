import React, { useState, useEffect } from 'react';
import { api, setAuthToken } from '../api/client';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  // ---------------------- FETCH CATEGORIES ----------------------
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) setAuthToken(token);

        const res = await api.get('/category/get/all'); // GET /category/get/all
        setCategories(res.data.categories);
      } catch (err) {
        console.error('Error fetching categories:', err.response?.data || err.message);
      }
    };

    fetchCategories();
  }, []);

  // ---------------------- ADD CATEGORY ----------------------
  const addCategory = async () => {
    if (!newCategory) return;
    try {
      const res = await api.post('/category/create', { name: newCategory }); // POST /category/create
      setCategories([...categories, { id: res.data.category_id, name: newCategory }]);
      setNewCategory('');
    } catch (err) {
      console.error('Error adding category:', err.response?.data || err.message);
    }
  };

  // ---------------------- UPDATE CATEGORY ----------------------
  const updateCategory = async (id, name) => {
    const updatedName = prompt('Update category name:', name);
    if (!updatedName) return;
    try {
      await api.put(`/categories/update/${id}`, { name: updatedName }); // PUT /category/update/:id
      setCategories(categories.map(c => c.id === id ? { ...c, name: updatedName } : c));
    } catch (err) {
      console.error('Error updating category:', err.response?.data || err.message);
    }
  };

  // ---------------------- DELETE CATEGORY ----------------------
  const deleteCategory = async (id) => {
    try {
      await api.delete(`/categories/delete/${id}`); // DELETE /category/delete/:id
      setCategories(categories.filter(c => c.id !== id));
    } catch (err) {
      console.error('Error deleting category:', err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h2 style={{ color: '#FF7F00' }}>Categories</h2>
      <input type="text" placeholder="Enter category name" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} style={input} />
      <button onClick={addCategory} style={addBtn}>Add</button>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTd}>#</th>
            <th style={thTd}>Category Name</th>
            <th style={thTd}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c, idx) => (
            <tr key={c.id}>
              <td style={thTd}>{idx + 1}</td>
              <td style={thTd}>{c.name}</td>
              <td style={thTd}>
                <button onClick={() => updateCategory(c.id, c.name)} style={actionBtn}>Edit</button>
                <button onClick={() => deleteCategory(c.id)} style={actionBtn}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const input = { padding: '0.5rem', marginRight: '0.5rem', marginTop: '0.5rem' };
const addBtn = { padding: '0.5rem', backgroundColor: '#FF7F00', color: '#fff', border: 'none' };
const thTd = { border: '1px solid #ddd', padding: '0.5rem', textAlign: 'left' };
const actionBtn = { marginRight: '0.5rem', padding: '0.3rem 0.6rem', backgroundColor: '#FF7F00', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' };
const tableStyle = { width: '100%', marginTop: '1rem', borderCollapse: 'collapse' };

export default Categories;
