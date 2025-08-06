import React, { useState } from 'react';
import axios from 'axios';

function AddMenuItem({ onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/api/menu', formData)
      .then(response => {
        alert('Menu item added!');
        setFormData({ name: '', category: '', price: '' });
        if (onAdd) onAdd(); // refresh list after adding
      })
      .catch(error => {
        console.error('Error adding item:', error);
        alert('Error adding item.');
      });
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>Add New Menu Item</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <input
          name="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddMenuItem;
