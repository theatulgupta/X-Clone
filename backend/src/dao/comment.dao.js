import Comment from "../models/comment.model.js";
import Notification from "../models/notification.model.js";
import Post from "../models/post.model.js";

export const findCommentsByPostId = async (postId) => {
  return await Comment.find({ post: postId })
    .sort({ createdAt: -1 })
    .populate("user", "username firstName lastName profilePicture");
};

export const pushCommentToPost = async (postId, commentId) => {
  return await Post.findByIdAndUpdate(postId, {
    $push: { comments: commentId },
  });
};

export const createNotification = async (from, to, postId, commentId) => {
  return await Notification.create({
    from,
    to,
    type: "comment",
    post: postId,
    comment: commentId,
  });
};

export const findCommentById = async (commentId) => {
  return await Comment.findById(commentId);
};

export const deleteCommentById = async (commentId) => {
  return await Comment.findByIdAndDelete(commentId);
};

export const pullCommentFromPost = async (postId, commentId) => {
  return await Post.findByIdAndUpdate(postId, {
    $pull: { comments: commentId },
  });
};
