const express = require("express");
const router = express.Router();
const upload = require("../Config/upload");
const controller = require("../Controllers/allimageController");

// Create
router.post("/createFile", upload.single("file"), controller.createFile);

// Get All
router.get("/", controller.getAllFiles);

// Get By ID
router.get("/:id", controller.getFileById);

// Update
router.put("/:id", upload.single("file"), controller.updateFile);

// selective delete
router.delete("/selective/delete", controller.selectiveDelete);

// Delete All
router.delete("/all/delete", controller.deleteAll);

// Delete By ID
router.delete("/:id", controller.deleteById);


module.exports = router;