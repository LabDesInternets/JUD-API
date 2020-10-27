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

const authController = require("./auth_controller");

const db = require("../models");

const User = db.User;
const userRouter = require("../routes/users_router");


describe("Controllers :: auth controller", () => {
  describe("authentication flow", () => {
    it.skip("should login a user with credentials and redirect him to his dashboard", async () => {

    })
    it.skip("should warn the user if the credentials are not correct", () => {

    })
    it.skip("should logout a user and redirect him to the login page", () => {

    })
  })
})