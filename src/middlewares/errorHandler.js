const determineIfOperationalError = require("../helpers/errors/is_it_operational_error");

function errorHandler() {
  this.handleError = async error => {
    // await logger.logError(err);
    // await sendMailToAdminIfCritical;
    // await saveInOpsQueueIfCritical;
    await determineIfOperationalError;
  };
}
module.exports = new errorHandler();
