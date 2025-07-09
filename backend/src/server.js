import "dotenv/config";
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import ENV from "./config/env.js";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import notificationRoutes from "./routes/notification.route.js";
import arcjetMiddleware from "./middleware/arcjet.middleware.js";

const app = express();
const port = ENV.PORT || process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Clerk middleware to enable auth
app.use(clerkMiddleware());

// Rate Limiter
// app.use(arcjetMiddleware());

// Routes
app.get("/", (req, res) => res.send("Hello from Server"));
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    error: err.message,
    message: "Internal server error",
  });
});

const startServer = async () => {
  try {
    await connectDB();
    if (ENV.NODE_ENV !== "production")
      app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

export default app;
