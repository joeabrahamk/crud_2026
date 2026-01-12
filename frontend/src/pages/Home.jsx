import { useState, useEffect, useCallback } from 'react';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';
import * as itemApi from '../api/item.api';

/**
 * Home page - Main CRUD interface
 * Manages state for items, loading, errors, and editing
 */
function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  /**
   * Fetch all items from API
   */
  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await itemApi.getAllItems();
      setItems(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch items');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load items on mount
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  /**
   * Handle form submission for create/update
   * @param {object} itemData - { name, description }
   */
  const handleSubmit = async (itemData) => {
    if (editingItem) {
      // Update existing item
      await itemApi.updateItem(editingItem.id, itemData);
      setSuccessMessage('Item updated successfully');
      setEditingItem(null);
    } else {
      // Create new item
      await itemApi.createItem(itemData);
      setSuccessMessage('Item created successfully');
    }
    fetchItems();
  };

  /**
   * Set item for editing
   * @param {object} item - Item to edit
   */
  const handleEdit = (item) => {
    setEditingItem(item);
    setSuccessMessage('');
  };

  /**
   * Cancel editing mode
   */
  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  /**
   * Delete an item
   * @param {number} id - Item ID to delete
   */
  const handleDelete = async (id) => {
    try {
      await itemApi.deleteItem(id);
      setSuccessMessage('Item deleted successfully');
      fetchItems();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete item');
    }
  };

  return (
    <div className="container">
      <h1>CRUD Application</h1>
      
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      
      <ItemForm
        onSubmit={handleSubmit}
        editingItem={editingItem}
        onCancel={handleCancelEdit}
      />
      
      <ItemList
        items={items}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Home;
