import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { configuration } from "../config/config";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const error = createHttpError(400, "User already Exists");
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = sign(
      { sub: newUser._id },
      configuration.jsonWebToken as string,
      { expiresIn: "7d" }
    );
    res.json({ message: "user Created", token: token });
  } catch (error) {
    return next(createHttpError(500, "Something wrong with the server"));
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(createHttpError(400, "All fields are required"));
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(createHttpError(400, "User Not Found"));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(createHttpError(400, "Incorrect Password"));
    }

    const token = sign(
      { sub: user._id },
      configuration.jsonWebToken as string,
      { expiresIn: "7d" }
    );

    res
      .status(200)
      .json({ message: "Logged in Successfully", accessToken: token });
  } catch (error) {
    return next(createHttpError(500, "Something wrong with the server"));
  }
};
