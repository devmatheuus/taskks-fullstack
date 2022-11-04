import { Dispatch, SetStateAction } from 'react';

import { ITaskResponse } from '../tasks';
import { ICreateTask, IUpdateTask } from '../tasks/index';

export interface IDashProvider {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;

    showModalUpdate: boolean;
    setShowModalUpdate: Dispatch<SetStateAction<boolean>>;

    showModalFinishTask: boolean;
    setShowModalFinishTask: Dispatch<SetStateAction<boolean>>;

    tasks: ITaskResponse[];

    currentTaskId: string;
    setCurrentTaskId: Dispatch<SetStateAction<string>>;

    loadTasks: (token: string) => void;
    createTask: (task: ICreateTask, token: string) => void;
    updateTask: (task: IUpdateTask, token: string, taskId: string) => void;
    finishTask: (isFinished: boolean, token: string, taskId: string) => void;
}
