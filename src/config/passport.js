const passport = require("passport");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const LocalStrategy = require("passport-local").Strategy;

const { User } = require("../models");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (username, password, done) => {
      let user;
      try {
        user = await User.findOne({
          where: {
            email: {
              [Op.eq]: username
            }
          },
          attributes: ["id", "last_name", "first_name", "email", "password"],
          raw: true
        });
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
      } catch (e) {
        return done(e);
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = User.findByPk(id, {
    attributes: ["id", "lastName", "firstName", "email"],
    raw: true
  });
  if (!user) {
    return done(new Error("User not found"));
  }
  done(null, user);
});
