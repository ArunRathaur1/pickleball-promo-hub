const mongoose = require("mongoose");

const athleteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  playerid: {
    type: String,
  },
  age: {
    type: Number,
    required: true,
    min: 10, // Minimum age validation
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
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
  DUPRID: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    // match: [/^[A-Z0-9]{6,12}$/, "DUPRID must be a combination of letters and numbers (6-12 characters)."],
  },
  sponsors: [
    {
      name: { type: String, required: true },
      imageUrl: { type: String, required: true },
    },
  ],
  instagramPage: {
    type: String,
    // match: [/^https:\/\/www\.instagram\.com\/[A-Za-z0-9_.]+\/?$/, "Invalid Instagram URL format"],
  },
  titlesWon: [
    {
      title: { type: String, required: true },
      year: { type: Number, required: true },
    },
  ],
  relatedContent: [
    {
      imageUrl: { type: String, required: true },
      title: { type: String, required: true },
      youtubeLink: {
        type: String,
        required: true,
        // match: [/^https:\/\/www\.youtube\.com\/watch\?v=[A-Za-z0-9_-]+$/, "Invalid YouTube URL format"],
      },
    },
  ],
  imageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Athlete = mongoose.model("Athlete", athleteSchema);
module.exports = Athlete;
