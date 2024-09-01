import mongoose from "mongoose";

const BlogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: [1, "Blog title must contain at least 10 chracters"],
    maxLength: [150, "Blog title cannot exceeed 40 chracters"],
  },
  mainImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  intro: {
    type: String,
    required: true,
    minLength: [1, "Blog Intro must contain at least 250 chracters"],
  },
  paraOneImage: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  paraOneContent: {
    type: String,
    minLength: [1, "Para-1 content must contain at least 50 chracters"],
  },
  paraOneTitle: {
    type: String,
    minLength: [1, "Para-1 title must contain at least 20 chracters"],
  },
  paraTwoImage: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  paraTwoContent: {
    type: String,
    minLength: [1, "Para-2 content must contain at least 50 chracters"],
  },
  paraTwoTitle: {
    type: String,
    minLength: [1, "Para-2 title must contain at least 20 chracters"],
  },
  category: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  authorAvatar: {
    type: String,
  },
  published: {
    type: Boolean,
  },
});

const blog = mongoose.model("blog", BlogSchema);

export default blog;
