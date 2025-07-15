import { Router } from "express";
import rateLimit from "express-rate-limit";

import {
  createJob,
  getAllJobs,
  getJobBySlug,
  getRecruiterJobs,
  updateJob,
  deleteJob,
  suggestions,
} from "../controllers/job.controller.js";
import { isAuthenticated, isRecruiter } from "../middleware/auth.middleware.js";

const router = Router();

const suggestionsLimiter = rateLimit({
  windowMs: 1000, // 1 giây
  max: 5,
  message: {
    success: false,
    message: "Quá nhiều yêu cầu gợi ý. Vui lòng thử lại sau.",
  },
});

router.post("/create-job", isAuthenticated, isRecruiter, createJob);

router
  .get("/all-jobs", getAllJobs)
  .get("/recruiter-jobs", isAuthenticated, isRecruiter, getRecruiterJobs)
  .get("/suggestions", suggestionsLimiter, suggestions)
  .get("/detail/:slug", getJobBySlug);
router.put("/update-job/:id", isAuthenticated, isRecruiter, updateJob);
router.delete("/delete-job/:id", isAuthenticated, isRecruiter, deleteJob);

export default router;
