interface IAccountResponse {
    id: string;
    email: string;
    password: string;
    is_admin: boolean;
}

export interface ITaskResponse {
    id: string;
    description: string;
    is_late: boolean;
    is_finished: boolean;
    finished_in: Date | null;
    deadline: string;
    created_at: Date;
    updated_at: Date;
    account: IAccountResponse;
}

export interface ICreateTask {
    description: string;
    deadline: string;
}

export interface IUpdateTask {
    description?: string;
    deadline?: string;
}

export interface IFinishTask {
    is_finished: boolean;
}

export interface IRenderAdminTasks {
    task: {
        email: string;
        description: string;
        deadline: string;
    };
}

export interface IRenderUserTasks {
    task: {
        description: string;
        created_at: Date;
        deadline: string;
        id: string;
        is_finished: boolean;
    };
}
