import { validateLogin } from '../middlewares/validators/session/validateLogin.middleware';
import { loginSchema } from '../middlewares/validators/session/validateLogin.middleware';

import sessionLoginController from '../controllers/session/sessionLogin.controller';

import { Router } from 'express';

const routes = Router();

export const sessionsRoutes = () => {
    routes.post('', validateLogin(loginSchema), sessionLoginController);

    return routes;
};
