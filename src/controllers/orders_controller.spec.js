/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable node/no-unpublished-require */
const chai = require("chai");
const { expect } = require("chai");
const sinon = require("sinon");
const request = require("request");
const uuid = require("uuid/v4");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);

const ordersController = require("./orders_controller");

const db = require("../models");

const Order = db.Order;
const orderRouter = require("../routes/orders_router");

const { NOT_FOUND } = require("../helpers/status_code");

describe("Controllers :: ordersController", () => {

  describe("#getAllOrders", () => {
    it.skip("should return the right object (= orders) which represents all the orders", async () => {


    });
  })
});