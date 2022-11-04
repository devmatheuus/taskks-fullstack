import AppDataSource from '../data-source';

import { Task } from '../entities/task.entity';
import { Account } from '../entities/account.entity';

import { AppError } from '../errors/AppError';
import getDateInNumber from './getDateInNumber';

const tasksAreLate = async (account_id: string) => {
    const today = new Date().getTime();

    const taskRepository = AppDataSource.getRepository(Task);
    const tasks = await taskRepository.find({ relations: { account: true } });

    const accountRepository = AppDataSource.getRepository(Account);
    const account = await accountRepository.findOneBy({ id: account_id });

    if (!account) {
        throw new AppError(404, 'Account not found');
    }

    tasks.map(async task => {
        const timeTaskDeadline = getDateInNumber(task.deadline);

        const isLate = today > timeTaskDeadline;
        const itsNotLate = timeTaskDeadline >= today;

        if (isLate && task.is_late === false) {
            task.is_late = true;
        } else if (itsNotLate && task.is_late === true) {
            task.is_late = false;
        }
    });

    if (account.is_admin === true) {
        return tasks;
    }

    const ownerTasks = tasks.filter(task => task.account.id === account_id);

    return ownerTasks;
};

export default tasksAreLate;
