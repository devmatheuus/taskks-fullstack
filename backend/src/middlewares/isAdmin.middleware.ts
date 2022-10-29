import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

const isAdminMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const isAdmin = request.accountData.is_admin;
    console.log(request.accountData);
    if (!isAdmin) throw new AppError(401, 'Unauthorized');

    next();
};

export default isAdminMiddleware;
