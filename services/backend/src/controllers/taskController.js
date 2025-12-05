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
        res.status(500).json({ message: "Server error" });
    }
};

const updateUserTask = async (req, res, next) => {
    const taskId = req.params.id;
    const { title, description, status_id, category_id, due_date } = req.body;

    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (task.userId !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to update this task",
            });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status_id = status_id || task.status_id;
        task.category_id = category_id || task.category_id;
        task.due_date = due_date || task.due_date;

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

        if (task.userId !== req.user.id) {
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
    const { title, description, status_id, category_id, due_date } = req.body;
    console.log("Adding task for user:", req.user.id);
    try {
        if (req.user.id == null) {
            return res.status(400).json({ message: "Invalid user" });
        }
        const newTask = await Task.create({
            title,
            description,
            statusId: status_id,
            categoryId: category_id,
            dueDate: due_date,
            userId: req.user.id,
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
