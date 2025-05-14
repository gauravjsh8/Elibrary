import dotenv from "dotenv";
import cloudinary from "./cloudinary";
dotenv.config();

const _config = {
  port: process.env.PORT,
  databaseUrl: process.env.MONGO_CONNECTION_STRING,
  env: process.env.NODE_ENV,
  jsonWebToken: process.env.JSON_TOKEN,
  cloudinaryCloud: process.env.CLOUDINARY_CLOUD,
  cloudinaryApiKey: process.env.CLOUDINARY_APIKEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_APISECRET,
};

export const configuration = Object.freeze(_config);
