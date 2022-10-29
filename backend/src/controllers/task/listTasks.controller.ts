import { Request, Response } from 'express';
import listTaskService from '../../services/tasks/listTasks.service';

const listTaskController = async (request: Request, response: Response) => {
    const { id } = request.accountData;

    const tasks = await listTaskService(id);

    return response.json({ tasks });
};

export default listTaskController;
