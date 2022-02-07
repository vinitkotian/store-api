const productModel = require("../models/product-model");
const { createCustomApiError } = require("../errors/custom-api-error");

const getProductList = async (req, res, next) => {
  const productList = await productModel.find(req.query);
  if (productList.length) {
    res.status(200).json({
      status: "Success",
      statusCode: 200,
      products: [...productList],
    });
  } else {
    let error = createCustomApiError(
      "No products match the given criteria.",
      404,
      "Success"
    );
    throw error;
  }
};

module.exports = { getProductList };
