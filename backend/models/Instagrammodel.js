const mongoose = require("mongoose");

const InstagramSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^https?:\/\/(www\.)?instagram\.com\/(p|reel|tv|stories|highlights)\/[A-Za-z0-9_-]+\/?.*$/,
      "Invalid Instagram URL format",
    ],
  },
});

module.exports = mongoose.model("Instagram", InstagramSchema);
