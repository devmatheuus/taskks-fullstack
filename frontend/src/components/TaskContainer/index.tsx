import { StyledTaskContainer } from './style';
import Button from '../Button/style';

import Task from '../Task/index';

import { UseDash } from '../../Providers/dashboard';
import { useEffect } from 'react';
import { UseAuth } from '../../Providers/auth/index';
import decodedToken from '../../utils/decodedJwt';

const TaskContainer = () => {
    const { setShowModal, loadTasks, tasks } = UseDash();
    const { token } = UseAuth();

    useEffect(() => {
        if (token) {
            loadTasks(token);
            decodedToken(token);
        }
    }, []);

    return (
        <StyledTaskContainer>
            <div className="container">
                <h1>Tarefas</h1>

                <ul>
                    {tasks.length > 0 &&
                        tasks.map(task => <Task task={task} key={task.id} />)}
                </ul>
            </div>

            <Button onClick={() => setShowModal(true)}>
                Adicionar nova tarefa
            </Button>
        </StyledTaskContainer>
    );
};

export default TaskContainer;
