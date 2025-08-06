import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddMenuItem from './AddMenuItem';
import EditMenuItem from './EditMenuItem';

function MenuList() {
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState('');
  const [editingItem, setEditingItem] = useState(null); // for edit state

  // Fetch all items
  const fetchMenu = () => {
    axios.get('http://localhost:8080/api/menu')
      .then(response => setMenuItems(response.data))
      .catch(error => {
        console.error('Error fetching menu:', error);
        setError('Could not load menu.');
      });
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      axios.delete(`http://localhost:8080/api/menu/${id}`)
        .then(() => fetchMenu())
        .catch(error => {
          console.error('Error deleting item:', error);
          alert('Failed to delete item.');
        });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>☕ Cafe Menu</h2>

      {/* Add Form */}
      <AddMenuItem onAdd={fetchMenu} />

      {/* Edit Form */}
      {editingItem && (
        <EditMenuItem
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onUpdate={fetchMenu}
        />
      )}

      {/* Error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Menu List */}
      <div style={{
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))'
      }}>
        {menuItems.map(item => (
          <div
            key={item.id}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              boxShadow: '2px 2px 10px rgba(0,0,0,0.1)'
            }}
          >
            <h3>{item.name}</h3>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Price:</strong> ₹{item.price}</p>

            {/* Action buttons */}
            <button
              onClick={() => handleDelete(item.id)}
              style={{
                backgroundColor: 'red',
                color: 'white',
                padding: '6px 10px',
                marginRight: '8px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>

            <button
              onClick={() => setEditingItem(item)}
              style={{
                backgroundColor: 'orange',
                color: 'white',
                padding: '6px 10px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuList;
