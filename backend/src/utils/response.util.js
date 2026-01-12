/**
 * Utility functions for consistent API responses
 */

/**
 * Send a success response
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Response message
 * @param {object|null} data - Response data
 */
const sendSuccess = (res, statusCode, message, data = null) => {
  res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

/**
 * Send an error response
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 */
const sendError = (res, statusCode, message) => {
  res.status(statusCode).json({
    success: false,
    message,
    data: null
  });
};

module.exports = {
  sendSuccess,
  sendError
};
