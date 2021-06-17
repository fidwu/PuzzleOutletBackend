const express = require('express');
const cartRouter = express.Router();
let inventory = require("../inventory");

cartRouter.route('/')
.get((req, res) => {
    // res.end('getting cart items');
    console.log(inventory);
    try {
      res.status(200).json({
        data: inventory
      });
    } catch (err) {
      res.status(400).json({
        message: "Some error occured",
        err
      });
    }
}) 

module.exports = cartRouter;