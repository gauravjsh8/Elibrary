import express from "express";
import { createBook, listBooks, updateBook } from "./bookController";
import multer from "multer";
import path from "node:path";
import { authetication } from "../middlewares/authenticate";

export const bookRouter = express.Router();

const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { fileSize: 3e7 },
});

bookRouter.post(
  "/",
  authetication,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBook
);
bookRouter.patch(
  "/:bookId",
  authetication,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  updateBook
);

bookRouter.get("/", listBooks);
