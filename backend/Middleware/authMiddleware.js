const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const Admin = require("../Models/Admin");
const { generateToken,verifyToken } = require("../Token/jwt");

exports.auth = async (req, res, next) => {
  let token;

  // Token format: Bearer <token>
  if (
    req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
console.log("AUTH HEADER:", req.headers.authorization);

      // const decoded = generateToken(Admin)
      const decoded = verifyToken(token);
 if (decoded.role === "admin") {
      req.user = await Admin.findById(decoded.id).select("-password");
    } else if (decoded.role === "user") {
      req.user = await User.findById(decoded.id).select("-password");
    } else {
      return res.status(401).json({ message: "Invalid role in token" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }


      // req.user = await User.findById(decoded.id).select("-password");

      console.log("LOGGED IN USER:", req.user);

      next(); // move to another controller
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token, access denied" });
  }
};

exports.adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
};

