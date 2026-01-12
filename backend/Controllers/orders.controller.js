const Order = require("../Models/Orders");
const Product = require("../Models/Products");
// order create update and delete 
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { address, mobile, items } = req.body;

    // 1️⃣ Validation
    if (!address || !mobile || !items || items.length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Calculate total amount
    let totalAmount = 0;

    for (let item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const quantity = Number(item.quantity);

      if (isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ message: "Invalid quantity" });
      }

      totalAmount += product.price * quantity;
    }

    // Safety check
    if (isNaN(totalAmount)) {
      return res
        .status(400)
        .json({ message: "Total amount calculation failed" });
    }

    // 3️⃣ Create order
    const order = await Order.create({
      user: userId,
      address,
      mobile,
      items,
      totalAmount,
    });

    // 4️⃣ Response
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

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const allowedStatus = {
      pending: ["confirmed"],
      confirmed: ["shipped"],
      shipped: ["out for delivery"],
      out_for_delivery: ["delivered"],
      delivered: [],
    };

    if (!allowedStatus[order.status].includes(status)) {
      return res.status(400).json({
        message: `Cannot change status from ${order.status} to ${status}`,
      });
    }

    order.status = status;
    await order.save();

    res.json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.userOrders = async (req, res) =>{
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product", "name price image")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

