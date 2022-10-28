import * as yup from 'yup';
import { ISessionRequest } from '../../../interfaces/sessions/';
import { AppError } from '../../../errors/AppError';
import { Request, Response, NextFunction } from 'express';

export const loginSchema: yup.SchemaOf<ISessionRequest> = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
});

export const validateLogin =
    (schema: yup.SchemaOf<ISessionRequest>) =>
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const data = request.body;

            try {
                const validatedData = await schema.validate(data, {
                    abortEarly: false,
                    stripUnknown: true
                });

                request.loginData = validatedData;

                next();
            } catch (error: any) {
                throw new AppError(400, error.errors?.join(', '));
            }
        } catch (error: any) {
            const { statusCode, message } = error;

            throw new AppError(statusCode, message);
        }
    };
