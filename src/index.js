require("dotenv").config();
const logger = require("./helpers/logger");

const server = require("./server");

const port = process.env.PORT || 8000;
const env = process.env.NODE_ENV || "development";

/* eslint-disable no-console */
server.listen(port, () => {
  logger.info(`Server is listening on port ${port}`);
  logger.info(`Current environment is ${env}`);
});
