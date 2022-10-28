import { validateTask } from '../middlewares/validators/task/validateCreateTask.middleware';
import { createTaskSchema } from '../middlewares/validators/task/validateCreateTask.middleware';

import { Router } from 'express';
import createTaskController from '../controllers/task/createTask.controller';
import authTokenMiddleware from '../middlewares/authToken.middleware';

const routes = Router();

export const taskRoutes = () => {
    routes.post(
        '',
        authTokenMiddleware,
        validateTask(createTaskSchema),
        createTaskController
    );

    return routes;
};
