import { StyledTaskContainer } from './style';
import Button from '../Button/style';

import { RiTodoLine } from 'react-icons/ri';
import { BiTimeFive } from 'react-icons/bi';
import { AiOutlineCheck } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import Task from '../Task/index';

const TaskContainer = () => {
    return (
        <StyledTaskContainer>
            <div className="container">
                <h1>Tarefas</h1>

                <ul>
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                </ul>
            </div>

            <Button>Adicionar nova tarefa</Button>
        </StyledTaskContainer>
    );
};

export default TaskContainer;
