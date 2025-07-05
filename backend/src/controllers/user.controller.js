import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import { getAuth } from "@clerk/express";
import Notification from "../models/notification.model.js";
import { clerkClient } from "@clerk/express";

export const getUserProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json({ user });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const user = await User.findOneAndUpdate({ clerkId: userId }, req.body, {
    new: true,
  });

  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json({ user });
});

export const syncUser = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  // Check if user already exits inside db
  const existingUser = await User.findOne({ clerkId: userId });
  if (existingUser)
    return res
      .status(200)
      .json({ user: existingUser, message: "User already exists" });

  // Create newUser with clerkUser
  const clerkUser = await clerkClient.users.getUser(userId);

  const userData = {
    clerkId: userId,
    email: clerkUser.emailAddresses[0].emailAddress,
    firstName: clerkUser.firstName || "",
    lastName: clerkUser.lastName || "",
    username: clerkUser.emailAddresses[0].emailAddress.split("@")[0],
    profilePicture: clerkUser.imageUrl || "",
    bannerImage: "",
    bio: "",
    location: "",
    followers: [],
    following: [],
  };

  const user = await User.create(userData);
  res.status(200).json({ user, message: "User created successfully" });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const user = await User.findOne({ clerkId: userId });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json({ user });
});

export const followUser = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { targetUserId } = req.params;

  if (userId == targetUserId)
    return res.status(400).json({ message: "You cannot follow yourself" });

  const currentUser = await User.findOne({ clerkId: userId });
  const targetUser = await User.findById(targetUserId);
  if (!currentUser || !targetUser)
    return res.status(400).json({ message: "User not found" });

  const isFollowing = currentUser.following.includes(targetUserId);

  if (isFollowing) {
    // Unfollow
    await User.findOneAndUpdate(
      { clerkId: userId },
      {
        $pull: { following: targetUserId },
      }
    );
    await User.findByIdAndUpdate(targetUserId, {
      $pull: { followers: userId },
    });
  } else {
    // Follow
    await User.findOneAndUpdate(
      { clerkId: userId },
      {
        $push: { following: targetUserId },
      }
    );
    await User.findByIdAndUpdate(targetUserId, {
      $push: { followers: userId },
    });
  }

  if (!isFollowing) {
    await Notification.create({
      from: currentUser._id,
      to: targetUser._id,
      type: "follow",
    });
  }

  res.status(200).json({
    message: isFollowing ? "Unfollowed successfully" : "Followed successfully",
  });
});
