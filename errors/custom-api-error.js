class CustomApiError extends Error {
  constructor(message, statusCode, status) {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
  }
}

const createCustomApiError = (msg, statusCd, status) => {
  return new CustomApiError(msg, statusCd);
};

module.exports = { CustomApiError, createCustomApiError };
