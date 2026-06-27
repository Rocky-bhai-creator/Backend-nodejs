const router = require("express").Router();
const user = require("../Controllers/userController");

router.get("/profile", user.getProfile);

module.exports = router;