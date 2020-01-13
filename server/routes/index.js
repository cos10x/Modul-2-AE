const express = require("express");
const router = express.Router();
const { product, reset } = require("../controllers");

//reset
router.get("/reset", reset.reset);

//get all
router.get("/products", product.getAll);

//get one
router.get("/products/:id", product.getOne);

//add one
router.post("/products", product.addOne);

//update one
router.put("/products/:id", product.updateOne);

//delete one
router.delete("/products/:id", product.deleteOne);

module.exports = router;
