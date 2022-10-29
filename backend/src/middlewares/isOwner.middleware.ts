import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import AppDataSource from '../data-source';
import { Task } from '../entities/task.entity';

const isOwner = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const { task_id } = request.params;
    const { id } = request.accountData;

    const taskRepository = AppDataSource.getRepository(Task);

    const task = await taskRepository.findOne({
        where: { id: task_id },
        relations: { account: true }
    });

    if (!task) {
        throw new AppError(400, 'Task not found.');
    }

    if (task.account.id !== id) {
        throw new AppError(401, 'Unauthorized.');
    }

    next();
};

export default isOwner;
