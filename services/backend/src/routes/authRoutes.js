const express = require('express');
const router = express.Router();
const { register, login, googleLogin } = require('../controllers/authController');

const { check } = require('express-validator');
const validate = require('../middleware/validationMiddleware');

router.post('/register', [
    check('username', 'Please include a username').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], validate, register);

router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], validate, login);

router.post('/google', googleLogin);

module.exports = router;
