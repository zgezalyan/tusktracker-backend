const Task = require('../models/Task');
const User = require('../models/User')
const { CustomError } = require('../middleware/errors');
const { default: mongoose } = require('mongoose');

exports.createTask = async (req, res, next) => {
    try {
        const { user, title, description, tags, parentTask } = req.body;

        if (!mongoose.Types.ObjectId.isValid(user)) {
            throw new CustomError('Invalid user id', 404);
        }
        const existingUser = await User.findById(user);
        let parent = null;   

        if (!existingUser) {
            throw new CustomError('User not found', 404);
        }

        if (parentTask){
            if (!mongoose.Types.ObjectId.isValid(parentTask)) {
                throw new CustomError('Invalid parent task id', 404);
            }
            parent = await Task.findById(parentTask);
            if (!parent) {
                throw new CustomError('Parent task does not exist', 404);
            }
            parent = parent._id;
        }
    
        // Create a new task with optional fields
        const task = new Task({
            user: existingUser._id,
            title,
            description: description || '', // Use provided description or an empty string
            tags: tags || [], // Use provided tags or an empty array
            parentTask:  parent, // Use provided parentTask or null
            dateCreated: new Date(), // Set dateCreated to the current date
        });

        await task.save();
        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
}

exports.getTaskById = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.taskId)) {
            throw new CustomError('Invalid task id', 404);
        }
        const task = await Task.findById(req.params.taskId);
        if (!task) {
            throw new CustomError('Task not found', 404);
        }
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
}

exports.getAllUserTasks = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
            throw new CustomError('Invalid user id', 404);
        }
        const tasks = await Task.find({ user: req.params.userId });
        if (!tasks.length) {
            throw new CustomError('User not found', 404);
        }
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
}

exports.addOrChangeDescription = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.taskId)) {
            throw new CustomError('Invalid task id', 404);
        }
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

exports.addOrChangeTags = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.taskId)) {
            throw new CustomError('Invalid task id', 404);
        }  
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

exports.getTaskChildren = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.taskId)) {
            throw new CustomError('Invalid task id', 404);
        }  
        const task = await Task.findById(req.params.taskId);
        if (!task) {
            throw new CustomError('Task not found', 404);
        }
        const children = await Task.find({ parentTask: req.params.taskId });      
        res.status(200).json(children);
    } catch (error) {
        next(error);
    }
}

exports.changeTitle = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.taskId)) {
            throw new CustomError('Invalid task id', 404);
        }  
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

exports.deleteTask = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.taskId)) {
            throw new CustomError('Invalid task id', 404);
        }  
        const task = await Task.findByIdAndRemove(req.params.taskId);
        if (!task) {
            throw new CustomError('Task not found', 404);
        }
        res.status(204).json({"status": "ok"});
    } catch (error) {
        next(error);
    }
}

exports.addOrChangeParent = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.taskId)) {
            throw new CustomError('Invalid task id', 404);
        }
        if (!mongoose.Types.ObjectId.isValid(req.body.parentId)) {
            throw new CustomError('Invalid parent task id', 404);
        }
        const parentTask = await Task.findById(req.body.parentId);
        if (!parentTask) {
            throw new CustomError('Parent task not found', 404);
        }
        const task = await Task.findByIdAndUpdate(
            req.params.taskId,
            { parrentTask: req.body.parentId },
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