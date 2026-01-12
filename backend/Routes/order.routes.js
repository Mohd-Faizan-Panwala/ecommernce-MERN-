const express = require("express");
const {createOrder,getAllOrders,updateOrderStatus,userOrders} = require("../Controllers/orders.controller");
const { auth, adminOnly } = require("../Middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, createOrder);
router.get("/userorders", auth, userOrders);
router.get("/", auth, adminOnly, getAllOrders);
router.get("/my", auth, getAllOrders);
router.put("/:id", auth, adminOnly, updateOrderStatus);

module.exports = router;
