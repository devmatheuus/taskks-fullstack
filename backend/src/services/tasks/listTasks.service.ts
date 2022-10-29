import tasksAreLate from '../../../../utils/tasksAreLate';

const listTaskService = async (account_id: string) => {
    const tasks = await tasksAreLate(account_id);

    return tasks;
};

export default listTaskService;
