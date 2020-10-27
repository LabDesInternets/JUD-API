const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
// const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const {
  notFoundHandler,
  errorLogger,
  //errorHandler
} = require("./middlewares");
const routes = require("./routes");
require("./config/passport");
const errorHandler = require("./middlewares/errorHandler");
const logger = require("./helpers/logger");


const server = express();

server.use(helmet());
// server.use(logger("tiny"));
server.use(bodyParser.json());


server.use(passport.initialize());
server.use(passport.session());
server.use(
  "/api",
  cors({
    exposedHeaders: ["Content-Length", "xAuth"]
  })
);

server.use("/api/images", express.static("src/assets"));
server.use("/api", routes);

server.use(async (error, req, res, next) => {
  const isOperationalError = await errorHandler.handleError(error);
  if (!isOperationalError) {
    next(error);
  }
});

//server.use(notFoundHandler);
server.use(errorLogger);
//server.use(errorHandler);

module.exports = server;
