import { CatchAsyncError } from "../middlewares/asyncerror.js";
import cloudinary from "cloudinary";
import ErrorHandler from "../middlewares/error.js";
import user from "../models/user.js";
import blog from "../models/blog.js";
import mongoose from "mongoose";

export const BlogPost = CatchAsyncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0)
    return next(new ErrorHandler("Blog image is required", 400));

  const { mainImage, paraOneImage, paraTwoImage } = req.files;

  if (!mainImage) return next(new ErrorHandler("Main image is required", 400));

  const AllowedFormats = ["image/jpeg", "image/jpg", "image/webp", "image/png"];

  if (
    !AllowedFormats.includes(mainImage.mimetype) ||
    (paraOneImage && !AllowedFormats.includes(paraOneImage.mimetype)) ||
    (paraTwoImage && !AllowedFormats.includes(paraTwoImage.mimetype))
  ) {
    return next(new ErrorHandler("Invalid file format", 400));
  }

  const {
    paraOneContent,
    paraOneTitle,
    paraTwoTitle,
    paraTwoContent,
    title,
    intro,
    category,
    published,
  } = req.body;

  const User = await user.findOne({ _id: req.user.id });
  const createdBy = req.user.id;
  const authorName = User.name;
  const authorAvatar = User.avatar.url;

  if (!title || !intro || !category) {
    return next(new ErrorHandler("Please fill all the details", 400));
  }

  const uploadPromises = [
    cloudinary.uploader.upload(mainImage.tempFilePath),
    paraOneImage
      ? cloudinary.uploader.upload(paraOneImage.tempFilePath)
      : Promise.resolve(null),
    paraTwoImage
      ? cloudinary.uploader.upload(paraTwoImage.tempFilePath)
      : Promise.resolve(null),
  ];

  const [mainImageRes, paraOneImageRes, paraTwoImageRes] = await Promise.all(
    uploadPromises
  );

  if (
    !mainImageRes ||
    mainImageRes.error ||
    (paraOneImage && (!paraOneImageRes || paraOneImageRes.error)) ||
    (paraTwoImage && (!paraTwoImageRes || paraTwoImageRes.error))
  ) {
    return next(new ErrorHandler("Error Occured in uploading images", 400));
  }

  const BlogData = {
    paraOneContent,
    paraOneTitle,
    paraTwoTitle,
    paraTwoContent,
    title,
    intro,
    category,
    createdBy,
    authorName,
    authorAvatar,
    published,
    mainImage: {
      public_id: mainImageRes.public_id,
      url: mainImageRes.secure_url,
    },
  };

  if (paraOneImageRes) {
    BlogData.paraOneImage = {
      public_id: paraOneImageRes.public_id,
      url: paraOneImageRes.secure_url,
    };
  }

  if (paraTwoImageRes) {
    BlogData.paraTwoImage = {
      public_id: paraTwoImageRes.public_id,
      url: paraTwoImageRes.secure_url,
    };
  }

  const Blog = await blog.create(BlogData);
  res.status(200).json({
    message: "success",
    Blog,
  });
});

export const DeleteBlog = CatchAsyncError(async (req, res, next) => {
  const { blogId } = req.params;

  const Blog = await blog.findById(blogId);

  if (!Blog) return next(new ErrorHandler("Blog Not found!!", 404));

  await blog.deleteOne({ _id: blogId });

  return res.status(200).json({ message: "Successfully Deleted" });
});

export const GetAllBlogs = CatchAsyncError(async (req, res, next) => {
  const Blogs = await blog.find({ published: true });
  return res.status(200).json({ Blogs });
});

export const GetSingleBlog = CatchAsyncError(async (req, res, next) => {
  const { blogId } = req.params;

  const Blog = await blog.findById(blogId);
  if (!Blog) return next(new ErrorHandler("No Blog found!", 404));

  return res.status(200).json({ Blog });
});

export const getMyBlogs = async (req, res, next) => {
  const UserObjID = req.user.id;

  const UserID = new mongoose.Types.ObjectId(UserObjID);

  const Blogs = await blog.find({ createdBy: UserID });

  return res.status(200).json({ Blogs });
};

export const updateBlog = CatchAsyncError(async (req, res, next) => {
  const { blogId } = req.params;

  let Blog = await blog.findById(blogId);

  if (!Blog) return next(new ErrorHandler("Blog not found!", 404));

  const newBlogData = {
    title: req.body.title,
    intro: req.body.intro,
    category: req.body.category,
    paraOneContent: req.body.paraOneContent,
    paraOneTitle: req.body.paraOneTitle,
    paraTwoContent: req.body.paraTwoContent,
    paraTwoTitle: req.body.paraTwoTitle,
    published: req.body.published,
  };

  if (req.files) {
    const { mainImage, paraOneImage, paraTwoImage } = req.files;

    const AllowedFormats = [
      "image/png",
      "image/jpg",
      "image/webp",
      "image/jpeg",
    ];

    if (
      (mainImage && !AllowedFormats.includes(mainImage.mimetype)) ||
      (paraOneImage && !AllowedFormats.includes(paraOneImage.mimetype)) ||
      (paraTwoImage && !AllowedFormats.includes(paraTwoImage.mimetype))
    ) {
      return next(new ErrorHandler("Invalid image formats", 400));
    }

    if (req.files && mainImage) {
      const mainImageid = Blog.mainImage.public_id;
      await cloudinary.uploader.destroy(mainImageid);

      const newmainImageRes = await cloudinary.uploader.upload(
        mainImage.tempFilePath
      );

      newBlogData.mainImage = {
        public_id: newmainImageRes.public_id,
        url: newmainImageRes.secure_url,
      };
    }

    if (req.files && paraOneImage) {
      if (Blog.paraOneImage) {
        const paraOneImageid = Blog.paraOneImage.public_id;
        await cloudinary.uploader.destroy(paraOneImageid);
      }

      const newparaOneImageRes = await cloudinary.uploader.upload(
        paraOneImage.tempFilePath
      );

      newBlogData.paraOneImage = {
        public_id: newparaOneImageRes.public_id,
        url: newparaOneImageRes.url,
      };
    }

    if (req.files && paraTwoImage) {
      if (Blog.paraTwoImage) {
        const paraTwoImageid = Blog.paraTwoImage.public_id;
        await cloudinary.uploader.destroy(paraTwoImageid);
      }

      const newparaTwoImageRes = await cloudinary.uploader.upload(
        paraTwoImage.tempFilePath
      );

      newBlogData.paraTwoImage = {
        public_id: newparaTwoImageRes.public_id,
        url: newparaTwoImageRes.url,
      };
    }
  }

  Blog = await blog.findByIdAndUpdate(blogId, newBlogData, { new: true });
  await Blog.save();

  return res.status(200).json({ message: "Blog Updated successfully" });
});
