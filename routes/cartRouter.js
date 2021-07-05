const express = require("express");
const cartRouter = express.Router();
let Cart = require("../models/Cart");

cartRouter.route("/")
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

cartRouter.route("/:username")
  .get((req, res) => {
    Cart.find({ "username": req.params.username })
      .then((items) => {
        console.log(items);
        res.json(items)
      })
      .catch((err) => res.status(400).json("Error: " + err));
  })


cartRouter.route("/:username/:itemId")
  .get((req, res) => {
    console.log(req.params.username);
    console.log(req.params.itemId);
    Cart.findOne(
      { username: req.params.username, itemId: req.params.itemId }
    )
      .then((items) => {
        console.log(items);
        res.json(items)
      })
      .catch((err) => res.status(400).json("Error: " + err))
  })

  .put((req, res) => {
    const data = req.body;
    console.log(data);
    Cart.findOneAndUpdate(
      {
        itemId: req.params.itemId,
        username: req.params.username,
      },
      { quantity: req.body.quantity },
      { upsert: true, new: true }
    )
      .then((cart) => {
        res.statusCode = 200;
        res.json(cart);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  })

  .delete((req, res) => {
    console.log(req.params.itemId);
    console.log(req.params.username);
    Cart.findOneAndDelete(
      {
        itemId: req.params.itemId,
        username: req.params.username,
      }
    )
      .then((cart) => {
        console.log(cart);
        res.statusCode = 200;
        res.json(cart);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  });

module.exports = cartRouter;
