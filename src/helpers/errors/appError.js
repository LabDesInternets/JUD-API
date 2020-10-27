// function AppError(name, httpCode, description, isOperational) {
//   Error.call(this);
//   Error.captureStackTrace(this);
//   this.name = name;

// };

// AppError.prototype = Object.create(Error.prototype);
// AppError.prototype.constructor = AppError;

class AppError {
  constructor(name, httpCode, description, isOperational) {
    Error.call(this);
    Error.captureStackTrace(this);
    this.name = name;
    this.httpCode = httpCode;
    this.description = description;
    this.isOperational = isOperational;
  }
}

module.exports.AppError = AppError;
