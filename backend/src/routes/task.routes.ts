import { validateTask } from '../middlewares/validators/task/validateCreateTask.middleware';
import { createTaskSchema } from '../middlewares/validators/task/validateCreateTask.middleware';
import { validateUpdateTask } from '../middlewares/validators/task/validateUpdateTask.middleware';
import { updateTaskSchema } from '../middlewares/validators/task/validateUpdateTask.middleware';

import { Router } from 'express';

import authTokenMiddleware from '../middlewares/authToken.middleware';
import createTaskController from '../controllers/task/createTask.controller';
import updateTaskController from '../controllers/task/updateTask.controller';
import isOwnerOrAdmin from '../middlewares/isOwnerOrAdmin.middleware';

const routes = Router();

export const taskRoutes = () => {
    routes.post(
        '',
        authTokenMiddleware,
        validateTask(createTaskSchema),
        createTaskController
    );

    routes.patch(
        '/:task_id',
        authTokenMiddleware,
        isOwnerOrAdmin,
        validateUpdateTask(updateTaskSchema),
        updateTaskController
    );

    return routes;
};
