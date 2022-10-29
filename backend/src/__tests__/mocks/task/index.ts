import {
    ICreateTaskRequest,
    IUpdateTaskRequest
} from '../../../interfaces/task/index';

export const createTask: ICreateTaskRequest = {
    description: 'Lavar a louça',
    deadline: '5/12/2020'
};

export const updateTask: IUpdateTaskRequest = {
    is_finished: true,
    description: 'description PATCH'
};
