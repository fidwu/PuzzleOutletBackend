const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;
const CartSchema = new Schema({
    username: String,
    itemId: String,
    quantity: Number,
    product: String,
    price: String,
    image: String
    // item: {
    //     type: Schema.Types.ObjectId, 
    //     ref: 'Item'
    // }
});

// Model
const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;