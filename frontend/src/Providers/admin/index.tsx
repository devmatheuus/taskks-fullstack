import {
    createContext,
    useContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction
} from 'react';

import { toast } from 'react-toastify';

import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import { IListTasksResponse, ITasksDatas } from '../../interfaces/admin/index';
import {
    ICreateTask,
    ITaskResponse,
    IUpdateTask
} from '../../interfaces/tasks/index';

interface IAdminProps {
    children: ReactNode;
}

interface IAdminProvier {
    tasksData: ITasksDatas[];
    setTasksDatas: Dispatch<SetStateAction<ITasksDatas[]>>;

    allDatasTask: IListTasksResponse[];
    setAllDatasTask: Dispatch<SetStateAction<IListTasksResponse[]>>;

    loadTasksDatas: (token: string) => void;
}

const AdminContext = createContext<IAdminProvier>({} as IAdminProvier);

export const UseAdmin = () => {
    const context = useContext(AdminContext);

    return context;
};

export const AdminProvider = ({ children }: IAdminProps) => {
    const history = useHistory();

    const [tasksData, setTasksDatas] = useState(Array<ITasksDatas>);
    const [allDatasTask, setAllDatasTask] = useState(Array<IListTasksResponse>);

    const loadTasksDatas = (token: string) => {
        toast.loading('Carregando informações');
        api.get('/tasks/admin', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                toast.dismiss();
                setAllDatasTask(response.data.tasks);
                setTasksDatas(response.data.tasks.tasks);
            })
            .catch(() => {
                toast.dismiss();
                toast.error(
                    'Erro ao carregar informações, faça login novamente'
                );
                history.push('/');
            });
    };

    return (
        <AdminContext.Provider
            value={{
                loadTasksDatas,
                setTasksDatas,
                tasksData,
                allDatasTask,
                setAllDatasTask
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};
