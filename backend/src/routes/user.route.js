import { Router } from "express";
import {
  getUserProfile,
  updateProfile,
  syncUser,
  getCurrentUser,
  followUser,
} from "../controllers/user.controller.js";
import { requireAuth } from "@clerk/express";

const router = Router();

router.get("/profile/:username", getUserProfile);

router.put("/profile", requireAuth(), updateProfile);
router.post("/sync", requireAuth(), syncUser);
router.get("/me", requireAuth(), getCurrentUser);
router.post("/follow/:targetUserId", requireAuth(), followUser);

export default router;
