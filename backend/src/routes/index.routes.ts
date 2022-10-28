import { Express } from 'express';
import { accountRoutes } from './account.routes';
import { sessionsRoutes } from './sessions.routes';
import { taskRoutes } from './task.routes';

export const appRoutes = (app: Express) => {
    app.use('/accounts', accountRoutes());
    app.use('/login', sessionsRoutes());
    app.use('/tasks', taskRoutes());
};
