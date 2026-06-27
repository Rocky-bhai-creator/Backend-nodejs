const express = require("express");
const router = express.Router();
const upload = require("../Config/upload");
const controller = require("../Controllers/bannerController");

// Create Banner
router.post("/banner", upload.single("file"), controller.createBanner);

// Get all Banners
router.get("/banners", controller.getAllBanners);

// Get Banner by ID
router.get("/banner/:id", controller.getBannerById);

// Update Banner
router.put("/banner/:id", upload.single("file"), controller.updateBanner);

// Delete Banner
router.delete("/banner/:id", controller.deleteBanner);

module.exports = router;

