const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
    getAllUserTasks,
    updateUserTask,
    deleteUserTask,
    addUserTask,
    getTaskDocument,
} = require("../controllers/taskController");

router.get("/allUserTasks", authMiddleware, getAllUserTasks);

router.put("/updateUserTask/:id", authMiddleware, updateUserTask);

router.delete("/deleteUserTask/:id", authMiddleware, deleteUserTask);

router.post("/addUserTask", authMiddleware, addUserTask);

router.post("/:id/document", authMiddleware, getTaskDocument);

module.exports = router;
