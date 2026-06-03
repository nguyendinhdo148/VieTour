import { Router } from "express";

import {
  applyJob,
  applyCompany, // Bổ sung controller này
  getAppliedJobs,
  getApplicants,
  updateApplicationStatus,
  getApplicantsForRecruiter,
  getOverview,
} from "../controllers/application.controller.js";
import { isAuthenticated, isRecruiter } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/apply-job/:id", isAuthenticated, applyJob);
router.post("/apply-company/:id", isAuthenticated, applyCompany); // Thêm route cho đặt bàn doanh nghiệp
router.get("/applied-jobs", isAuthenticated, getAppliedJobs);
router
  .get("/applicants/:id", isAuthenticated, isRecruiter, getApplicants)
  .get(
    "/applicantsForRecruiter",
    isAuthenticated,
    isRecruiter,
    getApplicantsForRecruiter
  );
router.put(
  "/update-application-status/:id",
  isAuthenticated,
  isRecruiter,
  updateApplicationStatus
);
router.get("/overview", isAuthenticated, isRecruiter, getOverview);

export default router;