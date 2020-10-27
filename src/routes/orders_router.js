const express = require("express");
require("express-async-errors");

const { ordersController, authController } = require("../controllers");
// const { OK } = require("../helpers/status_code");

const ordersRouter = express.Router();

ordersRouter.get("/", async (request, response) => {
  const ordersList = await ordersController.getAllOrders();

  response.status(200).json(ordersList);
});

ordersRouter.post("/new", async (request, response) => {
  const data = request.body;

  const newOrder = await ordersController.addNewOrder(data);

  response.status(201).json(newOrder);
});

module.exports = ordersRouter;
