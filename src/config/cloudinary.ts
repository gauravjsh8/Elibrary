import { v2 as cloudinary } from "cloudinary";
import { configuration } from "./config";

// Configuration
cloudinary.config({
  cloud_name: configuration.cloudinaryCloud,
  api_key: configuration.cloudinaryApiKey,
  api_secret: configuration.cloudinaryApiSecret,
});

export default cloudinary;
