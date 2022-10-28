import { Account } from '../../entities/account.entity';

export interface ICreateTaskRequest {
    description: string;
    deadline: string;
}

export interface IUpdateTaskRequest {
    description?: string;
    deadline?: string;
    is_finished?: boolean;
}

export interface ICreateTaskResponse {
    id: string;
    is_late: boolean;
    is_finished: boolean;
    finished_in: Date;
    deadline: string;
    created_at: Date;
    updated_at: Date;
    account: Account;
}
