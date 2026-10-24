const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Kayıt rotası
router.post('/register', authController.register);

// Giriş rotası 
router.post('/login', authController.login);

// Şifremi unuttum rotası
router.put('/forgot_password', authController.forgotPassword);

module.exports = router;