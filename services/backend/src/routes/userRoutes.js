const express = require("express");
const router = express.Router();
const {
    getMe,
    updateUsername,
    updateEmail,
    updatePassword,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/me", authMiddleware, getMe);

router.put("/updateUsername", authMiddleware, updateUsername);

router.put("/updateEmail", authMiddleware, updateEmail);

router.put("/updatePassword", authMiddleware, updatePassword);


module.exports = router;
