const AppError = require("./appError");

function determineIfOperationalError(error) {
  if (error instanceof AppError) {
    return error.isOperational;
  }
  return false;
}

module.exports = determineIfOperationalError;
