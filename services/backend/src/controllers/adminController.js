const User = require("../models/User");
const Task = require("../models/Task");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ["password"] },
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { username, email, role } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.username = username || user.username;
        user.email = email || user.email;
        user.role = role || user.role;

        await user.save();
        res.json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.destroy();
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const updateTask = async (req, res) => {
    const taskId = req.params.id;
    const { title, description, dueDate, statusId, categoryId } = req.body;

    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.statusId = statusId || task.statusId;
        task.categoryId = categoryId || task.categoryId;

        await task.save();
        res.json({ message: "Task updated successfully", task });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const deleteTask = async (req, res) => {
    const taskId = req.params.id;
    
    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        
        await task.destroy();
        res.json({ message: "Task deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getAllUsers,
    getAllTasks,
    updateUser,
    deleteUser,
    deleteTask,
    updateTask,
};