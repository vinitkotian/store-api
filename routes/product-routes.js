const express = require("express");
const productRouter = express.Router();
const {
  getProductListByCriteria,
} = require("../controllers/product-controller");

productRouter.get("/", getProductListByCriteria);

module.exports = productRouter;
