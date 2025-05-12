import mongoose from "mongoose";
import { configuration } from "./config";

export const connectDb = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to the database successfully");
    });

    mongoose.connection.on("error", (error) => {
      console.log("Connection to the database failed", error);
    });
    await mongoose.connect(configuration.databaseUrl as string);
  } catch (error) {
    console.log("Failed to connect to database", error);
    process.exit(1);
  }
};
