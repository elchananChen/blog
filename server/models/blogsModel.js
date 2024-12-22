import mongoose from "mongoose";

const blogsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },

  creatadBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Blog", blogsSchema);
