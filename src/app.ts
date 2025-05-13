import express from "express";
import createHttpError from "http-errors";
import { globalErrorHandler } from "./middlewares/globalErrorHandlers";
import { userRouter } from "./user/userRouter";

export const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
  // const error = createHttpError("400", "Something went wrong");
  // throw error;
  res.json({ message: "Hello from elib Api" });
});

app.use("/api/users", userRouter);

app.use(globalErrorHandler);
