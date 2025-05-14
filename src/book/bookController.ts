import express, { NextFunction, Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import path from "node:path";
import createHttpError from "http-errors";
import bookModel from "./bookModel";
import fs from "node:fs";

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("files", req.files);
  const { title, genre } = req.body;

  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
    const filename = files.coverImage[0].filename;

    const filePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      filename
    );

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: filename,
      folder: "book-covers",
      format: coverImageMimeType,
    });

    const bookFileName = files.file[0].filename;
    const bookFilePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      bookFileName
    );

    const bookUploadResult = await cloudinary.uploader.upload(bookFilePath, {
      resource_type: "raw",
      filename_override: bookFileName,
      folder: "book-pdfs",
      format: "pdf",
    });
    console.log("bookUploadResult", bookUploadResult);
    console.log("uploadResult", uploadResult);

    const newBook = await bookModel.create({
      title,
      genre,
      author: "682344cdd1599c9605b94f93",
      coverImage: uploadResult.secure_url,
      file: bookUploadResult.secure_url,
    });

    await fs.promises.unlink(filePath);
    await fs.promises.unlink(bookFilePath);

    res
      .status(201)
      .json({ message: "Book uploaded Successfully", data: newBook });
  } catch (error) {
    console.log(error);
    return next(createHttpError("500", "Error while uploading files"));
  }
};
