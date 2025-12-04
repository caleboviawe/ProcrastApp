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

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getAllUsers, getAllTasks };