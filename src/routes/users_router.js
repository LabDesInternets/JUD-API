const express = require("express");
require("express-async-errors");

const { usersController, authController } = require("../controllers");
const { authenticate } = require("../middlewares");
const {
  getUsers,
  validateSignup,
  checkAccount
} = require("../controllers/users_controller");

// const { OK } = require("../helpers/status_code");

const usersRouter = express.Router();

usersRouter.get("/", async (request, response) => {
  const usersList = await getUsers();
  response.status(201);
  response.json(usersList);
});

usersRouter.get("/login", authController.login);
usersRouter.post("/login", async (request, response) => {
  const userInfo = await authController.login(request);
  const token = authenticate.generateAuthToken(userInfo);

  response
    .status(200)
    .header("xAuth", token)
    .json({ userInfo, message: "you are now logged in ! " });
});


usersRouter.post(
  "/register",
  validateSignup,
  checkAccount,
  async (request, response) => {
    const data = request.body;
    const createdUser = await usersController.signupOneUser(data);
    const userInfo = await authController.login(request);
    const token = authenticate.generateAuthToken(userInfo);

    response
      .status(201)
      .header("x-auth", token)
      .json({ createdUser, userInfo, message: "you are now logged in ! " });
  }
);

usersRouter.get("/logout", authController.logout);

usersRouter.get(
  "/test",
  authenticate.isAuth,
  authenticate.attachCurrentUser,
  (request, response) => {
    response.send(request.currentUser);
  }
);

module.exports = usersRouter;
