const express = require("express");
const userRouter = express.Router();
const User = require("../models/User");
const passport = require('passport');
const authenticate = require('../authenticate');

userRouter.get("/", (req, res) => {
  User.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

userRouter.post("/signup", (req, res) => {
  const { email } = req.body;
  console.log(email);
  User.findOne({
    email
  }, (error, previousUsers) => {
    console.log("error: ", error);
    console.log("previous users: ", previousUsers);
    if (error) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    // if email exists, send error message
    else if (previousUsers) {
      res.statusCode = 401
      res.setHeader('Content-Type', 'application/json');
      res.json({err: 'Email already exists'});
    }
    // add them to database
    else {
      const newUser = new User(req.body);
      newUser.save((err) => {
        console.log(err);
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return;
        }
        passport.authenticate("local")(req, res, () => {
          console.log(req.user);
          const token = authenticate.getToken({
            _id: req.user._id,
            email,
          });
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({
            success: true,
            token: token,
            email,
            user: req.user.firstname,
            status: "Registration Successful!",
          });
        });
      })
    }
  })
});

userRouter.post('/login', passport.authenticate('local'), (req, res) => {
  const { email } = req.body;
  const token = authenticate.getToken({_id: req.user._id, email});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, email, user: req.user.firstname, status: 'You are successfully logged in!'});
});

userRouter.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = userRouter;