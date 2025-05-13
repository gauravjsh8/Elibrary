import express from "express";
import { createUser } from "./userController";

export const userRouter = express.Router();

userRouter.post("/register", createUser);
