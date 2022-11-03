import Input from '../Input';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Span } from '../Span/style';
import Button from '../Button/style';
import { ContainerModal } from './style';

import { AiOutlineCloseCircle } from 'react-icons/ai';

import { UseDash } from '../../Providers/dashboard';
import { ICreateTask } from '../../interfaces/tasks/index';
import { createTaskSchema } from '../../schemas/tasks/index';
import { UseAuth } from '../../Providers/auth/index';
import InputDate from '../InputDate/index';
import { toast } from 'react-toastify';
import verifyDeadlineIsValid from '../../utils/verifyDeadlineIsValid';

const ModalCreate = () => {
    const { setShowModal, createTask } = UseDash();
    const { token } = UseAuth();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ICreateTask>({
        resolver: yupResolver(createTaskSchema)
    });

    const onCreateSubmitFunction = async (task: ICreateTask) => {
        const deadlineIsValid = verifyDeadlineIsValid(task.deadline);

        if (deadlineIsValid) createTask(task, token);
    };

    return (
        <ContainerModal>
            <div className="modal">
                <div className="header-controls">
                    <h1>Criar Tarefa</h1>

                    <Button onClick={() => setShowModal(false)}>
                        <AiOutlineCloseCircle size={25} color="var(--blue)" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit(onCreateSubmitFunction)}>
                    <Input
                        placeholder="Descreva sua tarefa"
                        label="Tarefa"
                        register={register}
                        name="description"
                    />
                    {errors.description?.message && (
                        <Span>{errors.description?.message}</Span>
                    )}

                    <InputDate
                        placeholder="Qual sera o prazo?"
                        label="Prazo"
                        register={register}
                        name="deadline"
                    />
                    {errors.deadline?.message && (
                        <Span>{errors.deadline?.message}</Span>
                    )}

                    <Button type="submit">Criar</Button>
                </form>
            </div>
        </ContainerModal>
    );
};

export default ModalCreate;