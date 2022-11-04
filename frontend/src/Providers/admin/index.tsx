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
    allDatasTask: IListTasksResponse;
    setAllDatasTask: Dispatch<SetStateAction<IListTasksResponse>>;

    loadTasksDatas: (token: string, late?: boolean) => void;
    filterLastTasks: (token: string) => void;
    next: () => void;
    prev: () => void;
    currentPage: string | null;
}

const AdminContext = createContext<IAdminProvier>({} as IAdminProvier);

export const UseAdmin = () => {
    const context = useContext(AdminContext);

    return context;
};

export const AdminProvider = ({ children }: IAdminProps) => {
    const history = useHistory();

    const [allDatasTask, setAllDatasTask] = useState({} as IListTasksResponse);

    const [currentPage, setCurrentPage] = useState<string>('/tasks/admin');

    const loadTasksDatas = (token: string, late?: boolean) => {
        if (late === true) {
            setCurrentPage('/tasks/admin?late=true');
        }

        if (late === false) {
            setCurrentPage('/tasks/admin');
        }

        toast.loading('Carregando informações');

        api.get(currentPage as string, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                toast.dismiss();
                setAllDatasTask(response.data);
            })
            .catch(() => {
                toast.error(
                    'Erro ao carregar informações, faça login novamente'
                );
                toast.dismiss();
                history.push('/');
            });
    };

    const next = () => {
        setCurrentPage(allDatasTask.tasks.next!);
    };

    const prev = () => {
        setCurrentPage(allDatasTask.tasks.previous!);
    };

    const filterLastTasks = (token: string) => {
        const lastTask = allDatasTask.tasks?.tasks.filter(task => task);
    };

    return (
        <AdminContext.Provider
            value={{
                loadTasksDatas,
                allDatasTask,
                setAllDatasTask,
                next,
                prev,
                currentPage,
                filterLastTasks
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};
