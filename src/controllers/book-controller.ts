import { Request, Response, NextFunction } from "express";
import Book from "../models/book.model";
import { Types } from "mongoose";

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    return res.status(201).json({
      success: true,
      status: 201,
      message: "Book created successfully",
      data: newBook
    });
  } catch (error) {
    next(error);
  }
}

export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await Book.find();
    return res.status(200).json({
      success: true,
      status: 200,
      data: books
    });
  } catch (error) {
    next(error);
  }
}

export const getBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.id;
    if (!Types.ObjectId.isValid(bookId)) {
      throw new Error("Invalid book Id");
    }
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Book not found"
      });
    }
    return res.status(200).json({
      success: true,
      status: 200,
      data: book
    });
  } catch (error) {
    next(error);
  }
}

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.id;
    if (!Types.ObjectId.isValid(bookId)) {
      throw new Error("Invalid book Id");
    }
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Book not found"
      });
    }
    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, { new: true });
    return res.status(200).json({
      success: true,
      status: 200,
      data: updatedBook
    });
  } catch (error) {
    next(error);
  }
}

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.id;
    if (!Types.ObjectId.isValid(bookId)) {
      throw new Error("Invalid book Id");
    }
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Book not found"
      });
    }
    await Book.findByIdAndDelete(bookId);
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Book deleted successfully"
    });
  } catch (error) {
    next(error);
  }
}