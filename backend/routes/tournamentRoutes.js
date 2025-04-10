const express = require('express');
const Tournament = require('../models/Tournament');

const router = express.Router();

// Add a new tournament with location (lat, lng)
router.post('/add', async (req, res) => {
    try {
        const { name, Organizer, location, country, Continent, Tier, startDate, endDate,imageUrl, description, locationCoords } = req.body;

        if (!Array.isArray(locationCoords) || locationCoords.length !== 2) {
            return res.status(400).json({ message: "Invalid location coordinates. Provide [latitude, longitude]." });
        }

        const newTournament = new Tournament({
            name,
            Organizer,
            location,
            country,
            Continent,
            Tier,
            startDate,
            endDate,
            imageUrl,
            description,
            locationCoords
        });

        await newTournament.save();
        res.status(201).json({ message: 'Tournament added successfully', tournament: newTournament });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all tournaments
router.get('/all', async (req, res) => {
    try {
        const tournaments = await Tournament.find();
        res.status(200).json(tournaments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all pending tournaments
router.get('/pending', async (req, res) => {
    try {
        const pendingTournaments = await Tournament.find({ status: "pending" });
        res.status(200).json(pendingTournaments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all approved tournaments
router.get('/approved', async (req, res) => {
    try {
        const approvedTournaments = await Tournament.find({ status: "approved" });
        res.status(200).json(approvedTournaments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update tournament status (approve or reject)
router.put('/update-status/:id', async (req, res) => {
    try {
        const { status } = req.body;
        if (!["pending", "approved", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const updatedTournament = await Tournament.findByIdAndUpdate(req.params.id, { status }, { new: true });

        if (!updatedTournament) {
            return res.status(404).json({ message: "Tournament not found" });
        }

        res.status(200).json({ message: "Tournament status updated successfully", tournament: updatedTournament });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a tournament
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedTournament = await Tournament.findByIdAndDelete(req.params.id);

        if (!deletedTournament) {
            return res.status(404).json({ message: "Tournament not found" });
        }

        res.status(200).json({ message: "Tournament deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get("/:id", async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    res.status(200).json(tournament);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;