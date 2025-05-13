import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { configuration } from "../config/config";

export const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = err as HttpError;
  const statusCode = error.status || 500;

  res.status(statusCode).json({
    message: error.message || "Something went wrong",
    errorStack: configuration.env === "development" ? error.stack : "",
  });
};
