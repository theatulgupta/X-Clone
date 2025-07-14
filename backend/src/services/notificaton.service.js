import * as notificationDao from "../dao/notification.dao.js";
import * as userDao from "../dao/user.dao.js";

export const createNotification = async ({ from, to, postId, commentId }) => {
  if (!from || !to)
    throw new Error("Both 'from' and 'to' user IDs are required");

  if (!postId && !commentId)
    throw new Error("Either 'postId' or 'commentId' must be provided");
  return await notificationDao.createNotification(from, to, postId, commentId);
};

export const getUserNotifications = async (clerkUserId) => {
  const user = await userDao.findUserByClerkId(clerkUserId);
  if (!user) throw new Error("User not found");
  return await notificationDao.findNotificationsForUser(user._id);
};

export const removeNotification = async (clerkUserId, notificationId) => {
  const user = await userDao.findUserByClerkId(clerkUserId);
  if (!user) throw new Error("User not found");

  const deleted = await notificationDao.deleteNotificationByIdForUser(
    notificationId,
    user._id
  );

  if (!deleted) throw new Error("Notification not found");
};
