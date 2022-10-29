import AppDataSource from '../backend/src/data-source';
import { Task } from '../backend/src/entities/task.entity';
import { Account } from '../backend/src/entities/account.entity';
import { AppError } from '../backend/src/errors/AppError';

const tasksAreLate = async (account_id: string) => {
    const today = new Date().toLocaleDateString('pt-BR');

    const taskRepository = AppDataSource.getRepository(Task);
    const accountRepository = AppDataSource.getRepository(Account);

    const account = await accountRepository.findOneBy({ id: account_id });

    if (!account) {
        throw new AppError(404, 'Account not found.');
    }

    const tasks = await taskRepository.find({ relations: { account: true } });

    tasks.map(async task => {
        const isLate = today > task.deadline;
        const itsNotLate = task.deadline >= today;

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
