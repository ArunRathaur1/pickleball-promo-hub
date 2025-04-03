const express = require("express");
const Newsletter = require("../models/Newsletter");

const router = express.Router();

// Add email to newsletter
router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existingEmail = await Newsletter.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email is already subscribed" });
    }

    const newSubscription = new Newsletter({ email });
    await newSubscription.save();
    res.status(201).json({ message: "Successfully subscribed to newsletter", email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all subscribed emails
router.get("/subscribers", async (req, res) => {
  try {
    const subscribers = await Newsletter.find().select("email -_id");
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Unsubscribe (Delete email)
router.delete("/unsubscribe/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const removedEmail = await Newsletter.findOneAndDelete({ email });

    if (!removedEmail) {
      return res.status(404).json({ message: "Email not found" });
    }

    res.status(200).json({ message: "Successfully unsubscribed", email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
