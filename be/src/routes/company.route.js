import { Router } from "express";

import {
  createCompany,
  getCompanyById,
  getCompanyDetails,
  getCompanies,
  updateCompany,
  deleteCompany,
  getJobByCompany,
  getNearbyCompanies,
  addCompanyReview,
  updateCompanyReview,
  deleteCompanyReview,
} from "../controllers/company.controller.js";

import { companyUpload } from "../middleware/multer.js";

import {
  isAuthenticated,
  isRecruiter,
} from "../middleware/auth.middleware.js";

const router = Router();

// ======================================================
// NEARBY
// ======================================================

router.get(
  "/nearby",
  getNearbyCompanies
);

// ======================================================
// COMPANY CRUD
// ======================================================

// CREATE
router.post(
  "/create",
  isAuthenticated,
  isRecruiter,
  companyUpload,
  createCompany
);

// GET ALL BY RECRUITER
router.get(
  "/",
  isAuthenticated,
  isRecruiter,
  getCompanies
);

// COMPANY DETAIL BY SLUG
router.get(
  "/detail/:slug",
  getCompanyDetails
);

// JOBS BY COMPANY
router.get(
  "/jobs/:slug",
  getJobByCompany
);

// COMPANY BY ID
router.get(
  "/:id",
  isAuthenticated,
  getCompanyById
);

// UPDATE
router.put(
  "/update-company/:id",
  isAuthenticated,
  isRecruiter,
  companyUpload,
  updateCompany
);

// DELETE
router.delete(
  "/:id",
  isAuthenticated,
  isRecruiter,
  deleteCompany
);

// ======================================================
// REVIEW
// ======================================================
router.post(
  "/:id/reviews",
  isAuthenticated,
  companyUpload,
  addCompanyReview
);
// REVIEW ROUTES (Thêm vào routes/company.route.js)
router.post("/:id/reviews", isAuthenticated, companyUpload, addCompanyReview);
router.put("/:id/reviews/:reviewId", isAuthenticated, companyUpload, updateCompanyReview);
router.delete("/:id/reviews/:reviewId", isAuthenticated, deleteCompanyReview);
export default router;