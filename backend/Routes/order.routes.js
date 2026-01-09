const express = require("express");
const {createOrder,getAllOrders,} = require("../controllers/orderController");
const { protect, adminOnly } = require("../Middleware/authMiddleware");

const router = express.Router();

// User places order
router.post("/", protect, createOrder);

// Admin gets all orders
router.get("/", protect, adminOnly, getAllOrders);

module.exports = router;
