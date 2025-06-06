import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { configuration } from "../config/config";

export interface AuthRequest extends Request {
  userId: string;
}

export const authetication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");
  if (!token) {
    return next(createHttpError(401, "Authorization required"));
  }

  const parsedToken = token.split(" ")[1];

  try {
    const decoded = jwt.verify(
      parsedToken,
      configuration.jsonWebToken as string
    );
    const _req = req as AuthRequest;

    _req.userId = decoded.sub as string;
    next();
    console.log("decoded", decoded);
  } catch (error) {
    return next(createHttpError(401, "Token expired"));
  }
};
