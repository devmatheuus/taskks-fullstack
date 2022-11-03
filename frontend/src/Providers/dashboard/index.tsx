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
import {
    ICreateTask,
    ITaskResponse,
    IUpdateTask
} from '../../interfaces/tasks/index';

interface IDashProviderProps {
    children: ReactNode;
}

interface IDashProvider {
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

const DashContext = createContext<IDashProvider>({} as IDashProvider);

export const UseDash = () => {
    const context = useContext(DashContext);

    return context;
};

export const DashProvider = ({ children }: IDashProviderProps) => {
    const [showModal, setShowModal] = useState(false);

    const [showModalUpdate, setShowModalUpdate] = useState(false);

    const [showModalFinishTask, setShowModalFinishTask] = useState(false);

    const [tasks, setTasks] = useState(Array<ITaskResponse>);

    const [currentTaskId, setCurrentTaskId] = useState('');

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

    const updateTask = (task: IUpdateTask, token: string, taskId: string) => {
        toast.loading('Criando tarefa...');
        api.patch(`/tasks/${taskId}`, task, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                loadTasks(token);
                toast.dismiss();
                toast.success('Tarefa editada com sucesso');
            })
            .catch(() => {
                toast.dismiss();
                toast.error('Revise os campos');
            })
            .finally(() => {
                setShowModalUpdate(false);
            });
    };

    const finishTask = (isFinished: boolean, token: string, taskId: string) => {
        toast.loading('Finalizando tarefa...');
        api.patch(
            `/tasks/${taskId}`,
            { is_finished: isFinished },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then(response => {
                loadTasks(token);
                toast.dismiss();
                toast.success('Tarefa finalizada com sucesso');
            })
            .catch(() => {
                toast.dismiss();
                toast.error('Algo de errado aconteceu');
            })
            .finally(() => {
                setShowModalFinishTask(false);
            });
    };

    return (
        <DashContext.Provider
            value={{
                setShowModal,
                showModal,
                loadTasks,
                tasks,
                createTask,
                setShowModalUpdate,
                showModalUpdate,
                updateTask,
                currentTaskId,
                setCurrentTaskId,
                finishTask,
                setShowModalFinishTask,
                showModalFinishTask
            }}
        >
            {children}
        </DashContext.Provider>
    );
};
