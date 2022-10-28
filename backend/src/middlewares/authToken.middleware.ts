import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

import jwt from 'jsonwebtoken';

const authTokenMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) throw new AppError(401, 'Missing authorization!');

    jwt.verify(
        token as string,
        process.env.SECRET_KEY as string,
        (error: any, decoded: any) => {
            if (error) throw new AppError(401, 'Invalid token');

            request.accountData = {
                id: decoded.sub,
                is_admin: decoded.isAdm
            };
            next();
        }
    );
};

export default authTokenMiddleware;
