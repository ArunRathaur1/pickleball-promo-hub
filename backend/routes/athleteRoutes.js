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
    let { gender, country, sort, name, sponsor } = req.query;
    let filter = {};

    if (gender) filter.gender = gender;
    if (country) filter.country = country;
    if (name) filter.name = { $regex: name, $options: "i" }; // Case-insensitive search
    if (sponsor) filter["sponsors.name"] = { $regex: sponsor, $options: "i" };

    let athletesQuery = Athlete.find(filter);

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
// router.get("/:id", async (req, res) => {
//   try {
//     const athlete = await Athlete.findById(req.params.id);
//     if (!athlete) {
//       return res.status(404).json({ message: "Athlete not found" });
//     }
//     res.json(athlete);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

router.get("/:id", async (req, res) => {
  try {
    const athlete = await Athlete.findOne({ playerid: req.params.id }); 
    if (!athlete) {
      return res.status(404).json({ message: "Athlete not found" });
    }
    res.json(athlete);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedAthlete = await Athlete.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
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

// 📌 6️⃣ Get athletes by DUPRID
router.get("/duprid/:duprid", async (req, res) => {
  try {
    const athlete = await Athlete.findOne({ DUPRID: req.params.duprid });
    if (!athlete) {
      return res.status(404).json({ message: "Athlete not found" });
    }
    res.json(athlete);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 7️⃣ Get athletes with a specific title
router.get("/title/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const athletes = await Athlete.find({ "titlesWon.title": { $regex: title, $options: "i" } });

    if (athletes.length === 0) {
      return res.status(404).json({ message: "No athletes found with this title" });
    }

    res.json(athletes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
