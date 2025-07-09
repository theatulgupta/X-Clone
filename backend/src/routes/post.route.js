import { Router } from "express";
import {
  getPosts,
  getPost,
  getUserPosts,
  createPost,
  likePost,
  deletePost,
} from "../controllers/post.controller.js";
import upload from "../middleware/upload.middleware.js";
import { requireAuth } from "@clerk/express";

const router = Router();

// Public
router.get("/", getPosts);
router.get("/:postId", getPost);
router.get("/user/:username", getUserPosts);

// Protected
router.post("/", requireAuth(), createPost);
router.post("/upload", requireAuth(), upload.single("image"), createPost);
router.post("/like", requireAuth(), likePost);
router.delete("/:postId", requireAuth(), deletePost);

export default router;
