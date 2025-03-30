const mongoose = require("mongoose");

// Define the User Schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Create the User model
const User = mongoose.model("User", UserSchema);

module.exports = User;
