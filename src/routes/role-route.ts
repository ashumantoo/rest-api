import { Router } from "express";
import { createRole, deleteRole, getRole, getRoles, updateRole } from "../controllers/role-controller";

const RoleRouter = Router();

RoleRouter.post('/roles', createRole);
RoleRouter.get('/roles', getRoles);
RoleRouter.get('/roles/:id', getRole);
RoleRouter.put('/roles/:id', updateRole);
RoleRouter.delete('/roles/:id', deleteRole);

export default RoleRouter;