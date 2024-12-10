const db = require('../database/connexion');

const User = {
  create: async (username, email, hashedPassword) => {
    const query = 'INSERT INTO users (username, email, password, role, is_approved) VALUES (?, ?, ?, ?, ?)';
    try {
      await db.execute(query, [username, email, hashedPassword, 'player', false]);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error; // Rethrow error to handle it at the controller level if needed
    }
  },

  findByEmail: async (email) => {
    try {
      console.log("Searching for user with email:", email);
      const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      console.log("Query result:", rows);
      return rows[0]; // Returns the first user or undefined if not found
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error; // Rethrow error for controller-level handling
    }
  },
  

  approveUser: async (userId) => {
    try {
      await db.execute('UPDATE users SET is_approved = ? WHERE id = ?', [true, userId]);
    } catch (error) {
      console.error('Error approving user:', error);
      throw error; // Rethrow error for controller-level handling
    }
  }
};

module.exports = User;
