import Button from '../Button/style';
import { ContainerModal } from './style';

import { UseDash } from '../../Providers/dashboard';
import { UseAuth } from '../../Providers/auth/index';
import { HiOutlineInformationCircle } from 'react-icons/hi';

const ModalFinishTask = () => {
    const { setShowModalFinishTask, finishTask, currentTaskId } = UseDash();
    const { token } = UseAuth();

    const confirmTaskCompletion = async (is_finished: boolean) => {
        finishTask(is_finished, token, currentTaskId);
    };

    return (
        <ContainerModal>
            <div className="modal">
                <div className="header-controls">
                    <h1>Deseja finalizar essa tarefa?</h1>
                </div>

                <div className="container-info">
                    <HiOutlineInformationCircle size={20} color="var(--blue)" />
                    <p>Não será mais possível editar essa tarefa!</p>
                </div>

                <div className="container-buttons">
                    <Button onClick={() => confirmTaskCompletion(true)}>
                        Confirmar
                    </Button>
                    <Button onClick={() => setShowModalFinishTask(false)}>
                        Cancelar
                    </Button>
                </div>
            </div>
        </ContainerModal>
    );
};

export default ModalFinishTask;
