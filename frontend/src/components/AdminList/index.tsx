import Button from '../Button/style';

import { StyledAdminListContainer } from './style';
import AdminItemList from '../AdminItemList/index';
import { UseAuth } from '../../Providers/auth/index';
import { UseAdmin } from '../../Providers/admin';
import { useEffect } from 'react';
import { IListTasksResponse } from '../../interfaces/admin/index';

const AdminList = () => {
    const { token } = UseAuth();
    const { loadTasksDatas, tasksData } = UseAdmin();

    useEffect(() => {
        loadTasksDatas(token);
    }, []);

    return (
        <StyledAdminListContainer>
            <div className="container">
                <ul className="container-infos">
                    {tasksData.length > 0 &&
                        tasksData.map(task => <AdminItemList task={task} />)}
                </ul>
            </div>
            <div className="container-buttons">
                <Button>Anterior</Button>
                <Button>Próxima</Button>
            </div>
        </StyledAdminListContainer>
    );
};

export default AdminList;
