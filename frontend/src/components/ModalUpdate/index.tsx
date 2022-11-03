import Input from '../Input';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Span } from '../Span/style';
import Button from '../Button/style';
import { ContainerModal } from './style';

import { AiOutlineCloseCircle } from 'react-icons/ai';

import { UseDash } from '../../Providers/dashboard';
import { IUpdateTask } from '../../interfaces/tasks/index';
import { updateTaskSchema } from '../../schemas/tasks/index';
import { UseAuth } from '../../Providers/auth/index';
import InputDate from '../InputDate/index';
import verifyDeadlineIsValid from '../../utils/verifyDeadlineIsValid';

const ModalUpdate = () => {
    const { setShowModalUpdate, updateTask, currentTaskId } = UseDash();
    const { token } = UseAuth();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IUpdateTask>({
        resolver: yupResolver(updateTaskSchema)
    });

    const onUpdateSubmitFunction = async (task: IUpdateTask) => {
        const deadlineIsValid = verifyDeadlineIsValid(task.deadline!);

        if (deadlineIsValid) updateTask(task, token, currentTaskId);
    };

    return (
        <ContainerModal>
            <div className="modal">
                <div className="header-controls">
                    <h1>Atualizar Tarefa</h1>

                    <Button onClick={() => setShowModalUpdate(false)}>
                        <AiOutlineCloseCircle size={25} color="var(--blue)" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit(onUpdateSubmitFunction)}>
                    <Input
                        placeholder="Qual será a nova descrição?"
                        label="Tarefa"
                        register={register}
                        name="description"
                    />
                    {errors.description?.message && (
                        <Span>{errors.description?.message}</Span>
                    )}

                    <InputDate
                        placeholder="Qual sera o novo prazo?"
                        label="Prazo"
                        register={register}
                        name="deadline"
                    />
                    {errors.deadline?.message && (
                        <Span>{errors.deadline?.message}</Span>
                    )}

                    <Button type="submit">Editar</Button>
                </form>
            </div>
        </ContainerModal>
    );
};

export default ModalUpdate;
