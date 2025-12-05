const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
    getAllUsers,
    getAllTasks,
    updateUser,
    deleteUser,
    deleteTask,
    updateTask,
} = require("../controllers/adminController");
const { checkAdmin } = require("../middleware/roleMiddleware.js");

router.get("/allUsers", authMiddleware, checkAdmin, getAllUsers);

router.put("/updateUser/:id", authMiddleware, checkAdmin, updateUser);

router.delete("/deleteUser/:id", authMiddleware, checkAdmin, deleteUser);

router.get("/allTasks", authMiddleware, checkAdmin, getAllTasks);

router.put("/updateTask/:id", authMiddleware, checkAdmin, updateTask);

router.delete("/deleteTask/:id", authMiddleware, checkAdmin, deleteTask);

module.exports = router;
