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

const usersController = require("./users_controller");

const db = require("../models");

const User = db.User;
const userRouter = require("../routes/users_router");

const { NOT_FOUND } = require("../helpers/status_code");

describe("Controllers :: usersController", () => {
  beforeEach(() => {
    this.post = sinon.stub(request, "post")
  });
  afterEach(() => {
    request.post.restore();
  });
  after(done => {
    sinon.restore();
    done();
  });
  describe("#getAllUsers", () => {
    it("should return the right object (= users) which represents all the clients", async () => {
      const id = uuid();
      const users = [
        {
          id: uuid(),
          firstName: "John",
          lastName: "Doe",
          email: "johndoe@gmail.com"
        },
        {
          id: uuid(),
          firstName: "Jane",
          lastName: "Doe",
          email: "janedoe@gmail.com"
        }
      ];

      const createReturnObject = { ...users };
      const expectedObject = { ...users };

      const createStub = sinon
        .stub(User, "findAll")
        .returns(createReturnObject);

      const createdObject = await usersController.getAllUsers();
      expect(createStub).to.be.calledOnce;
      expect(createdObject).to.deep.equal(expectedObject);

    });
  });
  describe("#validateSignup", () => {
    it.skip("should block the request and send an error msg if the data don't meet the criteria for validation", () => {
      const options = {
        body: {
          lastName: "Doe",
          firstName: "Jane",
          email: "Jane@doe.com",
          password: "topsecret",
          passwordConfirm: "secrettop"
        },
        json: true,
        url: `/api/users/register`
      };
      const ValidateSignupSpy = sinon.spy(usersController, "validateSignup");
      this.post.yields();
      request.post(options, response => {
        expect(ValidateSignupSpy).to.be.calledOnce;
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("msg");
      })

    });
  });
  describe("#signupOneUser", () => {
    it("should return the right object (=user) which represents the user created with the sign up", async () => {
      const id = uuid();
      const user =
      {
        id,
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@gmail.com"
      }
      const createReturnObject = user;
      const expectedObject = user;

      const createStub = sinon
        .stub(User, "create")
        .returns(user);

      const createdObject = await usersController.signupOneUser(user);
      expect(createStub).to.be.calledOnce;
      expect(createdObject).to.deep.equal(expectedObject);
    });
    it.skip("should send a message if the user is already registered", async () => {
      // eslint-disable-next-line no-undef
      const createdUser = await usersController.signupOneUser(user);
    })
  });
});
describe("Controllers :: user controller", () => {
  describe("validation before a user can be created", () => {
    it.skip("should check if a user account already exist for an email and send a msg if an account already exist", async () => {
      const newUser = {
        lastName: "Doe",
        firstName: "Jane",
        email: "Jane@doe.com",
        password: "topsecret",
        passwordConfirm: "secrettop"
      };
      const postStub = sinon
        .stub(userRouter, "post");
      postStub.yields();

      const createReturnObject = { user: "Jane@doe.com" }
      const findOneStub = sinon
        .stub(User, "findOne")
        .returns(createReturnObject);

      const response = await usersController.checkAccount(newUser);
      expect(postStub).to.be.calledOnce;
      expect(findOneStub).to.be.calledOnce;
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property("msg");
      expect(response.body.msg).to.equal("A user account is already exist with this email");
    })
  })
  describe("password encryption", () => {
    it.skip("should encrypt the password before the creation of a user", () => {

    })
  })
})
