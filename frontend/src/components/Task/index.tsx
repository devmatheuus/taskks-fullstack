import Button from '../Button/style';
import { AiOutlineCheck } from 'react-icons/ai';
import { RiTodoLine } from 'react-icons/ri';
import { BiTimeFive } from 'react-icons/bi';
import { FiEdit2 } from 'react-icons/fi';
import { StyledTask } from './style';
import { ITaskResponse } from '../../interfaces/tasks/index';

interface teste {
    task: {
        description: string;
        created_at: Date;
        deadline: string;
    };
}

const Task = ({ task }: teste) => {
    const createdAt = new Date(task.created_at).toLocaleDateString('pt-BR');

    return (
        <StyledTask>
            <div className="flag"></div>
            <div className="container-button">
                <Button>
                    <AiOutlineCheck
                        color="var(--blue)"
                        size={25}
                        title="Concluir tarefa"
                    />
                </Button>
            </div>

            <div className="container-task">
                <p>{task.description}</p>
            </div>

            <div className="container-infos">
                <span>
                    <RiTodoLine size={20} title="Criado em" /> {createdAt}
                </span>
                <span>
                    <BiTimeFive size={20} title="Prazo" /> {task.deadline}
                </span>
            </div>

            <div className="container-edit">
                <Button>
                    <FiEdit2
                        color="var(--blue)"
                        title="Editar tarefa"
                        size={25}
                    />
                </Button>
            </div>
        </StyledTask>
    );
};

export default Task;
