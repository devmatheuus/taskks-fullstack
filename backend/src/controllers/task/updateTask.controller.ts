import { Request, Response } from 'express';
import { ICreateTaskResponse } from '../../interfaces/task';
import { IUpdateTaskRequest } from '../../interfaces/task/index';
import updateTaskService from '../../services/tasks/updateTask.service';

const updateTaskController = async (request: Request, response: Response) => {
    const { task_id } = request.params;
    const { deadline, description, is_finished }: IUpdateTaskRequest =
        request.taskUpdatedData;

    const task = await updateTaskService(task_id, {
        deadline,
        description,
        is_finished
    });

    return response.status(201).json({
        message: 'Task updated successfully.',
        task: task
    });
};

export default updateTaskController;
