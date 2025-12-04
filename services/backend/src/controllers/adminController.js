const User = require("../models/User");

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

module.exports = { getAllUsers };