/**
 * Server entry point
 * Loads environment variables and starts the Express server
 */
require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 5000;

// Only start server if not running on Vercel
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export for Vercel serverless
module.exports = app;
