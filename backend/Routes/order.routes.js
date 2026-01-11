const express = require("express");
const {createOrder,getAllOrders,updateOrderStatus} = require("../Controllers/orders.controller");
const { auth, adminOnly } = require("../Middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, createOrder);
router.get("/", auth, adminOnly, getAllOrders);
router.get("/my", auth, getAllOrders);
router.put("/:id", auth, adminOnly, updateOrderStatus);



module.exports = router;
