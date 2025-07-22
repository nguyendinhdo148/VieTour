import { Router } from "express";

import { isAuthenticated } from "../middleware/auth.middleware.js";
import {
  generate_description,
  chat_with_ai,
  resumeReview,
} from "../controllers/ai.controller.js";
import { singleUpload } from "../middleware/multer.js";


const router = Router();

// Route sinh mô tả công việc bằng AI (yêu cầu đăng nhập)
router.post("/generate-description", isAuthenticated, generate_description);
// Route chat với AI (không yêu cầu đăng nhập)
router.post("/chat_with_ai", chat_with_ai);
router.post("/resume-review", singleUpload, resumeReview);

export default router;
