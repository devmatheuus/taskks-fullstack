import Button from '../Button/style';
import { StyledTask } from './style';

import { AiOutlineCheck } from 'react-icons/ai';
import { RiTodoLine } from 'react-icons/ri';
import { BiTimeFive } from 'react-icons/bi';
import { FiEdit2 } from 'react-icons/fi';

import { UseDash } from '../../Providers/dashboard/index';
import { IRenderUserTasks } from '../../interfaces/tasks/index';

const Task = ({ task }: IRenderUserTasks) => {
    const { setShowModalUpdate, setCurrentTaskId, setShowModalFinishTask } =
        UseDash();

    const createdAt = new Date(task.created_at).toLocaleDateString('pt-BR');

    const taskId = task.id;
    const isFinished = task.is_finished;

    const styledFinishedTask = isFinished ? 'var(--white)' : 'var(--blue)';

    const saveCurrentTask = () => {
        setCurrentTaskId(taskId);
    };

    const openModal = (modalType?: string) => {
        modalType === 'finish'
            ? setShowModalFinishTask(true)
            : setShowModalUpdate(true);

        saveCurrentTask();
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
                    onClick={() => openModal('finish')}
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
                    onClick={() => openModal()}
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
