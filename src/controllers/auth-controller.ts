import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import nodeMailer from 'nodemailer';
import Role from "../models/role-model";
import User from "../models/user-model";
import UserToken from "../models/user-token";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = await Role.findOne({ role: 'User' });
    if (!role) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Role not found"
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      roles: role,
      mobile: "",
      gender: "",
      dob: "",
      address: {
        street: "",
        city: "",
        state: "",
        country: "",
        zipcode: ""
      },
      profession: "",
    });
    await newUser.save();
    return res.status(201).json({
      success: true,
      status: 201,
      message: "Registration completed successfully"
    });
  } catch (error) {
    next(error);
  }
}

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ email: req.body.email }).populate('roles', 'role'); //roles = field of User model which refer to Role model, role = field name in roles collection
    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "User with this email not found"
      });
    }
    const { _id, firstName, lastName, email, isAdmin, roles } = user;
    const isPasswordMatched = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordMatched) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Incorrect password"
      });
    }
    const accessToken = JWT.sign({
      userId: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      roles
    },
      process.env.JWT_SECRET || "supersecret",
      { expiresIn: '1d' }
    );
    //To get the normal object as per defined model and to use the rest operator
    // const { password, ...rest } = user.toObject();

    //setting access_token in response cookies instead of sending it into the response object
    res.cookie('access_token', accessToken, { httpOnly: true });

    return res.status(200).json({
      success: true,
      status: 200,
      data: {
        _id,
        firstName,
        lastName,
        email,
        isAdmin,
        roles
      }
    })
  } catch (error) {
    next(error);
  }
}

export const forgetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: { $regex: '^' + email + '$', $options: 'i' } });
    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "User with this email not found"
      });
    }
    const payload = {
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }
    const expiryTime = 300; //5mis
    const token = JWT.sign(payload, process.env.JWT_SECRET || "supersecret", { expiresIn: expiryTime });
    const newUserToken = new UserToken({
      userId: user._id,
      token
    });

    const mailTransporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: "ashumantoo@gmail.com",
        pass: "gahojrkqkcfwdcdd"
      }
    });

    let mailDetails = {
      from: 'ashumantoo@gmail.com',
      to: email,
      subject: 'Reset Password',
      html: `
      <html>
        <head>
          <title>Password Reset Request</title>
        </head>
        <body>
          <p>Dear ${user.firstName},</p>
          <p>We have received a request to reset your password for your account with BookMyBook. To complete the password reset
            process, pleaes click on the button below.</p>
          <a href=${process.env.APP_LIVE_URL}/reset/${token}>
            <button
              style="background: #4caf50;color: white;padding: 14px 20px;border: none;cursor: pointer;border-radius: 4px;">Reset
              Password</button>
          </a>
          <p>Please note that this link is only valid for a 5 mins. If you did not request a password reset. Please disregard
            this message.</p>
          <p>Thank you!</p>
        </body>
      </html>
      `
    }
    mailTransporter.sendMail(mailDetails, async (err, data) => {
      if (err) {
        return next(err);
      } else {
        await newUserToken.save();
        return res.status(200).json({
          success: true,
          status: 200,
          message: "Email sent successfully"
        })
      }
    })
  } catch (error) {
    next(error);
  }
}

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.body.token;
    const newPassword = req.body.password;

    const JWTPayload: any = JWT.verify(token, process.env.JWT_SECRET || "supersecret");
    if (!JWTPayload) {
      return res.status(500).json({
        success: false,
        status: 500,
        message: "Reset link is expired or token is invalid"
      });
    }
    const user = await User.findOne({ email: { $regex: '^' + JWTPayload.email + '$', $options: 'i' } });
    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "User with this email not found"
      });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    await User.findOneAndUpdate(
      { _id: user._id },
      { $set: user },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Password reset success!"
    })
  } catch (error) {
    next(error);
  }
}