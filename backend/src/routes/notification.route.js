import { Router } from "express";
import {
  getNotifications,
  deleteNotification,
} from "../controllers/notification.controller.js";
import { requireAuth } from "@clerk/express";

const router = Router();

// Protected
router.get("/", requireAuth(), getNotifications);

// Protected
router.delete("/:notificationId", requireAuth(), deleteNotification);

export default router;
