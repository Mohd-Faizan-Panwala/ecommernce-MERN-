const Admin = require("../Models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../Token/jwt");

exports.adminSignup = async (req, res) => {
  try {
    const { name, email, password, adminSecret } = req.body;

    // Check admin secret key
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return res.status(403).json({ message: "Unauthorized admin creation" });
    }

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).json({
      message: "Admin created successfully",
        admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });



  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email, role: "admin" });
    if (!admin)
      return res.status(400).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    
const token = generateToken(admin._id, admin.role);

    console.log("LOGIN TOKEN GENERATED:", token);

    return res.json({
      message: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role
      }
    })
    // console.log("LOGIN TOKEN GENERATED:", token);   

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
