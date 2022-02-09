const productModel = require("../models/product-model");
const { createCustomApiError } = require("../errors/custom-api-error");

const getProductListByCriteria = async (req, res, next) => {
  let queryFilters = {};

  //Setting up query filters.
  queryFilters = addQueryFilters(req.query, queryFilters);

  //Adding numeric filters.
  queryFilters = addNumericComparisonFilters(req.query, queryFilters);

  //Query Object.
  let productListQuery = productModel.find(queryFilters);

  //Chaining cursor method filters.
  productListQuery = addCursorMethodFilters(req.query, productListQuery);

  //Execute Query.
  const productList = await productListQuery;

  res.status(200).json({
    status: "Success",
    statusCode: 200,
    products: [...productList],
    nbHits: productList.length,
  });
};

const addQueryFilters = (queryString, queryFilters) => {
  let { name, featured } = queryString;
  if (name) {
    queryFilters.name = { $regex: new RegExp(name) };
  }
  if (featured) {
    queryFilters.featured = featured;
  }
  return queryFilters;
};

const addNumericComparisonFilters = (queryString, queryFilters) => {
  let { numericFilters } = queryString;
  let comparisonOperators = {
    ">": "$gt",
    "<": "$lt",
    ">=": "$gte",
    "<=": "$lte",
    "=": "eq",
  };

  if (numericFilters) {
    numericFilters = numericFilters.replace(
      /\b(<|<=|>|>=|=)\b/g,
      (match) => `-${comparisonOperators[match]}-`
    );
    numericFilters.split(",").forEach((elem, index) => {
      let [field, operator, value] = elem.split("-");
      queryFilters[field] = { [operator]: Number(value) };
    });
  }
  return queryFilters;
};

const addCursorMethodFilters = (queryString, productListQuery) => {
  let { sort, select, page, limit } = queryString;
  //Chaining sort criteria to <<Query>> obj if requested.
  if (sort) {
    const sortCriteria = sort.split(",").join(" ");
    productListQuery = productListQuery.sort(sortCriteria);
  }

  if (select) {
    const selectedFields = select.split(",").join(" ");
    productListQuery = productListQuery.select(selectedFields);
  }

  //Adding pagination to Query object if requested.
  if (page || limit) {
    page = Number(page) || 1;
    limit = Number(limit) || 5;
    let skip = (page - 1) * limit;
    productListQuery = productListQuery.skip(skip).limit(limit);
  }
  return productListQuery;
};

module.exports = { getProductListByCriteria };
