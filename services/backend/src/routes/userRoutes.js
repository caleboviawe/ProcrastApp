const express = require("express");
const router = express.Router();
const {
    getMe,
    updateUsername,
    updateEmail,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/me", authMiddleware, getMe);

router.put("/updateUsername", authMiddleware, updateUsername);

router.put("/updateEmail", authMiddleware, updateEmail);


module.exports = router;
