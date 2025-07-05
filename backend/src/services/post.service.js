import * as postDao from "../dao/post.dao.js";
import * as userDao from "../dao/user.dao.js";
import Notification from "../models/notification.model.js";
import cloudinary from "../config/cloudinary.js";

export const getAllPosts = () => {
  return postDao.findAllPosts();
};

export const getPostById = (postId) => {
  return postDao.findPostById(postId);
};

export const getPostsByUsername = async (username) => {
  const user = await userDao.findUserByUsername(username);
  if (!user) return null;
  return postDao.findPostsByUserId(user._id);
};

export const createPost = async (clerkId, body, file) => {
  const user = await userDao.findUserByClerkId(clerkId);
  if (!user) throw new Error("User not found");

  const { content } = body;
  if (!content && !file) throw new Error("Content or image is required");

  let imageUrl = null;
  if (file) {
    // Validate file size (e.g., 5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error("File size exceeds 5MB limit");
    }

    const base64Image = `data:${file.mimetype};base64,${file.buffer.toString(
      "base64"
    )}`;
    try {
      const upload = await cloudinary.uploader.upload(base64Image, {
        folder: "posts",
        resource_type: "image",
        transformation: [
          { width: 800, height: 600, crop: "limit" },
          { quality: "auto" },
          { format: "auto" },
        ],
      });
      imageUrl = upload.secure_url;
    } catch (error) {
      throw new Error(`Image upload failed: ${error.message}`);
    }
  }

  return postDao.createPost({
    user: user._id,
    content: content || "",
    image: imageUrl,
  });
};

export const toggleLikePost = async (clerkId, postId) => {
  const user = await userDao.findUserByClerkId(clerkId);
  const post = await postDao.findPostById(postId);
  if (!user || !post) return null;

  const isLiked = post.likes.includes(user._id);
  await postDao.updateLikeStatus(postId, user._id, !isLiked);

  if (!isLiked && post.user.toString() !== user._id.toString()) {
    await Notification.create({
      from: user._id,
      to: post.user,
      type: "like",
      post: postId,
    });
  }

  return isLiked ? "Post unliked" : "Post liked";
};

export const deletePost = async (clerkId, postId) => {
  const user = await userDao.findUserByClerkId(clerkId);
  const post = await postDao.findPostById(postId);
  if (!user || !post) return false;
  if (post.user.toString() !== user._id.toString()) return false;

  await postDao.deletePost(postId);
  return true;
};
