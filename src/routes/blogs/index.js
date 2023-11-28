const express = require("express");
const blog = require("../../models/blogPost");

var router = express.Router();

router.post("/addBlog", async (req, res) => {
  const blogData = req.body;

  const result = await blog.create(blogData);

  res.send(result);
});

// get data for admin
router.get("/blog", async (req, res) => {
  const result = await blog.find();
  res.send(result);
});
// get data for public
router.get("/blogPublished", async (req, res) => {
  const result = await blog.find({ blogStatus: "published" });
  res.send(result);
});

module.exports = router;
