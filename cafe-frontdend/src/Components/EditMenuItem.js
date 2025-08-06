import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditMenuItem({ item, onClose, onUpdate }) {
  const [formData, setFormData] = useState({ ...item });

  useEffect(() => {
    setFormData({ ...item });
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/api/menu/${item.id}`, formData)
      .then(() => {
        alert('Item updated!');
        onUpdate();
        onClose();
      })
      .catch(error => {
        console.error('Update failed:', error);
        alert('Error updating item.');
      });
  };

  return (
    <div style={{
      background: '#f9f9f9',
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '20px'
    }}>
      <h3>Edit Item</h3>
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
        <button type="submit">Update</button>
        <button onClick={onClose} type="button" style={{ marginLeft: '10px' }}>Cancel</button>
      </form>
    </div>
  );
}

export default EditMenuItem;
