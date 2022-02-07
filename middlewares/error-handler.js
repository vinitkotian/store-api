const { CustomApiError } = require("../errors/custom-api-error");
const handleErrors = (error, req, res, next) => {
  if (error instanceof CustomApiError) {
    res.json({
      status: "Failure",
      statusCode: error.statusCode,
      errorMsg: error.message,
    });
  } else {
    res.json({
      status: "Failure",
      statusCode: 500,
      errorMsg: "Internal server error, something went wrong!",
    });
  }
};

module.exports = handleErrors;
