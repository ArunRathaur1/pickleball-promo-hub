const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Author name is required"],
    trim: true,
  },
  heading: {
    type: String,
    required: [true, "Blog title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Blog content is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
    required: [true, "Image URL is required"],
  },
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
