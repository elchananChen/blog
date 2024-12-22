import express from "express";

import { blogController } from "../controllers/blogsController.js";

const router = express.Router();

//  get all blogs
router.get("/all", blogController.getAllBlogs);

// get random blogs  by num of blogs
router.get("/random/:num", blogController.getRandomeBlogs);

// get blog by id
router.get("/:id", blogController.getBlogById, (req, res) => {
  res.json(res.blog);
});

//add blog
router.post("/", /* validator.validateblog,*/ blogController.addBlog);

// update blog
router.patch("/:id", blogController.updateBlog);

//delete blog
router.delete("/:id", blogController.deleteBlog);

export default router;
