const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const courtRoutes = require('./routes/courts');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('JWT_SECRET:', process.env.JWT_SECRET);

app.use('/auth', authRoutes);
app.use('/reservations', reservationRoutes);
app.use('/courts', courtRoutes); 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
