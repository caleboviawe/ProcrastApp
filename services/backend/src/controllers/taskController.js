const User = require("../models/User");
const Task = require("../models/Task");

const getAllUserTasks = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const tasks = await Task.findAll({
            where: { user_id: userId },
        });
        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

const updateUserTask = async (req, res, next) => {
    const taskId = req.params.id;

    const { title, description, status_id, category_id, due_date, status, has_document } = req.body;

    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (task.user_id !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to update this task",
            });
        }
        
        task.title = title || task.title;
        task.description = description || task.description;
        task.status_id = status_id || task.status_id;
        task.category_id = category_id || task.category_id;
        task.due_date = due_date || task.due_date;
        task.updated_at = new Date();
        task.status = status || task.status;
        if (has_document !== undefined) task.has_document = has_document;


        await task.save();
        res.json({ message: "Task updated successfully", task });
    } catch (error) {
        next(error);
    }
};

const deleteUserTask = async (req, res, next) => {
    const taskId = req.params.id;

    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (task.user_id !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to delete this task",
            });
        }

        await task.destroy();
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        next(error);
    }
};

const addUserTask = async (req, res, next) => {
    const { title, description, status_id, category_id, due_date, has_document } = req.body;

    try {
        if (req.user.id == null) {
            return res.status(400).json({ message: "Invalid user" });
        }
        const newTask = await Task.create({
            title,
            description,
            status_id,
            category_id,
            due_date,
            user_id: req.user.id,
            has_document
        });

        res.status(201).json({ message: "Task created successfully", newTask });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUserTasks,
    updateUserTask,
    deleteUserTask,
    addUserTask,
};
