import { Router } from "express";
import {
  createBlog,
  getBlogBySlug,
  getAllBlog,
  getBlogsByAuthor,
  updateBlog,
  deleteBlog,
  getBlogRandomBlogs,
  getBlogUpdateById,
} from "../controllers/blog.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { singleUpload } from "../middleware/multer.js";

const router = Router();

router
  .get("/all-blogs", getAllBlog)
  .get("/detail/:slug", getBlogBySlug)
  .get("/detail/update/:id", isAuthenticated, getBlogUpdateById)
  .get("/author-blogs", isAuthenticated, getBlogsByAuthor)
  .get("/random-blogs", getBlogRandomBlogs);
router.post("/create-blog", isAuthenticated, singleUpload, createBlog);
router.put("/update-blog/:id", isAuthenticated, singleUpload, updateBlog);
router.delete("/delete-blog/:id", isAuthenticated, deleteBlog);

export default router;
