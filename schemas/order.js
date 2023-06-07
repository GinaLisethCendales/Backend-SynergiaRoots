const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    productID: { type: String },
    userID: { type: String },
    units: { type: Number },
    price: { type: Number },
});

// Compile model from schema
const Order = mongoose.model("Order", OrderSchema);

module.exports = Order