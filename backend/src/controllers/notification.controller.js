import { getAuth } from "@clerk/express";
import asyncHandler from "express-async-handler";
import * as notificationService from "../services/notificaton.service.js";

export const getNotifications = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const notifications = await notificationService.getUserNotifications(userId);
  res.status(200).json({ notifications });
});

export const deleteNotification = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { notificationId } = req.params;
  await notificationService.removeNotification(userId, notificationId);
  res.status(200).json({ message: "Notification deleted successfully" });
});
