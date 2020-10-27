const passport = require("passport");

const authenticate = (req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate("local", { session: false }, (err, user) => {
      if (err) reject(new Error(err));
      else if (!user) reject(new Error("No user found with these credentials"));
      resolve(user);
    })(req, res);
  });

const authController = {
  login: async req => {
    const user = await authenticate(req);
    const userInfo = {
      id: user.id,
      firstName: user.first_name,
      email: user.email
    };

    return userInfo;
  },
  logout: (request, response) => {
    request.logout();
    response.status(200).json({ message: "you are now logged out !" });
  }
};

module.exports = authController;
