/**
 * Validation middleware for request data
 */
const { sendError } = require('../utils/response.util');

/**
 * Validate item data in request body
 * Ensures name field is present and non-empty
 */
const validateItem = (req, res, next) => {
  const { name } = req.body;

  // Check if request body is empty
  if (!req.body || Object.keys(req.body).length === 0) {
    return sendError(res, 400, 'Request body cannot be empty');
  }

  // Check if name is provided and non-empty
  if (!name || (typeof name === 'string' && name.trim() === '')) {
    return sendError(res, 400, 'Name field is required and must be non-empty');
  }

  next();
};

/**
 * Validate ID parameter
 * Ensures id is a valid integer
 */
const validateId = (req, res, next) => {
  const { id } = req.params;
  const parsedId = parseInt(id, 10);

  if (isNaN(parsedId) || parsedId <= 0) {
    return sendError(res, 400, 'ID must be a valid positive integer');
  }

  // Attach parsed ID to request for use in controller
  req.parsedId = parsedId;
  next();
};

module.exports = {
  validateItem,
  validateId
};
