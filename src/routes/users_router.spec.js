/* eslint-disable no-unused-expressions */
/* eslint-disable node/no-unpublished-require */
const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const request = require("supertest");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
// const uuid = require("uuid/v4");

chai.use(chaiHttp);
chai.use(sinonChai);

const { OK, CREATED } = require("../helpers/status_code");

const server = require("../server");
// const { Wine } = require("../models");
const usersController = require("../controllers/users_controller");

describe("Routers :: usersRouter", () => {
  afterEach(done => {
    sinon.restore();
    done();
  });
  describe("GET /users", () => {
    it("should return the right object (= users) which represents all the users in the database", async () => {
      const getAllUsersStub = sinon
        .stub(usersController, "getAllUsers")
        .returns({ users: [] });

      const response = await request(server).get("/api/users");

      expect(getAllUsersStub).to.be.calledOnce;
      expect(response.statusCode).to.equal(OK);
      expect(response.body).to.have.property("users");
      expect(response.body.users).to.be.an("array");
      expect(response.body.users.length).to.equal(0);
    });
  });
  describe("POST /users/register", () => {
    it.skip("should return the right object (= user) which represent the user created", async () => {
      const validateSignupStub = sinon
        .stub(usersController, "validateSignup")
        .returns();

      const signupOneUserStub = sinon
        .stub(usersController, "signupOneUser")
        .returns({ createdUser: {} });

      const response = await request(server).post("/api/users/register");

      // expect(validateSignupStub).to.be.calledOnce;
      expect(signupOneUserStub).to.be.calledOnce;
      expect(response.statusCode).to.equal(CREATED);
      expect(response.body).to.have.property("createdUser");
    });
  });
});
