const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    secret,
    { expiresIn: "7d" }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, secret);
};

module.exports = {
  generateToken,
  verifyToken,
};
