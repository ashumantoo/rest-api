import { Router } from "express";
import { validate } from "../middleware/validate-schema";
import { userInputSchema } from "../validations/user-validation";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user-controller";
import { isAdmin, isUser, requiresSignIn } from "../middleware/auth-middleware";

export const UserRouter = Router();

UserRouter.get('/user', requiresSignIn, isAdmin, getUsers);
UserRouter.get('/user/:id', requiresSignIn, isUser, getUser);
UserRouter.put('/user/:id', requiresSignIn, isUser, validate(userInputSchema), updateUser);
UserRouter.delete('/user/:id', requiresSignIn, isAdmin, deleteUser)

export default UserRouter;