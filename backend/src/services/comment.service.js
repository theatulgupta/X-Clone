import * as commentDao from "../dao/comment.dao.js";
import * as userDao from "../dao/user.dao.js";
import { findPostById } from "../dao/post.dao.js";
import Comment from "../models/comment.model.js";

export const getComments = async (postId) => {
  return await commentDao.findCommentsByPostId(postId);
};

export const createComment = async (userId, postId, content) => {
  if (!content || content.trim() === "") {
    throw new Error("Comment cannot be empty");
  }

  const user = await userDao.findUserByClerkId(userId);
  const post = await findPostById(postId);

  if (!user || !post) {
    throw new Error("User or post not found");
  }

  const comment = new Comment({
    user: user._id,
    post: post._id,
    content,
  });

  await commentDao.pushCommentToPost(postId, comment._id);

  if (post.user.toString() !== user._id.toString()) {
    await commentDao.createNotification(
      user._id,
      post.user,
      postId,
      comment._id
    );
  }

  await comment.save();
  return comment;
};

export const deleteComment = async (userId, commentId) => {
  const user = await userDao.findUserByClerkId(userId);
  const comment = await commentDao.findCommentById(commentId);

  if (!user || !comment) {
    throw new Error("User or comment not found");
  }

  if (comment.user.toString() !== user._id.toString()) {
    throw new Error("You can only delete your own comments");
  }

  await commentDao.pullCommentFromPost(comment.post, commentId);
  await commentDao.deleteCommentById(commentId);
};
