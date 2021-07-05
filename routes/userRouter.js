const express = require("express");
const userRouter = express.Router();
const User = require("../models/User");

userRouter
  .route("/")
  .get((req, res) => {
    User.find()
      .then((items) => res.json(items))
      .catch((err) => res.status(400).json("Error: " + err));
  })
  .post((req, res) => {
    const data = req.body;
    console.log(data);
    const newUser = new User(data);
    newUser
      .save()
      .then(() => res.json(`user ${data} created!`))
      .catch((err) => res.status(400).json("Error: " + err));
  });


module.exports = userRouter;