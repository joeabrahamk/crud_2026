/**
 * Centralized error handling middleware
 * Catches all errors and returns consistent error responses
 */
const errorMiddleware = (err, req, res, next) => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);

  // Default error status and message
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    message,
    data: null
  });
};

module.exports = errorMiddleware;
