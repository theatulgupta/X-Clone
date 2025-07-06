import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createComment,
  deleteComment,
  getComment,
} from "../controllers/comment.controller.js";

const router = Router();

// Public
router.get("/post/:postId", getComment);

// Protected
router.post("/post/:postId", protectRoute, createComment);
router.post("/:commentId", protectRoute, deleteComment);

export default router;
