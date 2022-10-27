import { validateAccountCreate } from '../middlewares/validators/account/validateCreateAccount.middleware';
import { createAccountSchema } from '../middlewares/validators/account/validateCreateAccount.middleware';
import { Router } from 'express';
import createAccountController from '../controllers/account/createAccount.controller';

const routes = Router();

export const accountRoutes = () => {
    routes.post(
        '',
        validateAccountCreate(createAccountSchema),
        createAccountController
    );

    return routes;
};
