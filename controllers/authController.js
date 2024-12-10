const bcrypt = require('bcrypt');
const User = require('../models/User');
const db= require ('../database/connexion')
const jwt = require('jsonwebtoken');
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
 
  
    // Ensure all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }
  
    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert user into database
      const [result] = await db.query(
        'INSERT INTO users (username, email, password, role, is_approved) VALUES (?, ?, ?, ?, ?)',
        [username, email, hashedPassword, 'player', true]
      );
  console.log("resultt", result)
      res.status(201).json({ message: "User registration successful, pending approval." });
    } catch (error) {
      console.error("Registration error:", error); // Log the exact error
      res.status(500).json({ error: "Erreur lors de l’inscription." });
    }
  };


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
      
    }

    // Compare passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Mot de passe incorrect.' });
    }

    // Check if the user account is approved
    // if (!user.is_approved) {
    //   return res.status(403).json({ error: 'Compte non approuvé.' });
    // }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set token in a cookie
    res.cookie('token', token, { httpOnly: true });

    // Send success response
    res.json({ message: 'Connexion réussie' });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: 'Erreur lors de la connexion.' });
  }
};
