const productModel = require("../models/product-model");
const { createCustomApiError } = require("../errors/custom-api-error");

const getProductListByCriteria = async (req, res, next) => {
  let { featured, name, sort, select, page, limit } = req.query;
  let queryFilters = {};

  //Setting up query filters.
  if (name) {
    queryFilters.name = { $regex: new RegExp(name) };
  }
  if (featured) {
    queryFilters.featured = featured;
  }

  //Query Object.
  let productListQuery = productModel.find(queryFilters);

  //Chaining sort criteria to <<Query>> obj if requested.
  if (sort) {
    const sortCriteria = sort.split(",").join(" ");
    productListQuery = productListQuery.sort(sortCriteria);
  }

  if (select) {
    const selectedFields = select.split(",").join(" ");
    productListQuery = productListQuery.select(selectedFields);
  }

  //Adding pagination to Query object.
  if (page || limit) {
    page = Number(page) || 1;
    limit = Number(limit) || 5;
    let skip = (page - 1) * limit;
    productListQuery = productListQuery.skip(skip).limit(limit);
  }

  const productList = await productListQuery;

  res.status(200).json({
    status: "Success",
    statusCode: 200,
    products: [...productList],
    nbHits: productList.length,
  });
};

module.exports = { getProductListByCriteria };
