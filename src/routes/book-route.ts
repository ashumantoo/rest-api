import { Router } from "express";
import { createBook, deleteBook, getBook, getBooks, updateBook } from "../controllers/book-controller";
import { isAdmin, requiresSignIn } from "../middleware/auth-middleware";

const BookRouter = Router();

BookRouter.post('/book', requiresSignIn, isAdmin, createBook);
BookRouter.get('/book', requiresSignIn, getBooks);
BookRouter.get('/book/:id', requiresSignIn, getBook);
BookRouter.put('/book/:id', requiresSignIn, isAdmin, updateBook);
BookRouter.delete('/book/:id', requiresSignIn, isAdmin, deleteBook);

export default BookRouter;