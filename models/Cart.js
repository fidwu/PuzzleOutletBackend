const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;
const CartSchema = new Schema({
    user: String,
    itemId: Number,
    quantity: Number
});

// Model
const Cart = mongoose.model('cart', CartSchema);

module.exports = Cart;