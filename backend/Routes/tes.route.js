const express = require("express");
const { auth, adminOnly } = require("../Middleware/authMiddleware");

const router = express.Router();

// Any logged-in user
router.get("/user",auth,(req, res) => {
   res.json({
    message: "User access granted",
    user: req.user,
  });
});

// Only admin
router.get("/admin",auth, adminOnly, (req, res) => {
  res.json({
    message: "Admin access granted",
  });
});

module.exports = router;
