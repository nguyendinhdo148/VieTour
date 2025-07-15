import { Router } from "express";

import {
  createCompany,
  getCompanyById,
  getCompanyDetails,
  getCompanies,
  updateCompany,
  deleteCompany,
  getJobByCompany,
} from "../controllers/company.controller.js";
import { companyUpload } from "../middleware/multer.js";
import { isAuthenticated, isRecruiter } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/create",
  isAuthenticated,
  isRecruiter,
  companyUpload,
  createCompany
);
router.get("/", isAuthenticated, isRecruiter, getCompanies);
router.get("/:id", isAuthenticated, getCompanyById);
router.get("/detail/:slug", getCompanyDetails);
router.get("/jobs/:slug", getJobByCompany);
router.put(
  "/update-company/:id",
  isAuthenticated,
  isRecruiter,
  companyUpload,
  updateCompany
);
router.delete("/:id", isAuthenticated, isRecruiter, deleteCompany);

export default router;
