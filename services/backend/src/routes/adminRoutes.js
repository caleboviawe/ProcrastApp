const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getAllUsers, getAllTasks } = require("../controllers/adminController");

router.get("/allUsers", authMiddleware, getAllUsers);

router.get("/allTasks", authMiddleware, getAllTasks);

module.exports = router;
