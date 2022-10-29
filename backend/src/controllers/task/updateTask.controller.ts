import { Request, Response } from 'express';
import { IUpdateTaskRequest } from '../../interfaces/task/index';
import updateTaskService from '../../services/tasks/updateTask.service';

const updateTaskController = async (request: Request, response: Response) => {
    const { task_id } = request.params;
    const { deadline, description, is_finished }: IUpdateTaskRequest =
        request.taskUpdatedData;

    await updateTaskService(task_id, {
        deadline,
        description,
        is_finished
    });

    return response.status(200).json({
        message: 'Task updated successfully.'
    });
};

export default updateTaskController;
