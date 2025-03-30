const express = require("express");
const router = express.Router();
const Athlete = require("../models/Athlete");

// 📌 1️⃣ Create a new athlete
router.post("/", async (req, res) => {
  try {
    const newAthlete = new Athlete(req.body);
    await newAthlete.save();
    res.status(201).json(newAthlete);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 📌 2️⃣ Get all athletes (with filtering and sorting)
router.get("/", async (req, res) => {
  try {
    let { gender, country, sort } = req.query;
    let filter = {};

    // Apply gender filter if provided
    if (gender) filter.gender = gender;

    // Apply country filter if provided
    if (country) filter.country = country;

    // Fetch filtered athletes
    let athletesQuery = Athlete.find(filter);

    // Sort by points (Descending)
    if (sort === "points") {
      athletesQuery = athletesQuery.sort({ points: -1 });
    }

    const athletes = await athletesQuery;
    res.json(athletes);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// 📌 3️⃣ Get a single athlete by ID
router.get("/:id", async (req, res) => {
  try {
    const athlete = await Athlete.findById(req.params.id);
    if (!athlete) {
      return res.status(404).json({ message: "Athlete not found" });
    }
    res.json(athlete);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 4️⃣ Update an athlete
router.put("/:id", async (req, res) => {
  try {
    const updatedAthlete = await Athlete.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Returns updated document
      runValidators: true, // Ensures validation rules apply
    });

    if (!updatedAthlete) {
      return res.status(404).json({ message: "Athlete not found" });
    }

    res.json(updatedAthlete);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 📌 5️⃣ Delete an athlete
router.delete("/:id", async (req, res) => {
  try {
    const deletedAthlete = await Athlete.findByIdAndDelete(req.params.id);
    if (!deletedAthlete) {
      return res.status(404).json({ message: "Athlete not found" });
    }
    res.json({ message: "Athlete deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
