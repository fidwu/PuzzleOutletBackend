const express = require("express");
const itemRouter = express.Router();
let Item = require("../models/Items");

itemRouter
  .route("/")
  .get((req, res) => {
    Item.find()
      .then((items) => res.json(items))
      .catch((err) => res.status(400).json("Error: " + err));
  })

  .post((req, res) => {
    const data = req.body;
    console.log(data);
    const newItem = new Item(data);
    newItem
      .save()
      .then(() => res.json(`item ${data} added!`))
      .catch((err) => res.status(400).json("Error: " + err));
  });

itemRouter
  .route("/:itemId")
  .get((req, res) => {
    Item.findById(req.params.itemId)
      .then((items) => res.json(items))
      .catch((err) => res.status(400).json("Error: " + err));
  })

module.exports = itemRouter;
