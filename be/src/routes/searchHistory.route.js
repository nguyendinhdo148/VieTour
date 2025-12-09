import { Router } from "express";
import {
  saveSearchHistory,
  getSearchHistory,
  deleteSearchHistory,
} from "../controllers/searchHistory.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/save", isAuthenticated, saveSearchHistory);
router.get("/", isAuthenticated, getSearchHistory);
router.delete("/:historyId", isAuthenticated, deleteSearchHistory);

export default router;
