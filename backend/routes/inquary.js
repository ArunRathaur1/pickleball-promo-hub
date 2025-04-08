const express=require('express')
const Sponsor=require('../models/Inquary')
const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { name, company, email, message } = req.body;
    const newSponsor = new Sponsor({ name, company, email, message });
    await newSponsor.save();
    res
      .status(201)
      .json({ success: true, message: "Inquiry submitted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const sponsors = await Sponsor.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: sponsors });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const sponsor = await Sponsor.findById(req.params.id);
    if (!sponsor)
      return res
        .status(404)
        .json({ success: false, message: "Inquiry not found" });
    res.status(200).json({ success: true, data: sponsor });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { name, company, email, message } = req.body;
    const updatedSponsor = await Sponsor.findByIdAndUpdate(
      req.params.id,
      { name, company, email, message },
      { new: true, runValidators: true }
    );
    if (!updatedSponsor)
      return res
        .status(404)
        .json({ success: false, message: "Inquiry not found" });
    res
      .status(200)
      .json({
        success: true,
        message: "Inquiry updated successfully",
        data: updatedSponsor,
      });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedSponsor = await Sponsor.findByIdAndDelete(req.params.id);
    if (!deletedSponsor)
      return res
        .status(404)
        .json({ success: false, message: "Inquiry not found" });
    res
      .status(200)
      .json({ success: true, message: "Inquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports=router;
