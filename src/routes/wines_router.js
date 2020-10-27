const express = require("express");
require("express-async-errors");


const winesController = require("../controllers/wines_controller");
const { OK } = require("../helpers/status_code");

const winesRouter = express.Router();

winesRouter.get("/", async (request, response) => {
  const wines = await winesController.getAllWines();

  response.status(OK).json(wines);
});

winesRouter.get("/:id", async (request, response) => {
  const { id } = request.params;
  const wine = await winesController.getOneWine(id);

  response.status(OK).json(wine);
});

module.exports = winesRouter;
