/**
 * Item model - Contains all SQL queries for items table
 * All queries use parameterized statements to prevent SQL injection
 */
const pool = require('../config/db');

/**
 * Create a new item
 * @param {string} name - Item name
 * @param {string|null} description - Item description
 * @returns {object} Insert result with insertId
 */
const create = async (name, description = null) => {
  const sql = 'INSERT INTO items (name, description) VALUES (?, ?)';
  const [result] = await pool.execute(sql, [name, description]);
  return result;
};

/**
 * Get all items
 * @returns {array} Array of all items
 */
const findAll = async () => {
  const sql = 'SELECT * FROM items ORDER BY created_at DESC';
  const [rows] = await pool.execute(sql);
  return rows;
};

/**
 * Get item by ID
 * @param {number} id - Item ID
 * @returns {object|null} Item object or null if not found
 */
const findById = async (id) => {
  const sql = 'SELECT * FROM items WHERE id = ?';
  const [rows] = await pool.execute(sql, [id]);
  return rows[0] || null;
};

/**
 * Update item by ID
 * @param {number} id - Item ID
 * @param {string} name - Updated name
 * @param {string|null} description - Updated description
 * @returns {object} Update result with affectedRows
 */
const update = async (id, name, description = null) => {
  const sql = 'UPDATE items SET name = ?, description = ? WHERE id = ?';
  const [result] = await pool.execute(sql, [name, description, id]);
  return result;
};

/**
 * Delete item by ID
 * @param {number} id - Item ID
 * @returns {object} Delete result with affectedRows
 */
const remove = async (id) => {
  const sql = 'DELETE FROM items WHERE id = ?';
  const [result] = await pool.execute(sql, [id]);
  return result;
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove
};
