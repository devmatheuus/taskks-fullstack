import Button from '../Button/style';
import { AiOutlineCheck } from 'react-icons/ai';
import { RiTodoLine } from 'react-icons/ri';
import { BiTimeFive } from 'react-icons/bi';
import { FiEdit2 } from 'react-icons/fi';
import { StyledTask } from './style';
import { UseDash } from '../../Providers/dashboard/index';

interface IRenderTask {
    task: {
        description: string;
        created_at: Date;
        deadline: string;
        id: string;
        is_finished: boolean;
    };
}

const Task = ({ task }: IRenderTask) => {
    const { setShowModalUpdate, setCurrentTaskId, setShowModalFinishTask } =
        UseDash();

    const createdAt = new Date(task.created_at).toLocaleDateString('pt-BR');

    const taskId = task.id;
    const isFinished = task.is_finished;

    const styledFinishedTask = isFinished ? 'var(--white)' : 'var(--blue)';

    const openModalEdit = () => {
        setShowModalUpdate(true);

        setCurrentTaskId(taskId);
    };

    const openModalFinishTask = () => {
        setShowModalFinishTask(true);

        setCurrentTaskId(taskId);
    };

    return (
        <StyledTask
            style={{
                background: isFinished ? 'var(--blue)' : 'transparent'
            }}
        >
            <div className="container-button">
                <Button
                    style={{ cursor: isFinished ? 'not-allowed' : 'pointer' }}
                    disabled={isFinished}
                    onClick={() => openModalFinishTask()}
                >
                    <AiOutlineCheck
                        color={styledFinishedTask}
                        size={25}
                        title="Concluir tarefa"
                    />
                </Button>
            </div>

            <div className="container-task">
                <p style={{ color: styledFinishedTask }}>{task.description}</p>
            </div>

            <div className="container-infos">
                <span style={{ color: styledFinishedTask }}>
                    <RiTodoLine
                        color={styledFinishedTask}
                        size={20}
                        title="Data de criação da tarefa"
                    />{' '}
                    {createdAt}
                </span>

                <span style={{ color: styledFinishedTask }}>
                    <BiTimeFive
                        color={styledFinishedTask}
                        size={20}
                        title="Prazo"
                    />{' '}
                    {task.deadline}
                </span>
            </div>

            <div className="container-edit">
                <Button
                    style={{ cursor: isFinished ? 'not-allowed' : 'pointer' }}
                    disabled={isFinished}
                    onClick={() => openModalEdit()}
                >
                    <FiEdit2
                        color={styledFinishedTask}
                        title="Editar tarefa"
                        size={25}
                    />
                </Button>
            </div>
        </StyledTask>
    );
};

export default Task;
