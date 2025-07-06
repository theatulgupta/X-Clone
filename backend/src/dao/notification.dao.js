import Notification from "../models/notification.model.js";

export const findNotificationsForUser = (userId) => {
  return Notification.find({ to: userId })
    .sort({ createdAt: -1 })
    .populate("from", "username firstName lastName profilePicture")
    .populate("post", "content image")
    .populate("comment", "content");
};

export const deleteNotificationByIdForUser = (notificationId, userId) => {
  return Notification.findOneAndDelete({ _id: notificationId, to: userId });
};
