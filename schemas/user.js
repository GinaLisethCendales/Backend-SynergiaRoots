const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String },
    age: { type: Number },
    birthdate: { type: Date },
    country: { type: String },
    gender: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date},
    isActive: { type: Boolean }

});

// Compile model from schema
const User = mongoose.model("User", UserSchema);

module.exports = User