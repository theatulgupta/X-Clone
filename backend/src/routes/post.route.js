import { Router } from "express";
import {
  getPosts,
  getPost,
  getUserPosts,
  createPost,
  likePost,
  deletePost,
} from "../controllers/post.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = Router();

// Public
router.get("/", getPosts);
router.get("/:postId", getPost);
router.get("/user/:username", getUserPosts);

// Protected
router.post("/", protectRoute, upload.single("image"), createPost);
router.post("/like", protectRoute, likePost);
router.post("/:postId", protectRoute, deletePost);

export default router;
