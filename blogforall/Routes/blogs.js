const { check, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();

const Blog = require("../model/Blog");
const User = require("../model/User");
const auth = require('../middlewares/auth');

//@route GET All api/blogs
//@desc     Blog route
//@access   Public
router.get("/", async (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  try {
    const blogs = await Blog.find().populate("user", ["name", "email"]);
    if (!blogs)
      return res.status(400).json({
        msg: "No blog available",
      });
    res.json(blogs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }

  
});

//@route GET api/blogs/me
//@desc Blog route
//@access Private
router.get("/me", auth, async (req, res) => {
  try {
    const blog = await Blog.find({ user: req.user.id });
    
    if (!blog)
      return res
        .status(400)
        .json({
          msg: "No blogs available, Please create a blog to get started",
        });

    res.json(blog);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});


//@route GET api/blogs/:id
//@desc Blog route
//@access Private
router.get("/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    if (!blog)
      return res
        .status(400)
        .json({
          msg: "No blog available, Please create a Blog",
        });

    res.json(blog);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});



//@route POST api/Blog/me
//@desc     Blog route
//@access   Private

router.post(
  "/",
  [
    auth,
    [
      check("author", "Please Author name is required").not().isEmpty(),
      check("title", "Please blog title is required").not().isEmpty(),
      check("content", "Please blog content is required, minimium of 255 characters").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { author, title, content } = req.body;

    const blogFields = {};
    blogFields.user = req.user.id;

    if (author) blogFields.author = author;
    if (title) blogFields.title = title;
    if (content) blogFields.content = content;

    try {
      let blog = await Blog.findOne({ title: req.body.title });
      
      if (blog) {
        //Update
        blog = await Blog.findOneAndUpdate(
          { title: req.body.title },
          { $set: blogFields },
          { new: true }
        );
        
        return res.json(blog);
      }

      blog = new Blog(blogFields);
      await blog.save();

      res.json(blog);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

router.delete("/me", auth, async (req, res) => {
  const deleteBlog = await Blog.findOneAndRemove({ user: req.user.id });

  if (!deleteBlog)
    return res.status(400).json({ msg: "Blog not found or already deleted" });
  res.json({ msg: "Blog Deleted" });
});

router.delete("/delete/:id", auth, async (req, res) => {

    try {
  const deleteBlog = await Blog.findOneAndRemove({
    _id: req.params.id,
  });

  if (!deleteBlog)
    return res.status(400).json({ msg: "Blog not found or already deleted" });
  res.json({ msg: "Blog Deleted" });
} catch (err) {
    console.error(error.message);
    res.status(500).send("Server Error")
}
});

module.exports = router;
