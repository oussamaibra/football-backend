const express = require('express');
const courtController = require('../controllers/getAllCourts'); // Chemin vers votre contrôleur
const router = express.Router();

// Route pour récupérer tous les terrains
router.get('/courts', courtController.getAllCourts);

module.exports = router;
