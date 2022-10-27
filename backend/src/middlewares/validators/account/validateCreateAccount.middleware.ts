import * as yup from 'yup';
import { hashSync } from 'bcryptjs';
import { IAccountRequest } from '../../../interfaces/account';
import { AppError } from '../../../errors/AppError';
import { Request, Response, NextFunction } from 'express';

export const createAccountSchema: yup.SchemaOf<IAccountRequest> = yup
    .object()
    .shape({
        email: yup.string().email().required().max(50),
        password: yup.string().required().min(5).max(150)
    });

export const validateAccountCreate =
    (schema: yup.SchemaOf<IAccountRequest>) =>
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const data = request.body;

            try {
                const validatedData = await schema.validate(data, {
                    abortEarly: false,
                    stripUnknown: true
                });

                request.newAccount = validatedData;

                next();
            } catch (error: any) {
                throw new AppError(400, error.errors?.join(', '));
            }
        } catch (error: any) {
            const { statusCode, message } = error;

            throw new AppError(statusCode, message);
        }
    };
