import exporess from 'express';
import { createTask, deleteTask, getTask, getTasks, updateTask } from '../controllers/task-controller';
import { validate } from '../middleware/validate-schema';
import { taskInputSchema } from '../validations/task-validation';

const taskRouter = exporess.Router();

taskRouter.post('/task', validate(taskInputSchema), createTask);
taskRouter.get('/task', getTasks);
taskRouter.get('/task/:taskId', getTask);
taskRouter.put('/task/:taskId', validate(taskInputSchema), updateTask);
taskRouter.delete('/task/:taskId', deleteTask);

export default taskRouter;