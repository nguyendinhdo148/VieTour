import { Router } from "express";

import {
  deleteCompany,
  deleteJob,
  deleteUser,
  getAllCompanies,
  getAllJobs,
  getAllUsers,
  getAdminOverview,
  createCompanyAdmin,
  updateCompany,
  createJob,
  updateJob,
  updateProfile,
  approveJob,
  approveBlog,
} from "../controllers/admin.controller.js";
import { isAuthenticated, isAdmin } from "../middleware/auth.middleware.js";
import { companyUpload } from "../middleware/multer.js";

const router = Router();

// user
router.get("/all-users", isAuthenticated, isAdmin, getAllUsers);
router.put("/profile/update/:id", isAuthenticated, isAdmin, updateProfile);
router.delete("/delete-user/:id", isAuthenticated, isAdmin, deleteUser);

// job
router.post("/create-job", isAuthenticated, isAdmin, createJob);
router.get("/all-jobs", isAuthenticated, isAdmin, getAllJobs);
router.put("/update-job/:id", isAuthenticated, isAdmin, updateJob);
router.put("/approve-job/:id", isAuthenticated, isAdmin, approveJob);
router.delete("/delete-job/:id", isAuthenticated, isAdmin, deleteJob);

// company
router.post(
  "/company/create",
  isAuthenticated,
  isAdmin,
  companyUpload,
  createCompanyAdmin
);
router.get("/all-companies", isAuthenticated, isAdmin, getAllCompanies);
router.put(
  "/company/:id",
  isAuthenticated,
  isAdmin,
  companyUpload,
  updateCompany
);
router.delete("/company/:id", isAuthenticated, isAdmin, deleteCompany);

// blog
router.put("/approve-blog/:id", isAuthenticated, isAdmin, approveBlog);

// overview
router.get("/overview", isAuthenticated, isAdmin, getAdminOverview);

export default router;
