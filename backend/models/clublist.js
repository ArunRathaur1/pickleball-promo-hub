const mongoose = require("mongoose");

const courtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String, // User-entered location name
    required: true,
    trim: true,
  },
  country: {
    type: String, // Country name
    required: true,
    trim: true,
  },
  locationCoordinates: {
    type: [Number], // [latitude, longitude]
    required: true,
    validate: {
      validator: function (v) {
        return v.length === 2;
      },
      message:
        "LocationCoordinates must be an array with exactly 2 elements [latitude, longitude]",
    },
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Clublist = mongoose.model("Clublist", courtSchema);
module.exports = Clublist;
