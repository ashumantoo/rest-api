import { Router } from "express";
import { createStudent, deleteStudent, getStudent, getStudents, updateStudent } from "../controllers/student-controller";

const StudentRouter = Router();

StudentRouter.post('/student', createStudent);
StudentRouter.get('/student', getStudents);
StudentRouter.get('/student/:id', getStudent);
StudentRouter.put('/student/:id', updateStudent);
StudentRouter.delete('/student/:id', deleteStudent);

export default StudentRouter;