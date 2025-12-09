import { Router } from "express";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../controllers/notification.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", isAuthenticated, getNotifications);
router.put("/:notificationId/read", isAuthenticated, markAsRead);
router.put("/read-all", isAuthenticated, markAllAsRead);
router.delete("/:notificationId", isAuthenticated, deleteNotification);

export default router;

