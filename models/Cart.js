const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;
const CartSchema = new Schema({
    user: String,
    itemId: String,
    quantity: Number,
    product: String,
    price: String,
    image: String
});

// Model
const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;