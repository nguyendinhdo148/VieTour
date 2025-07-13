import { Router } from "express";

import { isAuthenticated } from "../middleware/auth.middleware.js";
import {
  generate_description,
  chat_with_ai,
} from "../controllers/ai.controller.js";

const router = Router();

// Route sinh mô tả công việc bằng AI (yêu cầu đăng nhập)
router.post("/generate-description", isAuthenticated, generate_description);
// Route chat với AI (không yêu cầu đăng nhập)
router.post("/chat_with_ai", chat_with_ai);

export default router;
