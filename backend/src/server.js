import express from "express";
import ENV from "./config/env.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import notificationRoutes from "./routes/notification.route.js";
import arcjetMiddleware from "./middleware/arcjet.middleware.js";

const app = express();

// Middlewares
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(clerkMiddleware());
app.use(arcjetMiddleware);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.log("Unhandled error:", err);

  res.status(500).json({
    error: err.message,
    message: "Internal server error",
  });
});

const startServer = async () => {
  try {
    await connectDB();
    app.get("/", (req, res) => res.send("Hello from Server"));
    app.listen(ENV.PORT, () =>
      console.log(`Server started on port ${ENV.PORT}`)
    );
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
