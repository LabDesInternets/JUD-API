const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authenticate = {
  generateAuthToken: userInfo => {
    const authToken = jwt.sign({ userInfo }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });
    return authToken;
  },
  isAuth: (request, response, next) => {
    const token = request.header("xAuth");
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (decoded) {
        request.user = decoded.userInfo;
        request.token = token;
        next();
      } else {
        response.status(401).send("Not authorized");
      }
    });
  },
  attachCurrentUser: async (request, response, next) => {
    const { id } = request.user;
    const user = await User.findByPk(id, {
      attributes: ["id", "firstName", "lastName", "email"],
      raw: true
    });
    request.currentUser = user;
    if (!user) response.status(401).end("User not found");
    else return next();
  }
};

module.exports = authenticate;
