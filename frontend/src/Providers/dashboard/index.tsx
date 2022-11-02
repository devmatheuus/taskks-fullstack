import {
    createContext,
    useContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction
} from 'react';

import { useHistory, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';
import { useEffect } from 'react';
import { ICreateTask, ITaskResponse } from '../../interfaces/tasks/index';

interface IDashProviderProps {
    children: ReactNode;
}

interface IDashProvider {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    tasks: ITaskResponse[];
    loadTasks: (token: string) => void;
    createTask: (task: ICreateTask, token: string) => void;
}

const DashContext = createContext<IDashProvider>({} as IDashProvider);

export const UseDash = () => {
    const context = useContext(DashContext);

    return context;
};

export const DashProvider = ({ children }: IDashProviderProps) => {
    const [showModal, setShowModal] = useState(false);
    const [tasks, setTasks] = useState(Array<ITaskResponse>);

    const loadTasks = (token: string) => {
        api.get('/tasks', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setTasks(response.data.tasks);
        });
    };

    const createTask = (task: ICreateTask, token: string) => {
        toast.loading('Criando tarefa...');
        api.post('/tasks', task, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                toast.dismiss();
                toast.success('Tarefa criada com sucesso');
                setTasks([...tasks, response.data.task]);
            })
            .catch(() => toast.error('Revise os campos'))
            .finally(() => {
                setShowModal(false);
            });
    };

    return (
        <DashContext.Provider
            value={{ setShowModal, showModal, loadTasks, tasks, createTask }}
        >
            {children}
        </DashContext.Provider>
    );
};
