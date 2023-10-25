const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
const auth = require('../middleware/auth');
const { validateTaskParameter } = require('../middleware/validation');

router.post('/', auth, validateTaskParameter, tasksController.createTask);
router.get('/:taskId', auth, validateTaskParameter, tasksController.getTaskById);
router.get('/user/:userId', auth, validateTaskParameter, tasksController.getAllUserTasks);
router.put('/:taskId/description', auth, validateTaskParameter, tasksController.addOrChangeDescription);
router.put('/:taskId/tags', auth, validateTaskParameter, tasksController.addOrChangeTags);
router.get('/:taskId/children', auth, validateTaskParameter, tasksController.getTaskChildren);
router.put('/:taskId/title', auth, validateTaskParameter, tasksController.changeTitle);
router.delete('/:taskId', auth, validateTaskParameter, tasksController.deleteTask);

module.exports = router;