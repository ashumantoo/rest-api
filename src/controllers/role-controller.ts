import { Request, Response, NextFunction } from "express";
import Role from "../models/role-model";
import { Types } from "mongoose";

export const createRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.role) {
      const newRole = new Role(req.body);
      await newRole.save();
      res.status(201).json({
        success: true,
        status: 201,
        message: "New role created.",
        data: newRole
      });
    } else {
      res.status(400).json({
        success: false,
        status: 400,
        message: "Bad request"
      });
    }
  } catch (error) {
    next(error);
  }
}

export const getRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roles = await Role.find();
    return res.status(200).json({
      sucess: true,
      status: 200,
      data: roles
    });
  } catch (error) {
    next(error);
  }
}

export const getRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roleId = req.params.id;
    if (!Types.ObjectId.isValid(roleId)) {
      throw new Error("Invalid role Id");
    }
    const role = await Role.findById(roleId);
    if (!role) {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Role not found"
      });
    }
    return res.status(200).json({
      sucess: true,
      status: 200,
      data: role
    });
  } catch (error) {
    next(error);
  }
}

export const updateRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roleId = req.params.id;
    if (!Types.ObjectId.isValid(roleId)) {
      throw new Error("Invalid role Id");
    }
    const role = await Role.findById(roleId);
    if (!role) {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Role not found"
      });
    }
    const updatedRole = await Role.findByIdAndUpdate(
      roleId,
      { $set: req.body },
      { new: true }
    );
    return res.json({
      success: true,
      status: 200,
      data: updatedRole
    })
  } catch (error) {
    next(error);
  }
}

export const deleteRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roleId = req.params.id;
    if (!Types.ObjectId.isValid(roleId)) {
      throw new Error("Invalid role Id");
    }
    const role = await Role.findById(roleId);
    if (!role) {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Role not found"
      });
    }
    await Role.findByIdAndDelete(roleId);
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Role deleted successfully."
    })
  } catch (error) {
    next(error);
  }
}