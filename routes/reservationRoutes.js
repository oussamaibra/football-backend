const express = require('express');
const reservationController = require('../controllers/reservationController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/reserve', verifyToken, reservationController.createReservation);

module.exports = router;
