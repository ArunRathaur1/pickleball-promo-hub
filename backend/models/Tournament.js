const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  Organizer: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  Continent: {
    type: String,
    required: true,
  },
  Tier:{
    type:Number,
    required:true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  locationCoords: {
    type: [Number], // [latitude, longitude]
    required: true,
    validate: {
      validator: function (v) {
        return v.length === 2;
      },
      message: "Location must be an array with exactly 2 elements [latitude, longitude]",
    },
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexing for search
tournamentSchema.index({ name: "text", description: "text", location: "text" });

const Tournament = mongoose.model("Tournament", tournamentSchema);

module.exports = Tournament;
