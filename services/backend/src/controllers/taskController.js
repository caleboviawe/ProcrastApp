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

const updateUserTask = async (req, res) => {
    const taskId = req.params.id;
    const { title, description, status_id, category_id, due_date } = req.body;

    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (task.userId !== req.user.id) {
            return res
                .status(403)
                .json({
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

const deleteUserTask = () => {};

module.exports = {
    getAllUserTasks,
    updateUserTask,
    deleteUserTask,
};
