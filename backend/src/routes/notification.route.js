import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getNotifications,
  deleteNotification,
} from "../controllers/notification.controller.js";

const router = Router();

// Protected
router.get("/", protectRoute, getNotifications);

// Protected
router.delete("/:notificationId", protectRoute, deleteNotification);

export default router;
