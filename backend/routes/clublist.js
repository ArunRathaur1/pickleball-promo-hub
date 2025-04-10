const express = require("express");
const router = express.Router();
const Clublist = require("../models/clublist");

// ✅ Create a new club (status will be 'pending' by default)
router.post("/add", async (req, res) => {
  try {
    const {
      name,
      email,
      contact,
      location,
      country,
      locationCoordinates,
      clubimageUrl,
      logoimageUrl,
      description,
      bookinglink, // <-- added
    } = req.body;

    if (
      !name ||
      !email ||
      !contact ||
      !location ||
      !country ||
      !locationCoordinates ||
      !clubimageUrl ||
      !logoimageUrl ||
      !description ||
      !bookinglink // <-- added check
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (
      !Array.isArray(locationCoordinates) ||
      locationCoordinates.length !== 2
    ) {
      return res.status(400).json({
        message:
          "Invalid locationCoordinates format. Must be an array of [latitude, longitude].",
      });
    }

    const newClub = new Clublist({
      name,
      email,
      contact,
      location,
      country,
      locationCoordinates,
      clubimageUrl,
      logoimageUrl,
      description,
      bookinglink, // <-- added
      status: "pending",
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
    const clubs = await Clublist.find().sort({ createdAt: -1 });
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
router.patch("/update/:id", async (req, res) => {
  try {
    const { locationCoordinates } = req.body;

    if (
      locationCoordinates &&
      (!Array.isArray(locationCoordinates) || locationCoordinates.length !== 2)
    ) {
      return res.status(400).json({
        message:
          "Invalid locationCoordinates format. Must be an array of [latitude, longitude].",
      });
    }

    const updatedClub = await Clublist.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
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

// ✅ Filter clubs by status (pending/approved/rejected)
router.get("/status/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const validStatuses = ["pending", "approved", "rejected"];
    if (!validStatuses.includes(type)) {
      return res.status(400).json({ message: "Invalid status type" });
    }

    const clubs = await Clublist.find({ status: type });
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Update club status (e.g., approve/reject)
router.patch("/status/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["pending", "approved", "rejected"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updated = await Clublist.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Club not found" });
    }

    res
      .status(200)
      .json({ message: `Club status updated to ${status}`, club: updated });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
