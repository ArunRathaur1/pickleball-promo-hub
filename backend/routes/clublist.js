const express = require("express");
const router = express.Router();
const Clublist = require("../models/clublist");

// ✅ Create a new club
router.post("/add", async (req, res) => {
  try {
    // console.log("Received data:", req.body); // Log incoming data

    const {
      name,
      location,
      country,
      locationCoordinates,
      followers,
      description,
    } = req.body;

    if (
      !name ||
      !location ||
      !country ||
      !locationCoordinates ||
      !followers ||
      !description
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required.", receivedData: req.body });
    }

    if (
      !Array.isArray(locationCoordinates) ||
      locationCoordinates.length !== 2
    ) {
      return res
        .status(400)
        .json({
          message:
            "Invalid locationCoordinates format. Must be an array of [latitude, longitude].",
        });
    }

    const newClub = new Clublist({
      name,
      location,
      country,
      locationCoordinates,
      followers,
      description,
    });
    await newClub.save();

    res.status(201).json({ message: "Club added successfully", club: newClub });
  } catch (error) {
    console.error("Error in /add route:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Get all clubs
router.get("/all", async (req, res) => {
  try {
    const clubs = await Clublist.find().sort({ createdAt: -1 }); // Sort by latest
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Get a single club by ID
router.get("/:id", async (req, res) => {
  try {
    const club = await Clublist.findById(req.params.id);
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }
    res.status(200).json(club);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Update a club by ID
router.put("/update/:id", async (req, res) => {
  try {
    const { locationCoordinates } = req.body;

    if (
      locationCoordinates &&
      (!Array.isArray(locationCoordinates) || locationCoordinates.length !== 2)
    ) {
      return res
        .status(400)
        .json({
          message:
            "Invalid locationCoordinates format. Must be an array of [latitude, longitude].",
        });
    }

    const updatedClub = await Clublist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedClub) {
      return res.status(404).json({ message: "Club not found" });
    }
    res
      .status(200)
      .json({ message: "Club updated successfully", club: updatedClub });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Delete a club by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedClub = await Clublist.findByIdAndDelete(req.params.id);
    if (!deletedClub) {
      return res.status(404).json({ message: "Club not found" });
    }
    res.status(200).json({ message: "Club deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Filter clubs by minimum number of followers and/or country
router.get("/filter", async (req, res) => {
  try {
    const { minFollowers, country } = req.query;
    let query = {};

    if (minFollowers) {
      query.followers = { $gte: parseInt(minFollowers) };
    }
    if (country) {
      query.country = country;
    }

    const clubs = await Clublist.find(query);
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
