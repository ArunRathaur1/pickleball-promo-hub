const mongoose = require("mongoose");

const courtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
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
  bookinglink: {
    type: String, 
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
  clubimageUrl: {
    type: String,
    required: true,
  },
  logoimageUrl: {
    type: String,
    required: true,
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
