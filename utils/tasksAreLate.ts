import AppDataSource from '../backend/src/data-source';
import { Task } from '../backend/src/entities/task.entity';

const tasksAreLate = async (account_id: string) => {
    const today = new Date().getTime();

    const taskRepository = AppDataSource.getRepository(Task);

    const tasks = await taskRepository.find({ relations: { account: true } });

    tasks.map(async task => {
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
    });

    const ownerTasks = tasks.filter(task => task.account.id === account_id);

    return ownerTasks;
};

export default tasksAreLate;
