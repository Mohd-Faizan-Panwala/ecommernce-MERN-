const express = require("express");
const { addProduct,updateProduct,deleteProduct,getAllProducts } = require("../Controllers/product.controller");
const { auth, adminOnly } = require("../Middleware/authMiddleware");
const {toggleStock} = require("../Controllers/product.controller");

const upload = require("../Middleware/upload");

const router = express.Router();

router.get("/",getAllProducts);//to render the orders in admin side 
router.post("/",auth,adminOnly,upload.single("image"),addProduct); //add product
router.put("/:id",auth,adminOnly,upload.single("image"),updateProduct); //update the existing product
router.delete("/:id", auth, adminOnly, deleteProduct);//delet the existing product from the db 
router.patch("/:id/stock", auth, adminOnly, toggleStock);


module.exports = router;
