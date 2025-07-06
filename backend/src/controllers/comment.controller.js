import { getAuth } from "@clerk/express";
import asyncHandler from "express-async-handler";
import * as commentService from "../services/comment.service.js";

export const getComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const comments = await commentService.getComments(postId);
  res.status(200).json({ comments });
});

export const createComment = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { postId } = req.params;
  const { content } = req.body;

  const comment = await commentService.createComment(userId, postId, content);
  res.status(201).json({ comment });
});

export const deleteComment = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { commentId } = req.params;

  await commentService.deleteComment(userId, commentId);
  res.status(200).json({ message: "Comment deleted successfully" });
});
