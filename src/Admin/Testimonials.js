import React, { useState, useEffect } from 'react';
import { api, setAuthToken } from '../api/client';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({ name: '', job: '', message: '' });

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) setAuthToken(token);

        const res = await api.get('/testimonial/get/all'); // GET
        setTestimonials(res.data.testimonials);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };
    fetchTestimonials();
  }, []);

  const addTestimonial = async () => {
    if (!form.message) return;
    try {
      const res = await api.post('/testimonial/create', form); // POST
      setTestimonials([...testimonials, { id: res.data.testimonial_id, ...form }]);
      setForm({ name: '', job: '', message: '' });
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const updateTestimonial = async (t) => {
    const name = prompt('Name:', t.name);
    const job = prompt('Job:', t.job);
    const message = prompt('Message:', t.message);
    if (!message) return;
    try {
      await api.put(`/testimonial/update/${t.id}`, { name, job, message }); // PUT
      setTestimonials(testimonials.map(test => test.id === t.id ? { ...test, name, job, message } : test));
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const deleteTestimonial = async (id) => {
    try {
      await api.delete(`/testimonial/delete/${id}`); // DELETE
      setTestimonials(testimonials.filter(t => t.id !== id));
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#FF7F00' }}>Testimonials</h2>
      <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={input} />
      <input type="text" placeholder="Job" value={form.job} onChange={e => setForm({ ...form, job: e.target.value })} style={input} />
      <input type="text" placeholder="Message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={input} />
      <button onClick={addTestimonial} style={addBtn}>Add</button>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTd}>#</th>
            <th style={thTd}>Name</th>
            <th style={thTd}>Job</th>
            <th style={thTd}>Message</th>
            <th style={thTd}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((t, idx) => (
            <tr key={t.id}>
              <td style={thTd}>{idx + 1}</td>
              <td style={thTd}>{t.name}</td>
              <td style={thTd}>{t.job}</td>
              <td style={thTd}>{t.message}</td>
              <td style={thTd}>
                <button onClick={() => updateTestimonial(t)} style={actionBtn}>Edit</button>
                <button onClick={() => deleteTestimonial(t.id)} style={actionBtn}>Delete</button>
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

export default Testimonials;
