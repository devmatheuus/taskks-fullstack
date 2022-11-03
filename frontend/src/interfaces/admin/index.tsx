export interface ITasksDatas {
    email: string;
    description: string;
    deadline: string;
}

export interface IListTasksResponse {
    tasks: {
        total: number;
        page: number;
        previous: string | null;
        next: string | null;
        tasks: ITasksDatas[];
    };
}
