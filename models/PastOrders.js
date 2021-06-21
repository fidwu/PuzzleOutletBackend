const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;
const PastOrdersSchema = new Schema({
    itemId: Number,
    dateBought: Date,
    user: String
});

// Model
const PastOrders = mongoose.model('pastorders', PastOrdersSchema);

module.exports = PastOrders;