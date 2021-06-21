const express = require('express');
const cartRouter = express.Router();
let Cart = require('../models/Cart');

cartRouter.route('/')
  .get((req, res) => {
      // res.end('getting cart items');
      // console.log(inventory);
      // try {
      //   res.status(200).json({
      //     data: inventory
      //   });
      // } catch (err) {
      //   res.status(400).json({
      //     message: "Some error occured",
      //     err
      //   });
      // }
      Cart.find()
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' +err));
  })
  .post((req, res) => {
    const data = req.body;
    console.log(data);
    const newItem = new Cart(data);
    newItem.save()
      .then(() => res.json(`item ${data} added to cart!`))
      .catch(err => res.status(400).json('Error: ' + err));
  }) 

module.exports = cartRouter;