import { validateLogin } from '../middlewares/validators/account/validateLogin.middleware';
import { loginSchema } from '../middlewares/validators/account/validateLogin.middleware';

import { Router } from 'express';
import sessionLoginController from '../controllers/session/sessionLogin.controller';

const routes = Router();

export const sessionsRoutes = () => {
    routes.post('', validateLogin(loginSchema), sessionLoginController);

    return routes;
};
