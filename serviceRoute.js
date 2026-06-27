const express = require("express");
const serviceController = require("../Controllers/serviceController")

const router = express.Router()

router.post("/create-service", serviceController.createService);
router.get("/all-service", serviceController.getAllServices);
router.get("/all-service/:id", serviceController.getAllServicesById);
router.put("/update-service/:id", serviceController.updateService);
router.delete("/delete-service/:id", serviceController.deleteService);

module.exports = router