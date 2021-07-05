const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    itemId: Number,
    quantity: Number,
    product: String,
    price: String,
    image: String
})

const shippingSchema = new Schema({
    fname: String,
    lname: String,
    email: String,
    address: String,
    city: String,
    zip: Number,
    state: String
})

const paymentSchema = new Schema({
    cardNum: String,
    expDate: Date,
    cvc: String
})

const PastOrdersSchema = new Schema({
    user: String,
    date: {
        type: Date, 
        default: Date.now
    },
    orderTotal: Number,
    order: [orderSchema],
    shipping: shippingSchema,
    payment: paymentSchema
});

// Model
const PastOrders = mongoose.model('Pastorders', PastOrdersSchema);

module.exports = PastOrders;