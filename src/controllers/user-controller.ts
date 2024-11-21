import { NextFunction, Request, Response } from "express";
import User from '../models/user-model';
import { Types } from "mongoose";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      status: 200,
      data: users
    })
  } catch (error) {
    next(error);
  }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    if (!Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user Id");
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "User not found"
      });
    }
    return res.status(200).json({
      success: true,
      status: 201,
      data: user
    });
  } catch (error) {
    next(error);
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    if (!Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user Id");
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "User not found"
      });
    }
    await User.findByIdAndUpdate(userId, req.body);
    const updatedUser = await User.findById(userId);
    return res.status(200).json({
      success: true,
      status: 200,
      data: updatedUser
    })
  } catch (error) {
    next(error);
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    if (!Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user Id");
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "User not found"
      });
    }
    await User.findByIdAndDelete(userId);
    res.status(200).json({
      success: true,
      status: 200,
      message: "User deleted successfully"
    });
  } catch (error) {
    next(error);
  }
}