const express = require("express");
const axios = require("axios");
const router = express.Router();

const GEMINI_API_KEY = "AIzaSyBdJucnG3ujeokv7OzyPT9pRkuSEzs4PQ0";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

/**
 * 📌 AI Chatbot Route (Corrected API Request Format)
 */
router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Corrected API request format
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: message }] }],
      },
      { headers: { "Content-Type": "application/json" } }
    );

    res.json({ reply: response.data.candidates[0].content.parts[0].text });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res
      .status(500)
      .json({ error: error.response?.data || "Internal Server Error" });
  }
});

module.exports = router;
