import { Router } from "express";
import { validate } from "../middleware/validate-schema";
import { userSigninSchema, userSignupSchema } from "../validations/user-validation";
import { forgetPassword, resetPassword, signin, signup } from "../controllers/auth-controller";

const AuthRouter = Router();

AuthRouter.post('/user/signup', validate(userSignupSchema), signup);
AuthRouter.post('/user/signin', validate(userSigninSchema), signin);
AuthRouter.post('/user/forget-password', forgetPassword);
AuthRouter.post('/user/reset-password', resetPassword)

export default AuthRouter;