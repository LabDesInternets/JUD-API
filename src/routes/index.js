const express = require("express");

const winesRouter = require("./wines_router");
const usersRouter = require("./users_router");
const ordersRouter = require("./orders_router");

const mainRouter = express.Router();

mainRouter.use("/wines", winesRouter);
mainRouter.use("/users", usersRouter);
mainRouter.use("/orders", ordersRouter);

module.exports = mainRouter;
