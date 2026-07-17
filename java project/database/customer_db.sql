-- ==========================================================
-- Customer Management System - Database Script
-- Database: customer_db
-- Table   : customers
-- ==========================================================

-- Create database
CREATE DATABASE IF NOT EXISTS customer_db;
USE customer_db;

-- Drop table if it already exists (for a clean re-run)
DROP TABLE IF EXISTS customers;

-- Create customers table
CREATE TABLE customers (
    id             BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_name  VARCHAR(100) NOT NULL,
    email          VARCHAR(100) NOT NULL UNIQUE,
    phone          VARCHAR(15)  NOT NULL,
    city           VARCHAR(50)  NOT NULL
);

-- ==========================================================
-- Sample seed data
-- ==========================================================
INSERT INTO customers (customer_name, email, phone, city) VALUES
('Rahul Sharma',   'rahul.sharma@example.com',   '9876543210', 'Hyderabad'),
('Priya Reddy',    'priya.reddy@example.com',    '9876543211', 'Bengaluru'),
('Amit Verma',     'amit.verma@example.com',     '9876543212', 'Pune'),
('Sneha Iyer',     'sneha.iyer@example.com',     '9876543213', 'Chennai'),
('Karan Mehta',    'karan.mehta@example.com',    '9876543214', 'Mumbai'),
('Divya Nair',     'divya.nair@example.com',     '9876543215', 'Kochi'),
('Arjun Singh',    'arjun.singh@example.com',    '9876543216', 'Delhi'),
('Neha Gupta',     'neha.gupta@example.com',     '9876543217', 'Jaipur');

-- ==========================================================
-- Helpful queries
-- ==========================================================

-- View all customers
-- SELECT * FROM customers;

-- Search customer by name
-- SELECT * FROM customers WHERE customer_name LIKE '%rahul%';

-- Find customer by id
-- SELECT * FROM customers WHERE id = 1;

-- Delete a customer
-- DELETE FROM customers WHERE id = 1;
