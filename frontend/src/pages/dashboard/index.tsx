import Header from '../../components/Header';
import Modal from '../../components/Modal';
import TaskContainer from '../../components/TaskContainer';

import { UseDash } from '../../Providers/dashboard';

const Dashboard = () => {
    const { showModal } = UseDash();

    return (
        <>
            {showModal && (
                <Modal
                    text="Criar tarefa"
                    inputDeadlineText="Qual sera o prazo?"
                    inputDescriptionText="Anote aqui sua tarefa?"
                    textButton="Criar"
                />
            )}
            <Header />
            <TaskContainer />
        </>
    );
};

export default Dashboard;
