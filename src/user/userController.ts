import { NextFunction, Request, Response } from "express";

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "user Created" });
};
