import { useState, useEffect } from 'react';

/**
 * ItemForm component - Form for creating and updating items
 * @param {function} onSubmit - Callback when form is submitted
 * @param {object|null} editingItem - Item being edited (null for create mode)
 * @param {function} onCancel - Callback to cancel editing
 */
function ItemForm({ onSubmit, editingItem, onCancel }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  // Populate form when editing an item
  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name || '');
      setDescription(editingItem.description || '');
    } else {
      setName('');
      setDescription('');
    }
    setError('');
  }, [editingItem]);


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    try {
      await onSubmit({
        name: name.trim(),
        description: description.trim() || null
      });

      // Clear form after successful create (not edit)
      if (!editingItem) {
        setName('');
        setDescription('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const handleCancel = () => {
    setName('');
    setDescription('');
    setError('');
    onCancel();
  };

  return (
    <div className="item-form">
      <h2>{editingItem ? 'Edit Item' : 'Create New Item'}</h2>
      
      {error && <div className="alert alert-error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter item name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter item description (optional)"
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingItem ? 'Update Item' : 'Create Item'}
          </button>
          {editingItem && (
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ItemForm;
