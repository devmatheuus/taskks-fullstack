import {
    ICreateTaskRequest,
    IUpdateTaskRequest
} from '../../../interfaces/task/index';

export const createTask: ICreateTaskRequest = {
    description: 'Lavar a louça',
    deadline: '5/12/2025'
};

export const updateTask: IUpdateTaskRequest = {
    is_finished: true,
    description: 'description PATCH'
};

export const invalidDescription = {
    description: [true],
    deadline: '5/12/2025'
};

export const invalidDeadline: IUpdateTaskRequest = {
    description: 'invalidDeadline@email.com',
    deadline: '32/13/202'
};

export const updateDescription: IUpdateTaskRequest = {
    description: 'Description updated!'
};

export const lateTask: IUpdateTaskRequest = {
    description: 'IS LATE',
    deadline: '25/10/2022'
};

export const istNotLate: IUpdateTaskRequest = {
    description: 'ITS NOT LATE',
    deadline: '20/10/2025'
};

export const invalidFieldToUpdate = {
    id: 'otherId',
    finished_in: '29/10/2022',
    created_at: 'otherDate'
};
