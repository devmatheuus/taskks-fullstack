import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Input from '../Input';
import InputDate from '../InputDate/index';
import Button from '../Button/style';
import { Span } from '../Span/style';
import { ContainerModal } from './style';

import { AiOutlineCloseCircle } from 'react-icons/ai';

import { UseDash } from '../../Providers/dashboard';
import { UseAuth } from '../../Providers/auth/index';

import { IUpdateTask } from '../../interfaces/tasks/index';

import { updateTaskSchema } from '../../schemas/tasks/index';

import getDefaultTaskValues from '../../utils/getDefaultTaskValues';

const ModalUpdate = () => {
    const { setShowModalUpdate, updateTask, currentTaskId, tasks } = UseDash();

    const { token } = UseAuth();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IUpdateTask>({
        resolver: yupResolver(updateTaskSchema)
    });

    const onUpdateSubmitFunction = async (task: IUpdateTask) => {
        const defaultValues = getDefaultTaskValues(task, currentTaskId, tasks);

        updateTask(defaultValues, token, currentTaskId);
    };

    const defaultValuePlaceholder = tasks.find(
        task => task.id === currentTaskId
    );

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
                        placeholder={defaultValuePlaceholder?.description}
                        label="Tarefa"
                        register={register}
                        name="description"
                    />
                    {errors.description?.message && (
                        <Span>{errors.description?.message}</Span>
                    )}

                    <InputDate
                        placeholder={defaultValuePlaceholder?.deadline}
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
