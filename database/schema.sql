-- Database setup script for CRUD application
-- Run this script to create the database, user, and table

-- Create database
CREATE DATABASE IF NOT EXISTS crud_app_db;

-- Create user (adjust password as needed)
CREATE USER IF NOT EXISTS 'crud_user'@'localhost' IDENTIFIED BY 'strongpassword';

-- Grant privileges
GRANT ALL PRIVILEGES ON crud_app_db.* TO 'crud_user'@'localhost';
FLUSH PRIVILEGES;

-- Use the database
USE crud_app_db;

-- Create items table
CREATE TABLE IF NOT EXISTS items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Optional: Insert sample data
-- INSERT INTO items (name, description) VALUES
--   ('Sample Item 1', 'This is a sample description'),
--   ('Sample Item 2', 'Another sample item');
