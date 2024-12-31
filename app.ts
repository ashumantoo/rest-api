import express, { Request, Response, NextFunction } from 'express';
import env from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import UserRouter from './src/routes/user-route';
import RoleRouter from './src/routes/role-route';
import AuthRouter from './src/routes/auth-route';
import TaskRouter from './src/routes/task-route';
import BookRouter from './src/routes/book-route';

const app = express();

//environment variable/constant
env.config();

//Database connection
mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.1gkcp.mongodb.net/data-lake?retryWrites=true&w=majority`
).then(() => {
  console.log("Connected to database")
})
  .catch((err: any) => {
    console.log(err);
  });

//Cors, request url parsing and morgan middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: true,
  // origin: ['http://localhost:4200'],
  credentials: true
}));
app.use(morgan('combined'));
app.use(cookieParser());

//routes
app.use('/api', RoleRouter);
app.use('/api', AuthRouter);
app.use('/api', UserRouter);
app.use('/api', TaskRouter);
app.use('/api', BookRouter);

//error handler at the app level
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500);
  res.json({
    message: err.message,
    error: err,
    stack: err.stack
  });
});

export default app;