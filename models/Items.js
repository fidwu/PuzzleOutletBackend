const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;
const ItemSchema = new Schema({
    itemId: Number,
    product: String,
    price: String,
    rating: Number,
    numReviews: Number,
    image: String,
});

// Model
const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;