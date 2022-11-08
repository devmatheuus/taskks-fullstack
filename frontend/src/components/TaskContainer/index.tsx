import { StyledTaskContainer } from './style';
import Button from '../Button/style';
import Task from '../Task/index';

import { UseDash } from '../../Providers/dashboard';
import { UseAuth } from '../../Providers/auth/index';

import { useEffect } from 'react';
import NoTasks from '../NoTasks';

const TaskContainer = () => {
    const { token } = UseAuth();

    useEffect(() => {
        loadTasks(token);
    }, []);

    const { setShowModal, loadTasks, tasks } = UseDash();

    return (
        <StyledTaskContainer>
            {tasks.length > 0 ? (
                <div className="container">
                    <h1>Tarefas</h1>

                    <ul>
                        {tasks.map(task => (
                            <Task task={task} key={task.id} />
                        ))}
                    </ul>
                </div>
            ) : (
                <NoTasks />
            )}
            <Button onClick={() => setShowModal(true)}>
                Adicionar nova tarefa
            </Button>
        </StyledTaskContainer>
    );
};

export default TaskContainer;
