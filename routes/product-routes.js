const express = require("express");
const productRouter = express.Router();
const { getProductList } = require("../controllers/product-controller");

productRouter.get("/", getProductList);

module.exports = productRouter;
