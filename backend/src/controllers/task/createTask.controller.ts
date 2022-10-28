import { Request, Response } from 'express';
import { ICreateTaskRequest, ICreateTaskResponse } from '../../interfaces/task';
import createTaskService from '../../services/tasks/createTask.service';

const createTaskController = async (request: Request, response: Response) => {
    const { id } = request.accountData;
    const { deadline, description }: ICreateTaskRequest = request.taskData;

    const task: ICreateTaskResponse = await createTaskService(id, {
        deadline,
        description
    });

    return response.status(201).json({
        message: 'Task created successfully.',
        task: task
    });
};

export default createTaskController;
