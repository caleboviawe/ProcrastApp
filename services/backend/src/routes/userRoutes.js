const express = require("express");
const router = express.Router();
const {
    getMe,
    updateUsername,
    updateEmail,
    updatePassword,
    updateNotifications,
    deleteAccount,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/me", authMiddleware, getMe);

router.put("/updateUsername", authMiddleware, updateUsername);

router.put("/updateEmail", authMiddleware, updateEmail);

router.put("/updatePassword", authMiddleware, updatePassword);

router.put("/updateNotifications", authMiddleware, updateNotifications);

router.delete("/deleteAccount", authMiddleware, deleteAccount);


module.exports = router;
