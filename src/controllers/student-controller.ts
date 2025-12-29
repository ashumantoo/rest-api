import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import Student from "../models/student.model";

export const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    return res.status(201).json({
      success: true,
      status: 201,
      message: "Student created successfully",
      data: newStudent
    });
  } catch (error) {
    next(error);
  }
}

export const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const students = await Student.find();
    return res.status(200).json({
      success: true,
      status: 200,
      data: students
    });
  } catch (error) {
    next(error);
  }
}

export const getStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentId = req.params.id;
    if (!Types.ObjectId.isValid(studentId)) {
      throw new Error("Invalid student Id");
    }
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "student not found"
      });
    }
    return res.status(200).json({
      success: true,
      status: 200,
      data: student
    });
  } catch (error) {
    next(error);
  }
}

export const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentId = req.params.id;
    if (!Types.ObjectId.isValid(studentId)) {
      throw new Error("Invalid student Id");
    }
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Student not found"
      });
    }
    const updatedStudent = await Student.findByIdAndUpdate(studentId, req.body, { new: true });
    return res.status(200).json({
      success: true,
      status: 200,
      data: updatedStudent
    });
  } catch (error) {
    next(error);
  }
}

export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentId = req.params.id;
    if (!Types.ObjectId.isValid(studentId)) {
      throw new Error("Invalid book Id");
    }
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Student not found"
      });
    }
    await Student.findByIdAndDelete(studentId);
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Student deleted successfully"
    });
  } catch (error) {
    next(error);
  }
}