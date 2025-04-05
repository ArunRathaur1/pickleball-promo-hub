const express = require("express");
const Blog = require("../models/Blog");

const router = express.Router();

// **1. Create a Blog**
router.post("/add", async (req, res) => {
  try {
    const { name, heading, description, imageUrl } = req.body;

    const newBlog = new Blog({ name, heading, description, imageUrl });
    await newBlog.save();

    res.status(201).json({ message: "Blog created successfully", newBlog });
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error });
  }
});

// **2. Get All Blogs**
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }); // Latest blogs first
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
});

// **3. Get a Single Blog by ID**
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error });
  }
});

// **4. Update a Blog**
router.put("/update/:id", async (req, res) => {
  try {
    const { name, heading, description, imageUrl } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { name, heading, description, imageUrl },
      { new: true }
    );

    if (!updatedBlog)
      return res.status(404).json({ message: "Blog not found" });

    res.json({ message: "Blog updated successfully", updatedBlog });
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error });
  }
});

// **5. Delete a Blog**
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog)
      return res.status(404).json({ message: "Blog not found" });

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error });
  }
});

module.exports = router;
