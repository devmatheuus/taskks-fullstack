import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

import api from '../../services/api';

import {
    ICreateTask,
    ITaskResponse,
    IUpdateTask
} from '../../interfaces/tasks/index';
import { IDashProvider } from '../../interfaces/dashboardProvider';
import { IGenericChildren } from '../../interfaces/childrenInterface';

const DashContext = createContext<IDashProvider>({} as IDashProvider);

export const UseDash = () => {
    const context = useContext(DashContext);

    return context;
};

export const DashProvider = ({ children }: IGenericChildren) => {
    const [showModal, setShowModal] = useState(false);

    const [showModalUpdate, setShowModalUpdate] = useState(false);

    const [showModalFinishTask, setShowModalFinishTask] = useState(false);

    const [tasks, setTasks] = useState(Array<ITaskResponse>);

    const [currentTaskId, setCurrentTaskId] = useState('');

    const loadTasks = (token: string) => {
        toast.loading('Carregando tarefas');

        api.get('/tasks', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setTasks(response.data.tasks);
                toast.dismiss();
            })
            .catch(() => {
                localStorage.clear();
                toast.error('Erro ao carregar tarefas, faça login novamente');
                toast.dismiss();
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
            .catch(() => {
                toast.dismiss();
                toast.error('Revise os campos');
            })
            .finally(() => {
                setShowModal(false);
            });
    };

    const updateTask = (task: IUpdateTask, token: string, taskId: string) => {
        toast.loading('Atualizando tarefa...');

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
                toast.error(
                    'O campo "descrição" deve conter ao menos 5 caracteres e o prazo deve ser maior que o dia atual!'
                );
            })
            .finally(() => {
                setShowModalUpdate(false);
            });
    };

    const finishTask = (isFinished: boolean, token: string, taskId: string) => {
        toast.loading('Finalizando tarefa...');

        const finishTask = { is_finished: isFinished };

        api.patch(`/tasks/${taskId}`, finishTask, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
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
