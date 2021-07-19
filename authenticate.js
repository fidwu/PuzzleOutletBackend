const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");
const jwt = require("jsonwebtoken");

exports.local = passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      console.log("local func", password);
      console.log("email local", email);
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }
        // verify if the password is valid
        console.log(user);
        console.log("pswd", password);
        user.isPasswordValid(password, user.password, (err, isMatch) => {
            console.log("match?", isMatch);
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Incorrect password." });
            }
          });
      });
    }
  )
);
passport.serializeUser((user, done) => {
  console.log("serialize user: ", user);
  return done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  console.log("deserialize user id: ", id);
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
});

exports.getToken = function (user) {
  return jwt.sign({user}, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRATION_NUM,
  });
};

exports.verifyUser = passport.authenticate('local', {session: false});
