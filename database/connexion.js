const mysql = require('mysql2/promise'); // Ensure to use the promise-based version
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection(); // Get a connection from the pool
    console.log('Connected to MySQL database.');
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error('Database connection failed: ', err.stack);
  }
};

// Call the test function
testConnection();

module.exports = pool; // Export the pool for use in other modules

