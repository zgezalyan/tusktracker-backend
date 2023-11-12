const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
const auth = require('../middleware/auth');
const { validateTaskCreation, validateTaskDescription, validateTaskTags, validateTaskTitle, validateTaskParent } = require('../middleware/validation');

router.post('/', auth, validateTaskCreation, tasksController.createTask);
router.get('/:taskId', auth, tasksController.getTaskById);
router.get('/user/:userId', auth, tasksController.getAllUserTasks);
router.put('/:taskId/description', auth, validateTaskDescription, tasksController.addOrChangeDescription);
router.put('/:taskId/tags', auth, validateTaskTags, tasksController.addOrChangeTags);
router.get('/:taskId/children', auth, tasksController.getTaskChildren);
router.put('/:taskId/title', auth, validateTaskTitle, tasksController.changeTitle);
router.delete('/:taskId', auth, tasksController.deleteTask);
router.put('/:taskId/parent', auth, validateTaskParent, tasksController.addOrChangeParent);

module.exports = router;