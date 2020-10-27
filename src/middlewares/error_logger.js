const logger = require("../helpers/logger");

function errorLogger(err, req, res, next) {
  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
    req.method
    } - ${req.ip}`
  );
  logger.error(`${err.stack}`);
  next(err);
}

// const errorLogger = (error, request, response, next) => {
//   console.error(`${error.name}: ${error.title}\n  ${error.detail}`);
//   next(error);
// };

module.exports = errorLogger;
