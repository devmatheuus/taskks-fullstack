import { IUpdateTask, ITaskResponse } from '../interfaces/tasks/index';
import verifyDeadlineIsValid from './verifyDeadlineIsValid';

const getDefaultTaskDescription = (
    task: IUpdateTask,
    taskReference: ITaskResponse
) => {
    const description = task.description || taskReference.description;

    return description;
};

const getDefaultTaskDeadline = (task: IUpdateTask) => {
    if (task.deadline) {
        verifyDeadlineIsValid(task.deadline);

        return task.deadline;
    }
};

const getDefaultTaskValues = (
    task: IUpdateTask,
    currentTaskId: string,
    tasks: ITaskResponse[]
) => {
    const defaultValue = tasks.find(task => task.id === currentTaskId);

    const description = getDefaultTaskDescription(task, defaultValue!);

    const deadline = getDefaultTaskDeadline(task);

    const taskData = {
        description,
        deadline: deadline || defaultValue!.deadline
    };

    return taskData;
};

export default getDefaultTaskValues;
