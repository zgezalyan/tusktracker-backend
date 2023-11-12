const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const { validateUserRegistration } = require('../middleware/validation');
const auth = require('../middleware/auth');

router.post('/signup', validateUserRegistration, userController.signUp);
router.post('/login', userController.logIn);
router.get('/current-user', auth, userController.currentUser);

module.exports = router;