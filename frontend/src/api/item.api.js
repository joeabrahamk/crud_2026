/**
 * Item API - Axios HTTP client for item CRUD operations
 */
import axios from 'axios';

const API_BASE_URL = '/api/items';

/**
 * Create a new item
 * @param {object} itemData - { name, description }
 * @returns {Promise} API response
 */
export const createItem = async (itemData) => {
  const response = await axios.post(API_BASE_URL, itemData);
  return response.data;
};

/**
 * Get all items
 * @returns {Promise} API response with items array
 */
export const getAllItems = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

/**
 * Get item by ID
 * @param {number} id - Item ID
 * @returns {Promise} API response with item data
 */
export const getItemById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

/**
 * Update item by ID
 * @param {number} id - Item ID
 * @param {object} itemData - { name, description }
 * @returns {Promise} API response with updated item
 */
export const updateItem = async (id, itemData) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, itemData);
  return response.data;
};

/**
 * Delete item by ID
 * @param {number} id - Item ID
 * @returns {Promise} API response
 */
export const deleteItem = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};
