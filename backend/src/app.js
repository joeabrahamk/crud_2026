/**
 * Express application configuration
 * Sets up middleware, routes, and error handling
 */
const express = require('express');
const cors = require('cors');
const itemRoutes = require('./routes/item.routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/items', itemRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running', data: null });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    data: null
  });
});

// Centralized error handling middleware
app.use(errorMiddleware);

module.exports = app;
