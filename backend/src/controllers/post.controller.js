import asyncHandler from "express-async-handler";
import { getAuth } from "@clerk/express";
import * as postService from "../services/post.service.js";

export const getPosts = asyncHandler(async (req, res) => {
  const posts = await postService.getAllPosts();
  res.status(200).json(posts);
});

export const getPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const post = await postService.getPostById(postId);
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.status(200).json(post);
});

export const getUserPosts = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const posts = await postService.getPostsByUsername(username);
  if (!posts) return res.status(404).json({ message: "User not found" });
  res.status(200).json(posts);
});

export const createPost = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const post = await postService.createPost(userId, req.body, req.file);
  res.status(201).json({ post });
});

export const likePost = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { postId } = req.body;
  const result = await postService.toggleLikePost(userId, postId);
  if (!result)
    return res.status(404).json({ message: "Post or user not found" });
  res.status(200).json({ message: result });
});

export const deletePost = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { postId } = req.params;
  const deleted = await postService.deletePost(userId, postId);
  if (!deleted)
    return res.status(401).json({ message: "Unauthorized or not found" });
  res.status(200).json({ message: "Post deleted successfully" });
});
