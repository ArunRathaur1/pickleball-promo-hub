const mongoose = require("mongoose");

const courtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: [Number], // [latitude, longitude]
    required: true,
    validate: {
      validator: function (v) {
        return v.length === 2;
      },
      message:
        "Location must be an array with exactly 2 elements [latitude, longitude]",
    },
  },
  numberOfCourts: {
    type: Number,
    required: true,
    min: 1, // At least 1 court
  },
  contact: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set creation date
  },
});

const Court = mongoose.model("Court", courtSchema);
module.exports = Court;
