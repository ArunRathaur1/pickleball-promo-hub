const express = require("express");
const router = express.Router();
const Court = require("../models/Court");

// ✅ Create a new court
router.post("/add", async (req, res) => {
  try {
    const { name, location, numberOfCourts, contact, description } = req.body;

    if (!name || !location || !numberOfCourts || !contact || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newCourt = new Court({ name, location, numberOfCourts, contact, description });
    await newCourt.save();
    res.status(201).json({ message: "Court added successfully", court: newCourt });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Get all courts
router.get("/all", async (req, res) => {
  try {
    const courts = await Court.find().sort({ createdAt: -1 }); // Sort by latest
    res.status(200).json(courts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Get a single court by ID
router.get("/:id", async (req, res) => {
  try {
    const court = await Court.findById(req.params.id);
    if (!court) {
      return res.status(404).json({ message: "Court not found" });
    }
    res.status(200).json(court);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Update a court by ID
router.put("/update/:id", async (req, res) => {
  try {
    const updatedCourt = await Court.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCourt) {
      return res.status(404).json({ message: "Court not found" });
    }
    res.status(200).json({ message: "Court updated successfully", court: updatedCourt });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Delete a court by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedCourt = await Court.findByIdAndDelete(req.params.id);
    if (!deletedCourt) {
      return res.status(404).json({ message: "Court not found" });
    }
    res.status(200).json({ message: "Court deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Filter courts by minimum number of courts
router.get("/filter", async (req, res) => {
  try {
    const { minCourts } = req.query;
    const query = minCourts ? { numberOfCourts: { $gte: parseInt(minCourts) } } : {};
    const courts = await Court.find(query);
    res.status(200).json(courts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
