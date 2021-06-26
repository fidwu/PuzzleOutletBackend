const express = require("express");
const ordersRouter = express.Router();
const Orders = require("../models/PastOrders");

ordersRouter
  .route("/:user")
  .get((req, res) => {
    console.log(req.params.user);
    Orders.find({user: req.params.user})
      .then((items) => res.json(items))
      .catch((err) => res.status(400).json("Error: " + err));
  })

ordersRouter
  .route("/")
  .get((req, res) => {
    Orders.find()
      .then((items) => res.json(items))
      .catch((err) => res.status(400).json("Error: " + err));
  })
  .post((req, res) => {
    const data = req.body;
    console.log(data);
    const newOrders = new Orders(data);
    newOrders
      .save()
      .then(() => res.json(`item ${data} added to cart!`))
      .catch((err) => res.status(400).json("Error: " + err));
  });


module.exports = ordersRouter;
