import { Express } from 'express';
import { accountRoutes } from './account.routes';

export const appRoutes = (app: Express) => {
    app.use('/accounts', accountRoutes());
};
