const mongoose = require("mongoose");

const athleteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: 10, // Minimum age validation
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"], // Restricting values
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  height: {
    type: Number, // Height in cm
    required: true,
  },
  points: {
    type: Number,
    required: true,
    default: 0, // Default points if not provided
  },
  titlesWon: {
    type: [String], // Array of tournament names
    default: [], // Default to an empty array
  },
  imageUrl: {
    type: String, // URL to athlete's profile image
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets creation date
  },
});

const Athlete = mongoose.model("Athlete", athleteSchema);
module.exports = Athlete;
