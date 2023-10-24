const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
const auth = require('../security/middleware');

router.post('/', auth, tasksController.createTask);
router.get('/:taskId', auth, tasksController.getTaskById);
router.get('/user/:userId', auth, tasksController.getAllUserTasks);
router.put('/:taskId/description', auth, tasksController.addOrChangeDescription);
router.put('/:taskId/tags', auth, tasksController.addOrChangeTags);
router.get('/:taskId/children', auth, tasksController.getTaskChildren);
router.put('/:taskId/title', auth, tasksController.changeTitle);
router.delete('/:taskId', auth, tasksController.deleteTask);

module.exports = router;