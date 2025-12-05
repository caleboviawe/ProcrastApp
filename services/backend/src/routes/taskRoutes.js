const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
    getAllUserTasks,
    updateUserTask,
    deleteUserTask,
} = require("../controllers/taskController");

router.get("/allUsersTask", authMiddleware, getAllUserTasks);

router.put("/updateUserTask/:id", authMiddleware, updateUserTask);

router.delete("/deleteUserTask/:id", authMiddleware, deleteUserTask);

module.exports = router;
