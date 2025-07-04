import ENV from "./env.js";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("Database Connected ✅");
  } catch (error) {
    console.log("Database Connection Failed ❌");
    process.exit(1);
  }
};
