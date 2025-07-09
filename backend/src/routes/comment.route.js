import { Router } from "express";
import {
  createComment,
  deleteComment,
  getComment,
} from "../controllers/comment.controller.js";
import { requireAuth } from "@clerk/express";

const router = Router();

// Public
router.get("/post/:postId", getComment);

// Protected
router.post("/post/:postId", requireAuth(), createComment);
router.delete("/:commentId", requireAuth(), deleteComment);

export default router;
