import User from "../models/user.model.js";

export const findUserByUsername = (username) => {
  return User.findOne({ username });
};

export const findUserByClerkId = (clerkId) => {
  return User.findOne({ clerkId });
};

export const findUserById = (userId) => {
  return User.findById(userId);
};

export const updateUserByClerkId = (clerkId, updateData) => {
  return User.findOneAndUpdate({ clerkId }, updateData, { new: true });
};

export const createUser = (userData) => {
  return User.create(userData);
};

export const pushFollower = (targetUserId, followerId) => {
  return User.findByIdAndUpdate(targetUserId, {
    $push: { followers: followerId },
  });
};

export const pullFollower = (targetUserId, followerId) => {
  return User.findByIdAndUpdate(targetUserId, {
    $pull: { followers: followerId },
  });
};

export const pushFollowing = (clerkId, targetUserId) => {
  return User.findOneAndUpdate(
    { clerkId },
    { $push: { following: targetUserId } }
  );
};

export const pullFollowing = (clerkId, targetUserId) => {
  return User.findOneAndUpdate(
    { clerkId },
    { $pull: { following: targetUserId } }
  );
};
