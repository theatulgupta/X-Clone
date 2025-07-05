import asyncHandler from "express-async-handler";
import { getAuth } from "@clerk/express";
import * as userService from "../services/user.service.js";

export const getUserProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = await userService.getUserProfile(username);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json({ user });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const user = await userService.updateUserProfile(userId, req.body);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json({ user });
});

export const syncUser = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { user, message } = await userService.syncUserWithClerk(userId);
  res.status(200).json({ user, message });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const user = await userService.getCurrentUser(userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json({ user });
});

export const followUser = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { targetUserId } = req.params;
  const { success, message } = await userService.toggleFollowUser(
    userId,
    targetUserId
  );
  if (!success) return res.status(400).json({ message });
  res.status(200).json({ message });
});
