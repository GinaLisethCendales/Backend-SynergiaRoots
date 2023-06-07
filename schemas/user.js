const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String },
    role: { type: String },
    email: { type: String },
    password: { type: String },
});

// Compile model from schema
const User = mongoose.model("User", UserSchema);

module.exports = User