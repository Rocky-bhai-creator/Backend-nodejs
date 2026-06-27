const express = require("express");
const router = express.Router();
const productController = require("../Controllers/productController");
// const authMiddleware = require("../Middleware/authMiddleware");
router.post("/create_product", productController.createProduct);
router.get("/all-products", productController.getAllProducts)
router.get("/all-products/:id", productController.getAllProductsById);
router.put("/update-product/:id", productController.updateProduct);
router.delete("/delete-product/:id", productController.deleteProduct);
router.get("/products", productController.getProducts);
module.exports = router;