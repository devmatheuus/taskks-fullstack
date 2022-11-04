import { validateAccountCreate } from '../middlewares/validators/account/validateCreateAccount.middleware';
import { createAccountSchema } from '../middlewares/validators/account/validateCreateAccount.middleware';

import createAccountController from '../controllers/account/createAccount.controller';

import { Router } from 'express';

const routes = Router();

export const accountRoutes = () => {
    routes.post(
        '',
        validateAccountCreate(createAccountSchema),
        createAccountController
    );

    return routes;
};
