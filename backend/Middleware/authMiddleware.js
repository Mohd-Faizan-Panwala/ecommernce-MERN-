const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const { setUser } = require("../Token/jwt");

exports.auth = async (req, res, next) => {
  let token;

  // Token format: Bearer <token>
  if (
    req.headers.authorization && req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = setUser(User)

      req.user = await User.findById(decoded.id).select("-password");

      next(); // move to controller
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

