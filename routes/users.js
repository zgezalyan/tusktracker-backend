const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const { validateUserRegistration } = require('../middleware/validation');

router.post('/signup', validateUserRegistration, userController.signUp);
router.post('/login', userController.logIn);

module.exports = router;