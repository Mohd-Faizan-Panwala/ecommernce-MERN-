const express = require("express");
const {userSignup,userLogin} = require("../Controllers/user.controller");
const {adminLogin,adminSignup} = require("../Controllers/admin.controller");

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);

router.post("/admin/signup", adminSignup);
router.post("/admin/login", adminLogin);

module.exports = router;
