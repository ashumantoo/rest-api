import { Router } from "express";
import { createBook, deleteBook, getBook, getBooks, updateBook } from "../controllers/book-controller";
import { requiresSignIn } from "../middleware/auth-middleware";

const BookRouter = Router();

BookRouter.post('/book', createBook);
BookRouter.get('/book', requiresSignIn, getBooks);
BookRouter.get('/book/:id', getBook);
BookRouter.put('/book/:id', updateBook);
BookRouter.delete('/book/:id', deleteBook);

export default BookRouter;