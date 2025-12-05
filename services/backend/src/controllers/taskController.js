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

const updateUserTask = () => {};

const deleteUserTask = () => {};

module.exports = {
    getAllUserTasks,
    updateUserTask,
    deleteUserTask,
};
