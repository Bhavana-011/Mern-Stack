require('dotenv').config();

const express = require('express');
const connectDB = require('./utils/db');

const authRoutes = require('./routes/authRoutes');
const requestRoutes = require('./routes/requestRoutes');

const adminRoutes = require('./routes/adminRoutes');


const app = express();

//  1. Connect to MongoDB
connectDB();

//  2. Middleware
app.use(express.json());

//  3. Routes
app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/admin', adminRoutes);

//  4. Test route
app.get('/', (req, res) => {
  res.send("Backend running ");
});

//  5. Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});