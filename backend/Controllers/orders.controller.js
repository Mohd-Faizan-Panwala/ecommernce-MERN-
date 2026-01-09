const Order = require("../Models/Orders");

exports.createOrder = async (req, res) => {
  try {    
    const userId = req.user._id;

    const { address, mobile, items } = req.body;

    // 1️⃣ Basic validation
    if (!address || !mobile || !items || items.length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Calculate total amount
    let totalAmount = 0;

    items.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });

    // 3️⃣ Create order
    const order = await Order.create({
      user: userId,
      address,
      mobile,
      items,
      totalAmount,
    });

    // 4️⃣ Send response
    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email") // get user details
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};