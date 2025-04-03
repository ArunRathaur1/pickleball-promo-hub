const express = require("express");
const router = express.Router();
const Instagram = require("../models/Instagrammodel");

// ✅ Create a new Instagram URL
router.post("/", async (req, res) => {
  try {
    const newUrl = new Instagram({ url: req.body.url });
    await newUrl.save();
    res.status(201).json({ message: "Instagram URL added", data: newUrl });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 📜 Read all Instagram URLs
router.get("/", async (req, res) => {
  try {
    const urls = await Instagram.find();
    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📝 Update an Instagram URL by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedUrl = await Instagram.findByIdAndUpdate(
      req.params.id,
      { url: req.body.url },
      { new: true, runValidators: true }
    );
    if (!updatedUrl) return res.status(404).json({ message: "URL not found" });
    res.status(200).json({ message: "URL updated", data: updatedUrl });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ❌ Delete an Instagram URL by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedUrl = await Instagram.findByIdAndDelete(req.params.id);
    if (!deletedUrl) return res.status(404).json({ message: "URL not found" });
    res.status(200).json({ message: "URL deleted", data: deletedUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
