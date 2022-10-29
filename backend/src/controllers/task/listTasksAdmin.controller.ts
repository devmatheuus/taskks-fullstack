import { Request, Response } from 'express';
import listTasksAdminService from '../../services/tasks/listTasksAdmin.service';

const listTaskAdminController = async (
    request: Request,
    response: Response
) => {
    const late = request.query.late as string;
    const page: number = parseInt(request.query.page as string) || 1;

    const tasks = await listTasksAdminService(page, late);

    response.json({ tasks });
};

export default listTaskAdminController;
