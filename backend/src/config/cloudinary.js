import { v2 as cloudinary } from "cloudinary";
import ENV from "../config/env.js";

if (
  !ENV.CLOUDINARY_CLOUD_NAME ||
  !ENV.CLOUDINARY_API_KEY ||
  !ENV.CLOUDINARY_API_SECRET
) {
  throw new Error("Missing Cloudinary configuration in ENV.");
}

cloudinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;
