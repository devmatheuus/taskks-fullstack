import { Dispatch, SetStateAction } from 'react';
import { IListTasksResponse } from '../index';

export interface IAdminProvier {
    allDatasTask: IListTasksResponse;
    setAllDatasTask: Dispatch<SetStateAction<IListTasksResponse>>;

    loadTasksDatas: (token: string, late?: boolean) => void;
    next: () => void;
    prev: () => void;

    currentPage: string | null;
}
