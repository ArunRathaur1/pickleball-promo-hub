const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Author's Name
  heading: { type: String, required: true }, // Blog Title
  description: { type: String, required: true }, // Blog Content
  createdAt: { type: Date, default: Date.now } // Timestamp
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
