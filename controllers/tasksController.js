const Task = require('../models/Task');
const { CustomError } = require('../middleware/errors');

exports.createTask = async (req, res) => {
    try {
        const { user, title, description, tags, parentTask } = req.body;
    
        // Create a new task with optional fields
        const task = new Task({
          user,
          title,
          description: description || '', // Use provided description or an empty string
          tags: tags || [], // Use provided tags or an empty array
          parentTask: parentTask || null, // Use provided parentTask or null
          dateCreated: new Date(), // Set dateCreated to the current date
        });
    
        await task.save();
        res.status(201).json(task);
      } catch (error) {
        next(error);
      }
}

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        if (!task) {
            throw new CustomError('Task not found', 404);
        }
        res.status(200).json(task);
      } catch (error) {
        next(error);
      }
}

exports.getAllUserTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.params.userId });
        res.status(200).json(tasks);
      } catch (error) {
        next(error);
      }
}

exports.addOrChangeDescription = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
          req.params.taskId,
          { description: req.body.description },
          { new: true }
        );
        if (!task) {
            throw new CustomError('Task not found', 404);
        }
        res.status(200).json(task);
      } catch (error) {
        next(error);
      }
}

exports.addOrChangeTags = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
          req.params.taskId,
          { tags: req.body.tags },
          { new: true }
        );
        if (!task) {
            throw new CustomError('Task not found', 404);
        }
        res.status(200).json(task);
      } catch (error) {
        next(error);
      }
}

exports.getTaskChildren = async (req, res) => {
    try {
        const children = await Task.find({ parentTask: req.params.taskId });
        res.status(200).json(children);
      } catch (error) {
        next(error);
      }
}

exports.changeTitle = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
          req.params.taskId,
          { title: req.body.title },
          { new: true }
        );
        if (!task) {
            throw new CustomError('Task not found', 404);
        }
        res.status(200).json(task);
      } catch (error) {
        next(error);
      }
}

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndRemove(req.params.taskId);
        if (!task) {
            throw new CustomError('Task not found', 404);
        }
        res.status(204).send();
      } catch (error) {
        next(error);
      }
}