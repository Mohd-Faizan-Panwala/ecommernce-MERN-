const express = require("express");
const {createOrder,getAllOrders} = require("../Controllers/orders.controller");
const { auth, adminOnly } = require("../Middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, createOrder);

router.get("/", auth, adminOnly, getAllOrders);

module.exports = router;
