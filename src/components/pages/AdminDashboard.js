
// Add this inside AdminDashboard.js
import React, { useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [form, setForm] = useState({
    name: '',
    price: '',
    image: '',
    description: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://ecommerce-back-c18i.onrender.com/api/products', form);
      alert('Product added successfully!');
      setForm({ name: '', price: '', image: '', description: '' });
    } catch (err) {
      console.error(err);
      alert('Error adding product');
    }
  };

  return (
    <div className="admin">
      <h1 className="admin-title">Admin Dashboard</h1>
      <form onSubmit={handleSubmit} className="add-product-form">
        <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
