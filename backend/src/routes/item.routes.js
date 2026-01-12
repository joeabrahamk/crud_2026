/**
 * Item routes - Defines CRUD endpoints for items
 */
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');
const { validateItem, validateId } = require('../middlewares/validate.middleware');

// POST /api/items - Create new item
router.post('/', validateItem, itemController.createItem);

// GET /api/items - Get all items
router.get('/', itemController.getAllItems);

// GET /api/items/:id - Get item by ID
router.get('/:id', validateId, itemController.getItemById);

// PUT /api/items/:id - Update item by ID
router.put('/:id', validateId, validateItem, itemController.updateItem);

// DELETE /api/items/:id - Delete item by ID
router.delete('/:id', validateId, itemController.deleteItem);

module.exports = router;
