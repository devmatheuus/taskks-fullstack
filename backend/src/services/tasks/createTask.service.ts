import AppDataSource from '../../data-source';
import { Task } from '../../entities/task.entity';
import { Account } from '../../entities/account.entity';
import { AppError } from '../../errors/AppError';
import { ICreateTaskRequest } from '../../interfaces/task';

const createTaskService = async (
    account_id: string,
    { deadline, description }: ICreateTaskRequest
) => {
    const taskRepository = AppDataSource.getRepository(Task);
    const accountRepository = AppDataSource.getRepository(Account);

    const account = await accountRepository.findOneBy({ id: account_id });

    if (!account) throw new AppError(400, 'Account not found.');

    const { password, ...userAccount } = account;

    const task = taskRepository.create({
        account: userAccount,
        description,
        deadline,
        created_at: new Date(),
        updated_at: new Date()
    });

    await taskRepository.save(task);

    return task;
};

export default createTaskService;
