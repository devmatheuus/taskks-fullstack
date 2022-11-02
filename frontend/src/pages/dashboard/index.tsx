import Header from '../../components/Header';
import Modal from '../../components/Modal';
import TaskContainer from '../../components/TaskContainer';

import { UseDash } from '../../Providers/dashboard';
import { UseAuth } from '../../Providers/auth';
import { Redirect, useHistory } from 'react-router-dom';

const Dashboard = () => {
    const history = useHistory();

    const { authenticated } = UseAuth();
    const { showModal } = UseDash();

    if (!authenticated) {
        history.push('/signin');
    }

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
