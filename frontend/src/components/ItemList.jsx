/**
 * ItemList component - Displays list of items with edit/delete actions
 * @param {array} items - Array of item objects
 * @param {boolean} loading - Loading state
 * @param {string|null} error - Error message
 * @param {function} onEdit - Callback to edit an item
 * @param {function} onDelete - Callback to delete an item
 */
function ItemList({ items, loading, error, onEdit, onDelete }) {
  /**
   * Format date string for display
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  /**
   * Handle delete with confirmation
   * @param {object} item - Item to delete
   */
  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      onDelete(item.id);
    }
  };

  return (
    <div className="item-list">
      <h2>Items</h2>
      
      {loading && <div className="loading">Loading items...</div>}
      
      {error && <div className="error">{error}</div>}
      
      {!loading && !error && items.length === 0 && (
        <div className="no-items">No items found. Create one above!</div>
      )}
      
      {!loading && !error && items.length > 0 && (
        <ul className="items">
          {items.map((item) => (
            <li key={item.id} className="item">
              <div className="item-content">
                <div className="item-name">{item.name}</div>
                {item.description && (
                  <div className="item-description">{item.description}</div>
                )}
                <div className="item-date">
                  Created: {formatDate(item.created_at)}
                </div>
              </div>
              <div className="item-actions">
                <button
                  className="btn btn-edit"
                  onClick={() => onEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ItemList;
