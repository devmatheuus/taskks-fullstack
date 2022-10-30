import * as yup from 'yup';
import { IUpdateTaskRequest } from '../../../interfaces/task';
import { AppError } from '../../../errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { dateValidation } from '../../../utils/dateRegexValidation';

export const updateTaskSchema: yup.SchemaOf<IUpdateTaskRequest> = yup
    .object()
    .shape({
        description: yup.string().min(5),
        deadline: yup
            .string()
            .matches(
                dateValidation,
                'The date must follow the following format: dd/MM/yyyy'
            ),
        is_finished: yup.boolean()
    });

export const validateUpdateTask =
    (schema: yup.SchemaOf<IUpdateTaskRequest>) =>
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const data = request.body;

            try {
                const validatedData = await schema.validate(data, {
                    abortEarly: false,
                    stripUnknown: true
                });

                request.taskUpdatedData = validatedData;

                next();
            } catch (error: any) {
                throw new AppError(400, error.errors?.join(', '));
            }
        } catch (error: any) {
            const { statusCode, message } = error;

            throw new AppError(statusCode, message);
        }
    };
