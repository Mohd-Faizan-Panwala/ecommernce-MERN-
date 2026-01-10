const express = require("express");
const { addProduct,updateProduct,deleteProduct } = require("../Controllers/product.controller");
const { auth, adminOnly } = require("../Middleware/authMiddleware");
const upload = require("../Middleware/upload");

const router = express.Router();

router.post("/",auth,adminOnly,upload.single("image"),addProduct); //add product
router.put("/:id",auth,adminOnly,upload.single("image"),updateProduct); //update the existing product
router.delete("/:id", auth, adminOnly, deleteProduct);//delet the existing product from the db 

module.exports = router;
