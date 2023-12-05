import express, { Request, Response, NextFunction } from 'express';
import env from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
import taskRouter from './src/routes/task-route';

const app = express();

//environment variable/constant
env.config();

//Database connection
mongoose.connect(
  process.env.MONGODB_URI || ""
).then(() => {
  console.info("Database connected successfully")
})
  .catch((err: any) => {
    console.error(err);
  });

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/api', taskRouter);

//error handler at the app level
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500);
  res.json({
    message: err.message,
    error: err
  });
});

export default app;