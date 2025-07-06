import * as notificationDao from "../dao/notification.dao.js";
import * as userDao from "../dao/user.dao.js";

export const createNotification = async ({ from, to, postId, commentId }) => {
  return await notificationDao.createNotification(from, to, postId, commentId);
};

export const getUserNotifications = async (userId) => {
  const user = await userDao.findUserById(userId);
  if (!user) throw new Error("User not found");
  return await notificationDao.findNotificationsForUser(user._id);
};

export const removeNotification = async (userId, notificationId) => {
  const user = await userDao.findUserById(userId);
  if (!user) throw new Error("User not found");

  const deleted = await notificationDao.deleteNotificationByIdForUser(
    notificationId,
    user._id
  );

  if (!deleted) throw new Error("Notification not found");
};
