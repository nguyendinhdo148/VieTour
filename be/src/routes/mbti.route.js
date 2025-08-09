import { Router } from "express";
import {
  advancedMBTIAnalysis,
  analyzeWithGemini,
} from "../controllers/mbti.controller.js";

const router = Router();

// Phân tích cơ bản MBTI bằng Gemini
router.post("/basic-analysis", analyzeWithGemini);

// Phân tích nâng cao MBTI bằng Gemini (dựa trên answer patterns)
router.post("/advanced-analysis", advancedMBTIAnalysis);

export default router;
