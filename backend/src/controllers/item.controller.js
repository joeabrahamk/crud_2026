/**
 * Item controller - Handles HTTP request logic
 * Delegates database operations to the model layer
 */
const itemModel = require('../models/item.model');
const { sendSuccess, sendError } = require('../utils/response.util');

/**
 * Create a new item
 * POST /api/items
 */
const createItem = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const result = await itemModel.create(name.trim(), description?.trim() || null);
    
    const newItem = await itemModel.findById(result.insertId);
    sendSuccess(res, 201, 'Item created successfully', newItem);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all items
 * GET /api/items
 */
const getAllItems = async (req, res, next) => {
  try {
    const items = await itemModel.findAll();
    sendSuccess(res, 200, 'Items retrieved successfully', items);
  } catch (error) {
    next(error);
  }
};

/**
 * Get item by ID
 * GET /api/items/:id
 */
const getItemById = async (req, res, next) => {
  try {
    const item = await itemModel.findById(req.parsedId);
    
    if (!item) {
      return sendError(res, 404, 'Item not found');
    }
    
    sendSuccess(res, 200, 'Item retrieved successfully', item);
  } catch (error) {
    next(error);
  }
};

/**
 * Update item by ID
 * PUT /api/items/:id
 */
const updateItem = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    
    // Check if item exists
    const existingItem = await itemModel.findById(req.parsedId);
    if (!existingItem) {
      return sendError(res, 404, 'Item not found');
    }
    
    await itemModel.update(req.parsedId, name.trim(), description?.trim() || null);
    
    const updatedItem = await itemModel.findById(req.parsedId);
    sendSuccess(res, 200, 'Item updated successfully', updatedItem);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete item by ID
 * DELETE /api/items/:id
 */
const deleteItem = async (req, res, next) => {
  try {
    // Check if item exists
    const existingItem = await itemModel.findById(req.parsedId);
    if (!existingItem) {
      return sendError(res, 404, 'Item not found');
    }
    
    await itemModel.remove(req.parsedId);
    sendSuccess(res, 200, 'Item deleted successfully', null);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem
};
