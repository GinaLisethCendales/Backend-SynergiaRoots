const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String },
    description: { type: String },
    unitprice: { type: Number },
    image: { type: String },
    category: { type: String }
});

// Compile model from schema
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product
