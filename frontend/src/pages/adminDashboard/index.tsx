import Header from '../../components/Header';
import TaskContainer from '../../components/TaskContainer';

import { UseDash } from '../../Providers/dashboard';
import { UseAuth } from '../../Providers/auth';
import { Redirect } from 'react-router-dom';
import ModalCreate from '../../components/ModalCreate';
import ModalUpdate from '../../components/ModalUpdate/index';
import ModalFinishTask from '../../components/ModalFinishTask/index';
import AdminList from '../../components/AdminList/index';

const AdminDashboard = () => {
    const { authenticated } = UseAuth();
    const { showModal, showModalUpdate, showModalFinishTask } = UseDash();

    // if (!authenticated) {
    //     return <Redirect to="/" />;
    // }

    return (
        <>
            <Header />
            <AdminList />
        </>
    );
};

export default AdminDashboard;
