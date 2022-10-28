import AppDataSource from '../../data-source';
import { Task } from '../../entities/task.entity';
import { AppError } from '../../errors/AppError';
import { IUpdateTaskRequest } from '../../interfaces/task';

const updateTaskService = async (
    task_id: string,
    { deadline, description, is_finished }: IUpdateTaskRequest
) => {
    const today = new Date().toLocaleDateString('pt-BR');

    const taskRepository = AppDataSource.getRepository(Task);

    const task = await taskRepository.findOne({
        where: { id: task_id },
        relations: { account: true }
    });

    if (!task) throw new AppError(400, 'Task not found.');

    if (task.is_finished) {
        throw new AppError(400, 'This task has already been completed.');
    }

    if (today > task.deadline) {
        await taskRepository.update(task_id, {
            is_late: true
        });
    }
    console.log(is_finished);
    let taskToUpdate;
    if (is_finished === true) {
        taskToUpdate = taskRepository.create({
            id: task.id,
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
            id: task.id,
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

    // const { account, ...taskWithoutAccount } = task;
    const { password, ...accountWithoutPassword } = task.account;

    const taskUpdated = {
        ...taskToUpdate,
        account: accountWithoutPassword
    };

    return taskUpdated;
};

export default updateTaskService;
