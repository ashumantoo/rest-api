import { Request, Response, NextFunction } from 'express';
import { Task } from '../models/task-model';
import { Types } from 'mongoose';

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json({ success: true, task: newTask });
  } catch (error) {
    next(error);
  }
}

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ success: true, tasks })
  } catch (error) {
    next(error);
  }
}

export const getTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskId = req.params.taskId;
    if (!Types.ObjectId.isValid(taskId)) {
      throw new Error("Invalid task Id");
    }
    const task = await Task.findById(taskId);
    res.status(200).json({ success: true, task })
  } catch (error) {
    next(error);
  }
}

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskId = req.params.taskId;
    if (!Types.ObjectId.isValid(taskId)) {
      throw new Error("Invalid task Id");
    }
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId },
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, task: updatedTask })
  } catch (error) {
    next(error);
  }
}

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskId = req.params.taskId;
    if (!Types.ObjectId.isValid(taskId)) {
      throw new Error("Invalid task Id");
    }
    await Task.findByIdAndDelete(taskId);
    res.status(200).json({ success: true, message: "Task has been deleted" })
  } catch (error) {
    next(error);
  }
}