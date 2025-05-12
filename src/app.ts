import express from "express";
import createHttpError from "http-errors";
import { globalErrorHandler } from "./middlewares/globalErrorHandlers";

export const app = express();

app.get("/", (req, res, next) => {
  // const error = createHttpError("400", "Something went wrong");
  // throw error;
  res.json({ message: "Hello from elib Api" });
});

app.use(globalErrorHandler);
