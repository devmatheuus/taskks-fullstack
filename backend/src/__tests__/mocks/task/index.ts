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

export const invalidDescription = {
    description: [true],
    deadline: '5/12/2020'
};

export const invalidDeadline: IUpdateTaskRequest = {
    description: 'invalidDeadline@email.com',
    deadline: '32/13/202'
};

export const updateDescription: IUpdateTaskRequest = {
    description: 'Description updated!'
};

export const lateTask: IUpdateTaskRequest = {
    deadline: '25/10/2022'
};
