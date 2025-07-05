import * as userDao from "../dao/user.dao.js";
import Notification from "../models/notification.model.js";
import { clerkClient } from "@clerk/express";

export const getUserProfile = (username) => {
  return userDao.findUserByUsername(username);
};

export const updateUserProfile = (clerkId, updateData) => {
  return userDao.updateUserByClerkId(clerkId, updateData);
};

export const syncUserWithClerk = async (clerkId) => {
  const existingUser = await userDao.findUserByClerkId(clerkId);
  if (existingUser) {
    return { user: existingUser, message: "User already exists" };
  }

  const clerkUser = await clerkClient.users.getUser(clerkId);

  if (!clerkUser.emailAddresses || clerkUser.emailAddresses.length === 0) {
    throw new Error("No email address found for user");
  }

  const email = clerkUser.emailAddresses[0].emailAddress;
  const baseUsername = email.split("@")[0];

  // Generate unique username
  let username = baseUsername;
  let counter = 1;
  while (await userDao.findUserByUsername(username)) {
    username = `${baseUsername}${counter}`;
    counter++;
  }

  const userData = {
    clerkId,
    email,
    firstName: clerkUser.firstName || "",
    lastName: clerkUser.lastName || "",
    username,
    profilePicture: clerkUser.imageUrl || "",
    bannerImage: "",
    bio: "",
    location: "",
    followers: [],
    following: [],
  };

  const newUser = await userDao.createUser(userData);
  return { user: newUser, message: "User created successfully" };
};

export const getCurrentUser = (clerkId) => {
  return userDao.findUserByClerkId(clerkId);
};

export const toggleFollowUser = async (clerkId, targetUserId) => {
  if (!clerkId || !targetUserId || clerkId === targetUserId) {
    return { success: false, message: "Invalid user or target" };
  }

  const currentUser = await userDao.findUserByClerkId(clerkId);
  const targetUser = await userDao.findUserById(targetUserId);
  if (!currentUser || !targetUser) {
    return { success: false, message: "User not found" };
  }

  const isFollowing = currentUser.following.includes(targetUserId);

  if (isFollowing) {
    await userDao.pullFollowing(clerkId, targetUserId);
    await userDao.pullFollower(targetUserId, currentUser._id);
  } else {
    await userDao.pushFollowing(clerkId, targetUserId);
    await userDao.pushFollower(targetUserId, currentUser._id);

    await Notification.create({
      from: currentUser._id,
      to: targetUser._id,
      type: "follow",
    });
  }

  return {
    success: true,
    message: isFollowing ? "Unfollowed successfully" : "Followed successfully",
  };
};
