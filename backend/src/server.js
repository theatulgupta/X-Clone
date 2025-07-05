import express from "express";
import ENV from "./config/env.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import userRoutes from "./routes/user.route.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());

// Routes
app.use("/api/users", userRoutes);

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
