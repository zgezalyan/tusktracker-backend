const Task = require('../models/Task');

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.createTask = async (req, res) => {
    // ... logic to create a task
};