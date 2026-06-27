const express = require('express');
const router = express.Router();

// ✅ VERY IMPORTANT: destructuring import
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

module.exports = router;