import Input from '../Input';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Span } from '../../components/Span/style';
import { formSchema } from '../../schemas/session/index';
import Button from '../Button/style';
import { ContainerModal } from './style';

import { AiOutlineCloseCircle } from 'react-icons/ai';

import { UseDash } from '../../Providers/dashboard';

interface IModalProps {
    text: string;
    textButton: string;
    inputDescriptionText: string;
    inputDeadlineText: string;
}

interface ITaskRequest {
    description: string;
    deadline: string;
}

const Modal = ({
    text,
    textButton,
    inputDeadlineText,
    inputDescriptionText
}: IModalProps) => {
    const { setShowModal } = UseDash();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ITaskRequest>({
        resolver: yupResolver(formSchema)
    });

    const onSubmitFunction = async (data: ITaskRequest) => {
        console.log(data);
    };

    return (
        <ContainerModal>
            <div className="modal">
                <div className="header-controls">
                    <h1>{text}</h1>

                    <Button onClick={() => setShowModal(false)}>
                        <AiOutlineCloseCircle size={25} color="var(--blue)" />
                    </Button>
                </div>
                <form onSubmit={handleSubmit(onSubmitFunction)}>
                    <Input
                        placeholder={inputDescriptionText}
                        label="Tarefa"
                        register={register}
                        name="description"
                    />
                    {errors.description?.message && (
                        <Span>{errors.description?.message}</Span>
                    )}

                    <Input
                        placeholder={inputDeadlineText}
                        label="Prazo"
                        register={register}
                        name="deadline"
                    />
                    {errors.deadline?.message && (
                        <Span>{errors.deadline?.message}</Span>
                    )}

                    <Button>{textButton}</Button>
                </form>
            </div>
        </ContainerModal>
    );
};

export default Modal;
