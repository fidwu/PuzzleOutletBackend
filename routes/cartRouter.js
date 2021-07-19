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
    const newItem = new Cart(data);
    newItem
      .save()
      .then(() => res.json(`item ${data} added to cart!`))
      .catch((err) => res.status(400).json("Error: " + err));
  });

cartRouter.route("/:user")
  .get((req, res) => {
    Cart.find({ "user": req.params.user })
      .then((items) => {
        console.log(items);
        res.json(items)
      })
      .catch((err) => res.status(400).json("Error: " + err));
  })

  .delete((req, res) => {
    Cart.deleteMany(
    {
      user: req.params.user
    })
      .then((cart) => {
        console.log(cart);
        res.statusCode = 200;
        res.json(cart);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  })


cartRouter.route("/:user/:itemId")
  .get((req, res) => {
    Cart.findOne(
      { user: req.params.user, itemId: req.params.itemId }
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
        user: req.params.user,
      },
      req.body,
      { upsert: true, new: true }
    )
      .then((cart) => {
        res.statusCode = 200;
        res.json(cart);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  })

  .delete((req, res) => {
    Cart.findOneAndDelete(
      {
        itemId: req.params.itemId,
        user: req.params.user,
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
