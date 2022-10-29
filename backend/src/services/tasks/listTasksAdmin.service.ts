import AppDataSource from '../../data-source';
import { Task } from '../../entities/task.entity';
import { AppError } from '../../errors/AppError';

const listTasksAdminService = async (page: number, late: string) => {
    const taskRepository = AppDataSource.getRepository(Task);

    const builder = taskRepository
        .createQueryBuilder('tasks')
        .leftJoinAndSelect('tasks.account', 'account');

    if (late) {
        builder.where('tasks.is_late = :late', { late: `${late}` });
    }

    if (late && late !== 'true') {
        throw new AppError(
            400,
            'the value of query param "late" must be equal to true'
        );
    }

    const perPage = 2;
    let nextPage: number | null = page + 1;
    let previousPage: number | null = page - 1;

    const total = await builder.getCount();

    let previous:
        | string
        | null = `http://localhost:3001/tasks?page=${previousPage}`;

    let next: string | null = `http://localhost:3001/tasks?page=${nextPage}`;

    if (previousPage <= 0) {
        previousPage = null;
        previous = null;
    }

    builder.offset((page - 1) * perPage).limit(perPage);
    const tasks = await builder.getMany();

    const taskDatas = tasks.map(task => {
        const data = {
            email: task.account.email,
            description: task.description,
            deadline: task.deadline
        };

        return data;
    });

    if (nextPage >= total || tasks.length === 1) {
        nextPage = null;
        next = null;
    }

    return {
        total,
        page,
        previous,
        next,
        tasks: taskDatas
    };
};

export default listTasksAdminService;
