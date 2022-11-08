import { createContext, useContext, useState, ReactNode } from 'react';

import { toast } from 'react-toastify';

import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import { IListTasksResponse } from '../../interfaces/admin/index';

import { IAdminProvier } from '../../interfaces/admin/provider';
import { IGenericChildren } from '../../interfaces/childrenInterface';

const AdminContext = createContext<IAdminProvier>({} as IAdminProvier);

export const UseAdmin = () => {
    const context = useContext(AdminContext);

    return context;
};

export const AdminProvider = ({ children }: IGenericChildren) => {
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
                localStorage.clear();
                toast.error('Erro ao carregar tarefas, faça login novamente');
                toast.dismiss();
            });
    };

    const next = () => {
        setCurrentPage(allDatasTask.tasks.next!);
    };

    const prev = () => {
        setCurrentPage(allDatasTask.tasks.previous!);
    };

    return (
        <AdminContext.Provider
            value={{
                loadTasksDatas,
                allDatasTask,
                setAllDatasTask,
                next,
                prev,
                currentPage
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};
