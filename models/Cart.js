const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;
const CartSchema = new Schema({
    productId: Number,
    quantity: Number,
    user: String
});

// Model
const Cart = mongoose.model('cart', CartSchema);

module.exports = Cart;