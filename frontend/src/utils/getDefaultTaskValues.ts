import { IUpdateTask, ITaskResponse } from '../interfaces/tasks/index';
import verifyDeadlineIsValid from './verifyDeadlineIsValid';

const getDefaultTaskValues = (
    task: IUpdateTask,
    currentTaskId: string,
    tasks: ITaskResponse[]
) => {
    const defaultValue = tasks.find(task => task.id === currentTaskId);

    const taskData: IUpdateTask = {
        description: task.description || defaultValue!.description
    };

    if (task.deadline) {
        const deadlineIsValid = verifyDeadlineIsValid(task.deadline);

        if (deadlineIsValid) {
            taskData.deadline = task.deadline;

            return taskData;
        } else {
            taskData.deadline = defaultValue!.deadline;

            return taskData;
        }
    }

    taskData.deadline = defaultValue!.deadline;

    return taskData;
};

export default getDefaultTaskValues;
