const Product = require("../Models/Products");

exports.addProduct = async (req, res) => { //to upload an item
  try {
    const { name, description, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image: req.file.filename,
      createdBy: req.user._id, // admin id
    });

    res.status(201).json({
      message: "Product added successfully",
      product, 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => { //to edit the existing product 
  try {
    const { name, description, price } = req.body;

    // Find product by ID
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update fields if provided
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;

    // If new image uploaded, update image
    if (req.file) {
      product.image = req.file.filename;
    }

    const updatedProduct = await product.save();

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteProduct = async (req, res) => { //to delete the existing product from db
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
