import Blog from "../models/blogsModel.js";

//  get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json({ message: "saccess", blogs });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
};

// get random blogs  by num of blogs
const getRandomeBlogs = async (req, res) => {
  // מחזיר תת מסמך בצורה רנדומלית ע׳׳י ״שאילתת״ מונגו  - הסייז קובע כמה יחזרו אם אין מספר יחזור  1
  // ואם המספר גבוה ממספר הבדיחות - יחזרו כל הבדיחות (התנהגות של ״סמפל״)
  try {
    let num = req.params.num || 1;

    if (isNaN(num) || num < 1) {
      num = 1;
    }

    const randomblogs = await Joke.aggregate([
      { $sample: { size: parseInt(num) } },
    ]);

    res.send(randomblogs);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
};

// get blog by id
async function getBlogById(req, res, next) {
  let blog;
  try {
    blog = await blog.findById(req.params.id);
    if (blog === null) {
      return res.status(404).json({ massege: "id not found" });
    }
    res.send({ blog });
  } catch (error) {
    return res.status(500).json({ massege: error.massege });
  }
  res.blog = blog;
  next();
}

//   add blog
const addBlog = async (req, res) => {
  try {
    const newblog = new Blog({
      title: req.body.title,
      content: req.body.content,
      // creatadBy: req.body.creatadBy,
    });
    const savedblog = await newblog.save();
    const id = savedblog._id;
    res.send({
      message: "seve this id to delete or update your blog latter on",
      id,
    });
  } catch (error) {
    // check if it mongoose error
    if (error.name === "ValidationError") {
      return res.status(400).send({
        message: "Validation error occurred.",
        error: error.message,
      });
    } else if (error.code === 11000) {
      return res.status(409).send({
        message: "Duplicate key error. The product already exists.",
        error: error.message,
      });
    } else {
      console.error(error);
      return res.status(500).send({
        message: "An error occurred while adding the product.",
        error: error.message,
      });
    }
  }
};

//   update blog
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { blog, content } = req.body;
    const filedsToUpdate = {};

    if (blog || blog !== "") {
      filedsToUpdate.blog = blog;
    }

    if (content || content !== "") {
      filedsToUpdate.content = content;
    }

    await blog.findByIdAndUpdate(id, filedsToUpdate, {
      runValidators: true,
    });
    res.send({ message: "updated successfully" });
  } catch (err) {
    res.send({ error: `${err}` });
  }
};

// delete blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedblog = await Joke.findByIdAndDelete(id);

    if (!deletedblog) {
      return res.status(404).send({ message: "blog not found" });
    }

    res.send({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const blogController = {
  getAllBlogs,
  getRandomeBlogs,
  getBlogById,
  addBlog,
  updateBlog,
  deleteBlog,
};
