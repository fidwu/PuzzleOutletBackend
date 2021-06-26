const express = require("express");
const cartRouter = express.Router();
let Cart = require("../models/Cart");

cartRouter
  .route("/")
  .get((req, res) => {
    Cart.find()
      .then((items) => res.json(items))
      .catch((err) => res.status(400).json("Error: " + err));
  })

  .post((req, res) => {
    const data = req.body;
    console.log(data);
    const newItem = new Cart(data);
    newItem
      .save()
      .then(() => res.json(`item ${data} added to cart!`))
      .catch((err) => res.status(400).json("Error: " + err));
  });

cartRouter
  .route("/:id")
  .put((req, res) => {
    const data = req.body;
    console.log(data);
    Cart.findOneAndUpdate(
      {
        itemId: parseInt(req.params.id),
        user: "tempUser",
      },
      data,
      { new: true }
    )
      .then((cart) => {
        res.statusCode = 200;
        res.json(cart);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  })
  .delete((req, res) => {
    Cart.findOneAndRemove(
      {
        itemId: parseInt(req.params.id),
        user: "tempUser",
      },
      { new: true }
    )
      .then((cart) => {
        res.statusCode = 200;
        res.json(cart);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  });

module.exports = cartRouter;
