const productModel = require("../models/product-model");
const { createCustomApiError } = require("../errors/custom-api-error");

const getProductListByCriteria = async (req, res, next) => {
  const { featured, name, sort } = req.query;
  let queryFilters = {};

  //Setting up query filters.
  if (name) {
    queryFilters.name = { $regex: new RegExp(name) };
  }
  if (featured) {
    queryFilters.featured = featured;
  }

  let productListQuery = productModel.find(queryFilters);

  //Chaining sort criteria to <<Query>> obj if requested.
  if (sort) {
    const sortCriteria = sort.split(",").join(" ");
    productListQuery = productListQuery.sort(sortCriteria);
  }

  const productList = await productListQuery;

  if (productList.length) {
    res.status(200).json({
      status: "Success",
      statusCode: 200,
      products: [...productList],
      nbHits: productList.length,
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

module.exports = { getProductListByCriteria };
