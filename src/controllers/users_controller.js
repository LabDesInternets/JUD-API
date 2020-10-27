/* eslint-disable no-unused-vars */
const { Op } = require("sequelize");
// const { NotFoundError } = require("../helpers/errors");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { NotFoundError } = require("../helpers/errors");
const { User } = require("../models");

const usersController = {
  getUsers: async () => {
    const users = await User.findAll({
      order: [["last_name"]],
      attributes: [
        "id_client",
        "id_gender",
        "last_name",
        "first_name",
        "email"
      ],
      raw: true
    });
    return users;
  },

  validateSignup: (request, response, next) => {
    console.log("validation ", request.body)
    check("lastName", "Vous devez renseigner un nom de famille !").notEmpty();
    check("firstName", "Vous devez renseigner un prénom !").notEmpty();
    check("email", "Cet adresse mail n'est pas valide !")
      .isEmail()
      .normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false
      });
    check("password", "Vous devez renseigner un mot de passe !").notEmpty();
    // check("passwordConfirm", "Oops ! Les mots de passe saisis ne sont pas identiques")
    //   .equals(request.body.password);
    check("passwordConfirm").custom(value => {
      if (value !== request.body.password) {
        throw new Error(
          "Oops ! Les mots de passe saisis ne sont pas identiques"
        );
      }
      // return true;
    });

    const result = validationResult(request);
    console.log("result val ", result)
    if (!result.isEmpty()) {
      console.log(result.array())
      response.status(400).json({ errors: result.array() });
      return;
    }
    next();
  },
  checkAccount: async (request, response, next) => {
    const { email } = request.body;
    const user = await User.findOne({
      where: {
        email: {
          [Op.eq]: email
        }
      },
      attributes: ["id_client", "last_name", "first_name", "email"],
      raw: true
    });
    if (user !== null) {
      response
        .status(400)
        .json({ msg: "A user account is already exist with this email" });
      return;
    }
    next();
  },
  signupOneUser: async newUser => {
    const createdUser = await User.create(newUser);
    return createdUser;
  }
};

module.exports = usersController;
