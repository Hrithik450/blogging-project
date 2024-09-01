import express from "express";
import { isAuthorized, verifytoken } from "../middlewares/auth.js";
import {
  BlogPost,
  DeleteBlog,
  GetAllBlogs,
  GetSingleBlog,
  getMyBlogs,
  updateBlog,
} from "../controllers/blog.js";

const router = express.Router();

router.post("/post", verifytoken, isAuthorized(["Author"]), BlogPost);
router.delete("/:blogId", verifytoken, isAuthorized(["Author"]), DeleteBlog);
router.get("/getblogs", GetAllBlogs);
router.get("/:blogId", verifytoken, isAuthorized(["Author"]), GetSingleBlog);
router.put("/:blogId", verifytoken, isAuthorized(["Author"]), updateBlog);
router.get("/blogs/MyBlogs", verifytoken, isAuthorized(["Author"]), getMyBlogs);

export default router;
