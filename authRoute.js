const express = require("express");
const router = express.Router();

const authController = require("../Controllers/authController");
const authMiddleware = require("../Middleware/authMiddleware");

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.post("/forget-password", authController.forgetPassword);

router.post("/reset-password", authController.resetPassword);

router.get("/users", authMiddleware, authController.getUsers);

module.exports = router;