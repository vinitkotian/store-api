const productModel = require("../models/product-model");
const { createCustomApiError } = require("../errors/custom-api-error");

const getProductList = async (req, res, next) => {
  const { featured } = req.query;
  queryParams = {};
  if (featured) {
    queryParams = req.query;
  }
  const productList = await productModel.find(queryParams);
  if (productList) {
    res.status(200).json({
      status: "Success",
      statusCode: 200,
      products: [...productList],
    });
  } else {
    let error = createCustomApiError(
      "No products math the given criteria.",
      404,
      "Success"
    );
    throw error;
  }
};

module.exports = { getProductList };
