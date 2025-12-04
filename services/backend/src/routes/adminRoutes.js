const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getAllUsers, getAllTasks } = require("../controllers/adminController");
const { checkAdmin } = require("../middleware/roleMiddleware.js");

router.get("/allUsers", authMiddleware, checkAdmin, getAllUsers);

router.get("/allTasks", authMiddleware, checkAdmin, getAllTasks);

module.exports = router;
