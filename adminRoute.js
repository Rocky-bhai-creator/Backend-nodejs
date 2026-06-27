const router = require("express").Router();
const admin = require("../Controllers/adminController");

router.get("/users", admin.getAllUsers);

router.delete("/user/:id", admin.deleteUser);

module.exports = router;