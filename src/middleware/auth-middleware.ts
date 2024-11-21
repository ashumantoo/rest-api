import { NextFunction, Request, Response } from "express";
import JWT from 'jsonwebtoken';

export interface IRequest extends Request {
  user?: {
    _id: string;
    isAdmin: boolean;
    roles: any[];
  }
}

export const requiresSignIn = (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }
    const user: any = JWT.verify(accessToken, process.env.JWT_SECRET || "supersecret");
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Access token is invalid"
      });
    }
    req.user = {
      _id: user.userId,
      isAdmin: user.isAdmin,
      roles: user.roles
    };
    next();
  } catch (error) {
    next(error);
  }
}

export const isAdmin = async (req: IRequest, res: Response, next: NextFunction) => {
  if (req.user?.isAdmin) {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "You are not authorized"
    });
  }
}

export const isUser = async (req: IRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user._id === req.params.id || req.user?.isAdmin) {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "You are not authorized"
    });
  }
}
