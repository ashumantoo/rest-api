import exporess from 'express';
import { createTask, deleteTask, getTask, getTasks, updateTask } from '../controllers/task-controller';
import { validate } from '../middleware/validate-schema';
import { taskInputSchema } from '../validations/task-validation';

const TaskRouter = exporess.Router();

TaskRouter.post('/task', validate(taskInputSchema), createTask);
TaskRouter.get('/task', getTasks);
TaskRouter.get('/task/:taskId', getTask);
TaskRouter.put('/task/:taskId', validate(taskInputSchema), updateTask);
TaskRouter.delete('/task/:taskId', deleteTask);

export default TaskRouter;