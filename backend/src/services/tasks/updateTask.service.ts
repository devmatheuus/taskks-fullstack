import AppDataSource from '../../data-source';
import { Task } from '../../entities/task.entity';
import { AppError } from '../../errors/AppError';
import { IUpdateTaskRequest } from '../../interfaces/task';

const updateTaskService = async (
    task_id: string,
    { deadline, description, is_finished }: IUpdateTaskRequest
) => {
    const today = new Date().getTime();

    const taskRepository = AppDataSource.getRepository(Task);

    const task = await taskRepository.findOne({
        where: { id: task_id },
        relations: { account: true }
    });

    if (!task) throw new AppError(400, 'Task not found.');

    if (task.is_finished) {
        throw new AppError(400, 'This task has already been completed.');
    }
    const formateDeadline = task.deadline.split('/');

    const day = formateDeadline[0];
    const month = formateDeadline[1];
    const year = formateDeadline[2];

    const timeTaskDeadline = new Date(+year, +month - 1, +day).getTime();

    const isLate = today > timeTaskDeadline;
    const itsNotLate = timeTaskDeadline >= today;

    if (isLate && task.is_late === false) {
        task.is_late = true;
    } else if (itsNotLate && task.is_late === true) {
        task.is_late = false;
    }

    let taskToUpdate;
    if (is_finished === true) {
        taskToUpdate = taskRepository.create({
            description: description || task.description,
            deadline: deadline || task.deadline,
            is_late: task.is_late,
            is_finished: is_finished,
            finished_in: new Date(),
            created_at: task.created_at,
            updated_at: new Date()
        });
    } else {
        taskToUpdate = taskRepository.create({
            description: description || task.description,
            deadline: deadline || task.deadline,
            is_late: task.is_late,
            is_finished: task.is_finished,
            finished_in: task.finished_in,
            created_at: task.created_at,
            updated_at: new Date()
        });
    }

    await taskRepository.update(task_id, taskToUpdate);

    return true;
};

export default updateTaskService;
