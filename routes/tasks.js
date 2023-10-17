const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
const auth = require('../security/middleware');

router.get('/', auth, tasksController.getAllTasks);
router.post('/', auth, tasksController.createTask);
// ... other routes

module.exports = router;