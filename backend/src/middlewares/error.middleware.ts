import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

export const errorMiddleware = async (
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            code: error.statusCode,
            message: error.message
        });
    }
    console.error(error);

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
};
